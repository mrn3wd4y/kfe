/**
 * Root layout dạng trung chuyển. Thẻ <html>/<body> nằm ở `[locale]/layout.tsx`
 * vì thuộc tính lang phụ thuộc ngôn ngữ của route.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
