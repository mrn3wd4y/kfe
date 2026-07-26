/**
 * Tách nền logo: từ `logo-original.png` (chữ vàng trên nền xám có quầng sáng)
 * tạo ra `logo.png` nền trong suốt, nét sắc, đúng màu thương hiệu.
 *
 * Vì sao không tách theo độ bão hòa: quầng sáng trong ảnh gốc bão hòa MẠNH HƠN
 * nét chữ, nên tách theo chroma sẽ giữ lại quầng và làm mờ chữ — ở cỡ header
 * 32px trông như một vệt vàng nhòe.
 *
 * Cách làm ở đây tách theo tần số không gian:
 *   - Quầng sáng là vùng chuyển màu mượt (tần số thấp) → biến mất khi lấy hiệu
 *     giữa ảnh gốc và ảnh đã làm mờ.
 *   - Nét chữ là chi tiết sắc nét (tần số cao), và tối hơn nền cục bộ → hiện rõ
 *     trong hiệu số đó.
 *   - Riêng hình chiếc lá ở chữ A cuối thì sáng hơn nền, nên bắt thêm bằng ngưỡng
 *     chroma rất cao (chỉ vùng vàng đậm nhất mới đạt).
 *
 * Màu đầu ra được tô lại bằng đúng mã vàng thương hiệu thay vì giữ màu gốc —
 * chữ trong ảnh gốc đã bị trộn với nền xám nên ngả đục, đặt lên nền tối sẽ chìm.
 * Quầng sáng được dựng lại bằng CSS ở component, sắc nét ở mọi kích thước.
 *
 * Chạy: node scripts/prepare-logo.mjs
 */
import sharp from "sharp";

// Ảnh gốc để ngoài public/ để không bị đóng gói vào bản build (nặng 1.3MB).
const SRC = "assets-source/logo-original.png";
const OUT = "public/brand/logo.png";

const BLUR_SIGMA = 6; // bán kính ước lượng nền cục bộ
const TEXT_GAIN = 26; // chữ tối hơn nền bao nhiêu thì tính là đục hoàn toàn
const TEXT_CHROMA_MIN = 35; // nền xám dưới ngưỡng này bị loại hoàn toàn
const TEXT_CHROMA_RANGE = 45; // độ rộng vùng chuyển để mép chữ không bị răng cưa
const LEAF_CHROMA_MIN = 150; // dưới ngưỡng này là quầng sáng, không phải lá
const LEAF_CHROMA_MAX = 200;

// Vàng hổ phách thương hiệu — trùng --color-amber trong globals.css
const BRAND = { r: 232, g: 181, b: 74 };

const { data, info } = await sharp(SRC)
  .raw()
  .toBuffer({ resolveWithObject: true });

const pixels = info.width * info.height;
const luma = Buffer.alloc(pixels);
const chroma = new Uint8Array(pixels);

for (let p = 0; p < pixels; p += 1) {
  const i = p * info.channels;
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  luma[p] = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
  chroma[p] = Math.max(r, g, b) - Math.min(r, g, b);
}

// Nền cục bộ ước lượng bằng ảnh làm mờ của kênh sáng.
const blurred = await sharp(luma, {
  raw: { width: info.width, height: info.height, channels: 1 },
})
  .blur(BLUR_SIGMA)
  .raw()
  .toBuffer();

const out = Buffer.alloc(pixels * 4);

