/** Hằng số toàn site. Sửa thông tin liên hệ ở đây, không rải rác trong component. */
export const site = {
  name: "SOLTERRA",
  email: "support@solterravn.com",
  phone: "+84 346 97 8118",

  /*
   * Thông tin pháp nhân. Giữ nguyên bản tiếng Việt vì đây là tên và địa chỉ
   * đăng ký chính thức — người mua Trung Quốc cần đúng bản gốc để tra cứu
   * doanh nghiệp và ghi vào hợp đồng. Bản dịch tiếng Trung nằm ở file ngôn ngữ.
   */
  company: {
    legalName: "CÔNG TY TNHH SOLTERRA",
    taxCode: "0319637259",
    address:
      "27C Quoc Huong, Phuong An Khanh, Thanh pho Ho Chi Minh, Viet Nam",
  },

  /** Đổi thành domain thật sau khi mua — dùng cho sitemap, canonical, thẻ OG. */
  url: "https://solterravn.com",

  wechatQr: "/brand/wechat-qr.png",
  logo: "/brand/logo.png",

  /** Ảnh hiện trong thẻ chia sẻ khi khách forward link vào nhóm WeChat. */
  ogImage: "/brand/og-image.jpg",
} as const;
