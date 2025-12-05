import "./global.css";
import ClientNavbar from "../components/ClientNavbar";

export const metadata = {
  title: "Rumazon",
  description: "Tienda online",
  icons: {
    icon: "/Icono.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0 }}>
        <ClientNavbar />
        {children}
      </body>
    </html>
  );
}
