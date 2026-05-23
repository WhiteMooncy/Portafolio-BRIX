/* global React */

function Navbar({ active, onNavigate }) {
  const items = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'acerca', label: 'Sobre mí' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'contacto', label: 'Contacto' },
  ];
  return (
    <header className="navbar">
      <div className="logo" onClick={() => onNavigate('inicio')}>
        <i className="fas fa-code"></i>
        <span>WhiteMooncy</span>
      </div>
      <nav aria-label="Navegación principal">
        {items.map(item => (
          <button
            key={item.id}
            className={active === item.id ? 'active' : ''}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <a href="pages/cv.html" className="cv-btn" target="_blank" rel="noopener">
        Descargar CV <i className="fas fa-download"></i>
      </a>
    </header>
  );
}

window.Navbar = Navbar;
