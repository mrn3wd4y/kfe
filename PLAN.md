# SOLTERRA — Kế hoạch Landing Page

Trang landing bán cà phê nhân xanh Việt Nam sang thị trường Trung Quốc.

> **Trạng thái:** đã dựng xong bản đầu, chạy được. Hướng dẫn sử dụng và sửa nội
> dung ở [README.md](README.md). Tài liệu này giữ lại bối cảnh và lý do đằng sau
> các quyết định.

## 1. Định vị

- **Thương hiệu:** SOLTERRA
- **Khách hàng:** nhà rang xay, quán specialty, nhà nhập khẩu/phân phối tại Trung Quốc
- **Ngôn ngữ chính:** tiếng Trung giản thể (简体中文)
- **Định vị:** nhà cung cấp có nguồn hàng ổn định. Dùng ngôn ngữ mạnh về **năng lực cung ứng**
  ("nguồn cung ổn định quanh năm", "giao hàng theo hợp đồng", "mẫu thử trước khi ký")
  nhưng **không cam kết số lượng tồn kho hay thời gian giao cụ thể** trên web, để tránh
  rủi ro pháp lý khi thực tế phải gom hàng.
- **Không hiển thị giá** ở bất kỳ đâu. Mọi CTA đều dẫn về liên hệ.

## 2. Kỹ thuật

| Hạng mục | Lựa chọn |
|----------|----------|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| i18n | Route theo locale: `/zh` (mặc định), `/en`, `/vi` |
| Dữ liệu | File tĩnh có type, chưa cần backend |
| Liên hệ | QR WeChat + email, không có form/backend |
| Hosting | Alibaba Cloud ECS — vùng Hong Kong |
| Web server | Nginx phục vụ file tĩnh (`output: 'export'`) |
| Domain | solterravn.com — chưa mua |

### Ràng buộc riêng cho thị trường Trung Quốc

Các dịch vụ sau **bị chặn tại Trung Quốc**, tuyệt đối không nhúng vì sẽ làm trang treo
hoặc tải cực chậm:

- Google Fonts → tự host font (Noto Sans SC)
- Google Maps, YouTube, Google Analytics
- Bất kỳ script nào của Google/Facebook

### Hosting: Alibaba Cloud Hong Kong

Vùng Hong Kong **không yêu cầu ICP license** (ICP chỉ bắt buộc với vùng Trung Quốc đại lục),
nên triển khai được ngay mà không vướng thủ tục. Độ trễ tới đại lục tốt hơn hẳn so với
đặt máy chủ ở Mỹ/châu Âu.

Lưu ý: lưu lượng từ đại lục sang Hong Kong **vẫn đi qua ranh giới kiểm duyệt**, nên có thể
chậm hoặc giật vào giờ cao điểm. Cách bù đắp là giữ trang thật nhẹ (mục tiêu dưới 500KB
toàn trang) — trang nhẹ thì đường truyền kém vẫn mở được.

Nếu sau này cần tốc độ tốt hơn nữa trong đại lục, hướng đi là ICP license + vùng đại lục
hoặc Alibaba Cloud CDN. Chưa cần ở giai đoạn này.

### Kiến trúc triển khai

Giai đoạn đầu build **static export** (`output: 'export'`), Nginx phục vụ file tĩnh.
Lý do: không có backend nên không cần chạy tiến trình Node, ít thứ hỏng, tải nhanh nhất,
máy chủ cấu hình thấp cũng dư sức.

Kéo theo: `next/image` phải đặt `images.unoptimized: true`, ảnh sẽ được nén sẵn sang WebP
thủ công — vốn đã nằm trong mục tiêu giữ trang nhẹ.

**Đường nâng cấp khi cần backend:** bỏ `output: 'export'`, chạy `next start` sau Nginx
reverse proxy, quản lý tiến trình bằng PM2. Vì mọi component đều nhận dữ liệu qua props
và không tự fetch, việc chuyển đổi này không phải sửa component nào.

Cấu hình máy chủ cần làm:
- Security Group mở cổng 80 và 443
- SSL miễn phí bằng Let's Encrypt (certbot)
- Bật Gzip/Brotli trong Nginx
- Cấu hình cache header cho tài nguyên tĩnh

**Domain:** đăng ký domain qua Alibaba Cloud yêu cầu xác thực danh tính thật (实名认证),
có thể phiền với cá nhân Việt Nam. Phương án đơn giản hơn là mua domain ở nhà đăng ký
quốc tế (Namecheap, Cloudflare Registrar) rồi trỏ DNS về IP máy chủ Hong Kong.

## 3. Cấu trúc thư mục

```
solterra/
├── public/
│   ├── brand/              logo (đã tách nền), wechat QR
│   └── images/             ảnh hero, ảnh sản phẩm
├── src/
│   ├── app/
│   │   ├── [locale]/       layout.tsx, page.tsx
│   │   ├── globals.css
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── layout/         Header, Footer, FloatingWeChat, LanguageSwitcher
│   │   ├── sections/       Hero, Advantages, Products, Process, WhyUs, Contact
│   │   └── ui/             Button, Section, Card, SpecTable
│   ├── data/
│   │   └── products.ts     ← file sửa khi thêm lô hàng mới
│   ├── i18n/
│   │   ├── config.ts
│   │   └── messages/       zh.json, en.json, vi.json
│   ├── lib/
│   └── types/
│       └── product.ts
```

