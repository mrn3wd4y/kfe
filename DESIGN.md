# Ngôn ngữ thiết kế SOLTERRA

Hướng: **hồ sơ kỹ thuật** (technical dossier).

Trang phải đọc như tài liệu đặc tả của nhà cung cấp, không phải trang quảng cáo.
Khách hàng là người mua công nghiệp — họ quét trang để tìm độ ẩm, cỡ sàng, điểm
cupping, điều khoản giao dịch. Uy tín đến từ sự chính xác và có hệ thống, không
đến từ hiệu ứng thị giác. Phần "cao cấp" do logo đảm nhiệm; bố cục đảm nhiệm phần
"đáng tin".

## Nguyên tắc

1. **Góc vuông.** Không bo tròn, trừ nút nổi trên mobile (cần mềm để không cấn mắt).
   Góc vuông là ngôn ngữ của biểu mẫu và tài liệu kỹ thuật.

2. **Đường kẻ thay cho mảng nền.** Nhóm nội dung bằng đường viền mảnh. Chỉ có duy
   nhất một mức nền nổi (`surface`), dùng để phân tách dải chứ không để trang trí.

3. **Căn trái tuyệt đối.** Không căn giữa bất cứ khối nội dung nào. Tài liệu không
   căn giữa. Căn giữa làm trang giống tờ rơi.

4. **Phân cấp bằng cỡ chữ và màu, không bằng độ đậm.** Toàn trang dùng nét mảnh
   (300–400) để khớp với logo. Chữ đậm phá vỡ sự tĩnh của tài liệu.

5. **Vàng là màu nhấn, không phải màu chữ.** Chỉ dùng cho: logo, nền nút chính,
   đường kẻ nhấn, nhãn eyebrow, số thứ tự. Không bao giờ dùng cho chữ thân bài.

6. **Số liệu dùng chữ số đều bề ngang** (`tabular-nums`). Các cột số phải thẳng hàng
   như bảng trong tài liệu kỹ thuật.

7. **Nhịp dọc thoáng, nhịp ngang chặt.** Khoảng cách giữa các dải rộng; khoảng cách
   trong một khối thì sít.

8. **Dải được đánh số.** Mỗi dải nội dung mang một số thứ tự như mục trong tài liệu.
   Vừa tạo nhịp thị giác vừa củng cố cảm giác có hệ thống.

## Token

Khai báo trong `src/app/globals.css`, khối `@theme`.

### Thang chữ

| Token | Vai trò |
|-------|---------|
| `text-display` | Tiêu đề Hero, duy nhất một lần trên trang |
| `text-title` | Tiêu đề dải nội dung |
| `text-heading` | Tiêu đề thẻ, tên sản phẩm, tiêu đề bước |
| `text-body` | Chữ thân bài |
| `text-small` | Chú thích, mô tả phụ |
| `text-label` | Nhãn chữ hoa giãn ký tự |

**Không component nào được tự đặt cỡ chữ.** Dùng primitive ở `components/ui/`.

### Giãn ký tự

Chỉ hai mức. Trước đây có bốn mức tùy tiện — đó là dấu hiệu của việc không có hệ thống.

| Token | Dùng cho |
|-------|----------|
| `tracking-label` | Nhãn chữ hoa |
| `tracking-brand` | Chữ SOLTERRA |

### Màu

| Token | Vai trò | Tương phản trên `ink` |
|-------|---------|----------------------|
| `ink` | Nền chính | — |
| `surface` | Nền dải xen kẽ — mức nổi duy nhất | — |
| `line` | Đường kẻ mảnh | — |
| `amber` | Màu nhấn, xem nguyên tắc 5 | 9.97:1 |
| `cream` | Chữ chính | 16.13:1 |
| `muted` | Chữ phụ, nhãn | 8.39:1 |

### Ngưỡng tương phản: đừng tin mỗi WCAG

Chuẩn WCAG AA yêu cầu 4.5:1 cho chữ thường, nhưng chuẩn đó xây trên **chữ Latin**.
Chữ Hán có mật độ nét cao hơn nhiều nên ở cùng cỡ chữ và cùng tỷ lệ tương phản sẽ
khó đọc hơn hẳn.

`muted` từng là `#9c9287` — đạt 6.16:1, **qua chuẩn AA**, nhưng đọc nhanh bảng thông
số vẫn mỏi mắt. Bài học: với giao diện tiếng Trung, lấy **7:1 làm sàn thực tế** cho
chữ nhỏ, đừng dừng ở 4.5:1.

Ba yếu tố cùng quyết định độ dễ đọc, sửa màu thôi là không đủ:

1. **Tương phản** — sàn 7:1 cho chữ nhỏ
2. **Cỡ chữ** — thân bài tối thiểu 16px, nhãn tối thiểu 12px
3. **Giãn ký tự** — giãn rộng làm chữ Hán rời rạc, mắt phải ghép lại từng ký tự
   thay vì nhận diện cả từ. Mức nhãn giữ ở 0.12em, không hơn.

## Primitive

Ở `src/components/ui/`. Component nội dung chỉ được ghép primitive lại, không tự
viết class typography.

| Component | Thay thế |
|-----------|----------|
| `Label` | 7 chỗ từng tự viết `text-xs tracking-[...] uppercase` |
| `Heading` | Mọi thẻ h1–h3 |
| `Text` | Mọi đoạn văn |
| `DataTable` | Bảng thông số và điều khoản |
| `Section` | Khung dải, tự lo nhịp dọc và số thứ tự |
| `ButtonLink` | Nút |
