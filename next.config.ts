import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Xuất ra file tĩnh cho Nginx trên Alibaba Cloud Hong Kong.
  // Bỏ dòng này khi cần backend, rồi chuyển sang `next start` sau reverse proxy.
  output: "export",

  // Static export không chạy được trình tối ưu ảnh của Next.
  // Ảnh phải được nén sẵn sang WebP thủ công trước khi bỏ vào public/.
  images: { unoptimized: true },

  // Sinh /zh/index.html thay vì /zh.html — Nginx phục vụ thư mục dễ hơn.
  trailingSlash: true,
};

export default nextConfig;
