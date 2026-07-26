# SOLTERRA

Landing page bán cà phê nhân xanh Việt Nam sang thị trường Trung Quốc.
Ngôn ngữ chính: tiếng Trung giản thể.

- [PLAN.md](PLAN.md) — bối cảnh kinh doanh và các quyết định kỹ thuật
- [DESIGN.md](DESIGN.md) — ngôn ngữ thiết kế và design system

**Trước khi sửa giao diện, đọc DESIGN.md.** Component không được tự đặt cỡ chữ
hay giãn ký tự — dùng primitive ở `src/components/ui/`.

## Lệnh

```bash
npm run dev     # chạy dev, mở http://localhost:3000/zh/
npm run build   # build ra thư mục out/ (file tĩnh)
npm run lint
```

Gốc site `/` không chạy ở chế độ dev — vào thẳng `/zh/`. Trên máy chủ thật thì
Nginx đã chuyển hướng sẵn.

## Sửa nội dung

**Toàn bộ chữ hiển thị** nằm ở `src/i18n/messages/zh.json`. Sửa file này là đổi
được mọi câu chữ trên trang, không cần đụng vào code.

**Thông tin liên hệ** (email, đường dẫn ảnh, domain) ở `src/lib/site.ts`.

**Thêm dòng sản phẩm mới:**

1. Thêm một object vào `src/data/products.ts` (slug, đường dẫn ảnh, thứ tự thông số).
2. Thêm khóa cùng tên slug vào `products.items` trong **mọi** file
   `src/i18n/messages/*.json`.
3. Bỏ ảnh vào `public/images/products/`, nén sẵn sang WebP.

## Thay ảnh

Ảnh sản phẩm và ảnh thẻ chia sẻ hiện là **ảnh tạm** (dải màu chuyển sắc).
Thay bằng ảnh thật:

- `public/images/products/*.webp` — tỉ lệ 16:10, nén WebP chất lượng 80
- `public/brand/og-image.jpg` — 1200×630, hiện khi khách forward link vào WeChat

Ảnh gốc chưa xử lý để ở `assets-source/`, không nằm trong bản build.
Chạy `node scripts/prepare-brand.mjs` để tạo lại logo tách nền, mã QR và favicon.

## Thêm ngôn ngữ

1. Thêm mã ngôn ngữ vào `locales` và `htmlLang` trong `src/i18n/config.ts`.
2. Chép `messages/zh.json` thành `messages/en.json` rồi dịch.

Không phải sửa component nào — mọi component đều nhận chữ qua props.

## Deploy

Build sinh ra thư mục `out/` gồm file tĩnh thuần.

```bash
npm run build
rsync -av --delete out/ user@host:/var/www/solterra/
```

Cấu hình Nginx mẫu ở [deploy/nginx.conf](deploy/nginx.conf), kèm hướng dẫn cài đặt
và cấp SSL.

## Ràng buộc cần nhớ

**Không nhúng dịch vụ của Google** (Fonts, Analytics, Maps, YouTube) — bị chặn ở
Trung Quốc, sẽ làm trang treo. `next/font/google` vẫn dùng được vì nó tải font về
lúc build rồi tự host, trình duyệt không gọi ra ngoài.

**Chữ Trung Quốc dùng font hệ thống**, không tải font CJK về (nặng hàng MB).

**Giữ trang nhẹ.** Lưu lượng từ đại lục sang Hong Kong đi qua ranh giới kiểm duyệt
nên hay bị bóp băng thông. Hiện tại khoảng 260KB sau nén Brotli.

**Không hiển thị giá** ở bất kỳ đâu — mọi CTA đều dẫn về liên hệ.

## Chưa làm

- Bản tiếng Anh / tiếng Việt (cấu trúc đã sẵn sàng)
- Khối chứng nhận & tuân thủ (GACC, Form E) — chờ xác nhận giấy tờ thực tế
- PDF hồ sơ công ty
- Backend nhận yêu cầu báo giá
