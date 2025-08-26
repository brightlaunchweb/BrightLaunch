import './globals.css';

export const metadata = {
  title: 'BrightLaunch — Affordable Websites',
  description: 'BrightLaunch builds modern, mobile-friendly websites for small businesses and nonprofits.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
