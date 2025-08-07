import { AntdRegistry } from '@ant-design/nextjs-registry';
import { AntdProvider } from '@/components';
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hans">
      <body>
        <AntdProvider>
          <AntdRegistry>
            {children}
          </AntdRegistry>
        </AntdProvider>
      </body>
    </html>
  );
}
