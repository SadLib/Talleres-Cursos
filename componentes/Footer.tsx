import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* About Section */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-white tracking-tight mb-4">MAC</h2>
          <p className="text-sm text-gray-400 max-w-sm mb-4 leading-relaxed">
            Facultad de Estudios Superiores Acatlán
            <br />
            Matemáticas Aplicadas y Computación
          </p>
          <p className="text-sm text-gray-500">
            Formando líderes en tecnología e innovación.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
            Navegación
          </h3>
          <ul className="space-y-3">
            <li>
              <Link href="/" className="hover:text-yellow-500 transition-colors">Inicio</Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-yellow-500 transition-colors">Talleres</Link>
            </li>
            <li>
              <Link href="/speakers" className="hover:text-yellow-500 transition-colors">Ponentes</Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
            Contacto
          </h3>
          <ul className="space-y-3">
            <li className="text-gray-400">
              <span className="block text-xs text-gray-500 uppercase">Teléfono</span>
              +52 55 1234 5678
            </li>
            <li className="text-gray-400">
              <span className="block text-xs text-gray-500 uppercase">Correo</span>
              <a href="mailto:contacto@mac.unam.mx" className="hover:text-white transition-colors">
                contacto@mac.unam.mx
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-800 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>Hecho en México. Todos los derechos reservados &copy; {new Date().getFullYear()}.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-white transition-colors">Términos</Link>
          <Link href="#" className="hover:text-white transition-colors">Privacidad</Link>
        </div>
      </div>
    </footer>
  );
}