### Nguyên tắc tách dữ liệu / nội dung

Đây là điểm cốt lõi giúp mở rộng về sau mà không phải sửa lại giao diện:

- `data/products.ts` — thông tin **không cần dịch**: slug, đường dẫn ảnh, độ ẩm, cỡ sàng,
  tỷ lệ lỗi, điểm cupping, phương pháp chế biến, độ cao.
- `i18n/messages/*.json` — **toàn bộ chữ cần dịch**, kể cả tên và mô tả sản phẩm,
  khóa theo slug của sản phẩm.

Hệ quả:
- Thêm lô hàng mới = thêm 1 object vào `products.ts` + vài dòng vào file ngôn ngữ.
- Thêm tiếng Anh = dịch 1 file JSON, không đụng component nào.

### Chuẩn bị cho backend

Mỗi section là component độc lập, **nhận dữ liệu qua props, không tự fetch**.
`page.tsx` là nơi duy nhất lấy dữ liệu. Khi có backend, chỉ đổi nguồn ở `page.tsx`
từ import file tĩnh sang gọi API — toàn bộ component giữ nguyên.

## 4. Bố cục trang

Một trang cuộn dọc, thiết kế mobile-first.

1. **Hero** — logo, tiêu đề chính, ảnh nền hạt nhân xanh, CTA "联系询价" + "查看产品"
2. **Điểm mạnh** — 4 thẻ: vùng trồng Việt Nam, kiểm soát chất lượng theo lô,
   nguồn cung ổn định, hỗ trợ thủ tục xuất khẩu
3. **Sản phẩm** — 2 nhóm chính:
   - 精品级生豆 — Cà phê nhân xanh chất lượng cao (Robusta & Arabica thương mại)
   - 精品咖啡 — Specialty coffee (lô nhỏ, cupping 80+, washed/honey/natural)

   Mỗi nhóm: ảnh, bảng thông số kỹ thuật, nút 询价
4. **Quy trình** — timeline 5 bước: tuyển chọn vùng trồng → sơ chế → phân loại &
   kiểm định → đóng bao (jute/GrainPro) → giao hàng xuất khẩu
5. **Điều khoản giao dịch** — Incoterms (FOB Hồ Chí Minh / CIF cảng Trung Quốc), MOQ,
   phương thức thanh toán (T/T, L/C), quy cách đóng bao. **Không có giá.**
6. **Chương trình gửi mẫu (寄样)** — mẫu 200–500g, khách trả phí vận chuyển.
   CTA "申请样品" — rào cản thấp, tự sàng lọc khách nghiêm túc.
7. **Vì sao chọn SOLTERRA** — chất lượng đồng nhất giữa các lô, mẫu thử trước hợp đồng,
   hỗ trợ chứng từ xuất khẩu, giao tiếp trực tiếp bằng tiếng Trung
8. **Liên hệ** — QR WeChat cỡ lớn trên thẻ trắng, email support@solterravn.com,
   giờ làm việc
9. **Footer** — thương hiệu, email, chuyển ngôn ngữ, bản quyền

**Khối chứng nhận & tuân thủ** (GACC, Form E/ACFTA, kiểm dịch thực vật): dựng sẵn khung
nhưng **chưa điền nội dung**, chờ xác nhận thực tế bạn có những giấy tờ nào. Bỏ hẳn khối
này nếu chưa có gì — để trống còn hơn ghi sai.

**Hoãn:** nút tải PDF hồ sơ công ty. Chưa có file thì nút dẫn đi đâu cũng phản tác dụng.

Ngoài ra: **nút WeChat nổi cố định** ở góc màn hình khi cuộn trên mobile.

## 5. Thiết kế

Bảng màu lấy hướng từ logo (chữ vàng hổ phách phát sáng):

- Nền: than chì đậm / đen ấm
- Chữ: trắng ngà
- Điểm nhấn: vàng hổ phách (lấy từ logo)
- Mảng phụ: nâu cà phê

QR WeChat đặt trên **thẻ nền trắng** để đảm bảo quét được — màu xanh mòng két của QR
đứng riêng trên thẻ trắng nên không phá bảng màu chung.

Font tiếng Trung: Noto Sans SC, **tự host**.

## 6. Tài sản

| File | Trạng thái |
|------|-----------|
| logo.png | Đã có — cần tách nền trong suốt (file gốc nền xám, có glow) |
| wechat.jpeg | Đã có, dùng được ngay, độ phân giải tốt |
| Ảnh sản phẩm | **Chưa có** — dùng placeholder, thay sau |
| Ảnh hero | **Chưa có** — dùng placeholder, thay sau |

## 7. Ngoài phạm vi giai đoạn này

Ghi lại để tham chiếu sau, chưa làm bây giờ:

- Form báo giá + backend nhận yêu cầu
- Bản tiếng Anh / tiếng Việt (đã chuẩn bị sẵn cấu trúc, chỉ cần dịch)
- Trang blog / tin tức / chi tiết từng lô hàng
- WeChat Official Account, Mini Program
- ICP license và hosting nội địa Trung Quốc
- Analytics (lưu ý: không dùng Google Analytics do bị chặn)