for (let p = 0, o = 0; p < pixels; p += 1, o += 4) {
  // Nét chữ tối hơn nền cục bộ → hiệu số dương.
  const darkness = Math.max(0, blurred[p] - luma[p]);

  /*
   * Chỉ riêng hiệu số sáng-tối là chưa đủ: vùng tối ở góc ảnh gốc cũng cho
   * hiệu số dương và biến thành mảng mờ lem nhem. Nền là xám không bão hòa
   * (chroma < 20) còn nét chữ là vàng (chroma ~105), nên lọc thêm theo chroma
   * sẽ loại sạch phần nền.
   */
  const chromaGate = Math.max(
    0,
    Math.min(1, (chroma[p] - TEXT_CHROMA_MIN) / TEXT_CHROMA_RANGE),
  );

  const textAlpha = Math.min(1, darkness / TEXT_GAIN) * chromaGate;

  // Chiếc lá sáng hơn nền nên không lọt vào phép trên, bắt riêng bằng chroma.
  const leafAlpha = Math.max(
    0,
    Math.min(
      1,
      (chroma[p] - LEAF_CHROMA_MIN) / (LEAF_CHROMA_MAX - LEAF_CHROMA_MIN),
    ),
  );

  const alpha = Math.max(textAlpha, leafAlpha);

  out[o] = BRAND.r;
  out[o + 1] = BRAND.g;
  out[o + 2] = BRAND.b;
  out[o + 3] = Math.round(alpha * 255);
}

await sharp(out, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim() // bỏ vùng trong suốt thừa quanh wordmark
  .png({ compressionLevel: 9 })
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`logo:  ${OUT} — ${meta.width}x${meta.height}`);

/*
 * Mã QR WeChat: chuyển JPEG sang PNG.
 * JPEG nén mất mát tạo nhiễu quanh các ô vuông của mã QR, làm giảm khả năng
 * quét ở màn hình nhỏ hoặc ánh sáng kém. PNG giữ mép sắc, mà ảnh hai màu như
 * QR lại nén rất tốt — file nhỏ hơn nhiều so với JPEG gốc.
 *
 * 560px = gấp đôi kích thước hiển thị 280px, đủ nét cho màn hình Retina.
 */
const QR_SRC = "assets-source/wechat-qr.jpeg";
const QR_OUT = "public/brand/wechat-qr.png";

// Cắt lấy đúng vùng mã QR, bỏ dòng chữ chú thích ở dưới ảnh gốc — trang đã có
// chú thích riêng bằng tiếng Trung rồi. Vùng mã được dò bằng cách tìm các hàng
// và cột có nhiều pixel tối liền nhau.
const qrRaw = await sharp(QR_SRC).greyscale().raw().toBuffer({ resolveWithObject: true });
const { data: qrData, info: qrInfo } = qrRaw;
const DARK = 140;
const MIN_RUN = 20; // dòng chữ chú thích mảnh, không đạt ngưỡng này

const darkPerRow = new Array(qrInfo.height).fill(0);
const darkPerCol = new Array(qrInfo.width).fill(0);

for (let y = 0; y < qrInfo.height; y += 1) {
  for (let x = 0; x < qrInfo.width; x += 1) {
    if (qrData[y * qrInfo.width + x] < DARK) {
      darkPerRow[y] += 1;
      darkPerCol[x] += 1;
    }
  }
}

const bounds = (counts) => {
  const first = counts.findIndex((c) => c >= MIN_RUN);
  let last = first;
  for (let i = counts.length - 1; i >= 0; i -= 1) {
    if (counts[i] >= MIN_RUN) {
      last = i;
      break;
    }
  }
  return { first, last };
};

const rows = bounds(darkPerRow);
const cols = bounds(darkPerCol);
const PAD = 12; // chừa lề trắng — vùng yên tĩnh bắt buộc của mã QR

const left = Math.max(0, cols.first - PAD);
const top = Math.max(0, rows.first - PAD);
const width = Math.min(qrInfo.width - left, cols.last - cols.first + PAD * 2);
const height = Math.min(qrInfo.height - top, rows.last - rows.first + PAD * 2);

await sharp(QR_SRC)
  .extract({ left, top, width, height })
  .resize({ width: 560 })
  // Ảnh QR chỉ có hai tông màu; ép bảng màu nhỏ để loại nhiễu JPEG và giảm dung lượng.
  .png({ compressionLevel: 9, palette: true, colours: 8 })
  .toFile(QR_OUT);

const qrMeta = await sharp(QR_OUT).metadata();
console.log(`QR:    ${QR_OUT} — ${qrMeta.width}x${qrMeta.height}`);

