import Navbar from '../components/navbar'
import "./global.css";


export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body style={{ margin: 0, padding: 0 }}>
                <Navbar />
                {children}
            </body>
        </html>
    )
}