/*
 * Favicon: cắt lấy chữ A có hình chiếc lá ở cuối wordmark — chi tiết nhận diện
 * nhất của logo và là phần duy nhất còn đọc được ở cỡ 16px. Đặt tại
 * `src/app/icon.png` theo quy ước của Next App Router, Next sẽ tự chèn thẻ link.
 */
const ICON_OUT = "src/app/icon.png";

const logoRaw = await sharp(OUT).raw().toBuffer({ resolveWithObject: true });
const { data: logoData, info: logoInfo } = logoRaw;

/*
 * Dò khoảng trống giữa chữ R và chữ A để cắt đúng chiếc lá. Gạch chân nằm ở
 * đáy ảnh nên chỉ xét phần trên; nếu tính cả gạch chân thì không cột nào trống.
 */
const glyphRows = Math.round(logoInfo.height * 0.9);
const columnAlpha = [];

for (let x = 0; x < logoInfo.width; x += 1) {
  let sum = 0;
  for (let y = 0; y < glyphRows; y += 1) {
    sum += logoData[(y * logoInfo.width + x) * 4 + 3];
  }
  columnAlpha.push(sum / glyphRows);
}

const EMPTY = 2; // alpha trung bình dưới ngưỡng này coi như cột trống
const MIN_GAP = 8; // khoảng trống giữa hai chữ cái rộng ít nhất bấy nhiêu cột

let leafLeft = 0;
let run = 0;
for (let x = logoInfo.width - 1; x >= 0; x -= 1) {
  run = columnAlpha[x] < EMPTY ? run + 1 : 0;
  if (run >= MIN_GAP) {
    leafLeft = x + run;
    break;
  }
}

const leafW = logoInfo.width - leafLeft;
const leafCrop = Buffer.alloc(leafW * glyphRows * 4);

/*
 * Làm sạch phần quầng sáng mờ còn sót quanh chữ A. Ở cỡ favicon 16–32px nó chỉ
 * tạo cảm giác bẩn, đồng thời sinh ra hàng nghìn sắc độ khiến file PNG phình to.
 *
 * Alpha trong vùng này phân bố thành hai cụm: gần 0 là nền, trên 230 là nét chữ,
 * ở giữa là quầng sáng. Cắt ở khoảng giữa hai cụm, dùng dải chuyển thay vì ngưỡng
 * cứng để mép chữ giữ được khử răng cưa.
 */
const ALPHA_FLOOR = 150;
const ALPHA_CEIL = 230;

for (let y = 0; y < glyphRows; y += 1) {
  for (let x = 0; x < leafW; x += 1) {
    const src = (y * logoInfo.width + (leafLeft + x)) * 4;
    const dst = (y * leafW + x) * 4;
    const a = logoData[src + 3];

    leafCrop[dst] = logoData[src];
    leafCrop[dst + 1] = logoData[src + 1];
    leafCrop[dst + 2] = logoData[src + 2];
    leafCrop[dst + 3] = Math.round(
      Math.max(0, Math.min(1, (a - ALPHA_FLOOR) / (ALPHA_CEIL - ALPHA_FLOOR))) *
        255,
    );
  }
}

const leaf = await sharp(leafCrop, {
  raw: { width: leafW, height: glyphRows, channels: 4 },
})
  .resize(340, 340, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  // Cần chỉ định định dạng: đầu vào là raw nên sharp không tự suy ra được.
  .png()
  .toBuffer();

await sharp({
  create: {
    width: 512,
    height: 512,
    channels: 4,
    background: { r: 20, g: 17, b: 15, alpha: 1 }, // trùng --color-ink
  },
})
  .composite([{ input: leaf, gravity: "centre" }])
  // Icon chỉ có hai màu nên bảng màu nhỏ là đủ, file nhẹ hơn nhiều lần.
  .png({ compressionLevel: 9, palette: true, colours: 16 })
  .toFile(ICON_OUT);

console.log(`icon:  ${ICON_OUT} — 512x512`);
