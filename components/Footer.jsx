/* global React */

function formatCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
}

function Footer({ onNavigate }) {
  const [count, setCount] = React.useState(null);

  React.useEffect(() => {
    fetch('/counter.json')
      .then(r => r.json())
      .then(data => {
        const n = parseInt(data.users, 10);
        if (!isNaN(n)) setCount(n);
      })
      .catch(() => {});
  }, []);

  const year = new Date().getFullYear();

  const goTo = (id) => (e) => {
    e.preventDefault();
    if (onNavigate) onNavigate(id);
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="logo">
            <i className="fas fa-code"></i>
            <span>WhiteMooncy</span>
          </div>
          <p className="footer-tagline">
            Full Stack Developer (Junior). Técnico titulado en Programación y Análisis de Sistemas, cursando Ingeniería de Ejecución en Informática en AIEP. Construyendo experiencias digitales que funcionan.
          </p>
          <span className="footer-availability">
            <span className="dot"></span>
            Disponible para proyectos
          </span>
          <div className="footer-socials">
            <a href="https://github.com/WhiteMooncy" aria-label="GitHub" target="_blank" rel="noopener"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/whitemooncy" aria-label="LinkedIn" target="_blank" rel="noopener"><i className="fab fa-linkedin-in"></i></a>
            <a href="https://discord.com/users/716745899703009310" aria-label="Discord" target="_blank" rel="noopener"><i className="fab fa-discord"></i></a>
            <a href="mailto:mateo.villablanca.gall@gmail.com" aria-label="Enviar email"><i className="fas fa-envelope"></i></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Explora</h4>
          <ul>
            <li><button onClick={goTo('inicio')} aria-label="Ir a Inicio"><i className="fas fa-arrow-right"></i>Inicio</button></li>
            <li><button onClick={goTo('acerca')} aria-label="Ir a Sobre mí"><i className="fas fa-arrow-right"></i>Sobre mí</button></li>
            <li><button onClick={goTo('proyectos')} aria-label="Ir a Proyectos"><i className="fas fa-arrow-right"></i>Proyectos</button></li>
            <li><button onClick={goTo('contacto')} aria-label="Ir a Contacto"><i className="fas fa-arrow-right"></i>Contacto</button></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contacto</h4>
          <ul>
            <li><a href="mailto:mateo.villablanca.gall@gmail.com" aria-label="Enviar email"><i className="fas fa-envelope"></i>Email</a></li>
            <li><a href="https://www.linkedin.com/in/whitemooncy" target="_blank" rel="noopener"><i className="fab fa-linkedin"></i>LinkedIn</a></li>
            <li><a href="https://github.com/WhiteMooncy" target="_blank" rel="noopener"><i className="fab fa-github"></i>GitHub</a></li>
            <li><span className="footer-item-text"><i className="fas fa-map-marker-alt" style={{ color: 'var(--color-primary)' }}></i>Putaendo, Chile</span></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Construido con</h4>
          <ul>
            <li><span className="footer-item-text"><i className="fab fa-html5" style={{ color: 'var(--color-primary)', marginRight: 8 }}></i>HTML5 + CSS3</span></li>
            <li><span className="footer-item-text"><i className="fab fa-js" style={{ color: 'var(--color-primary)', marginRight: 8 }}></i>JavaScript vanilla</span></li>
            <li><span className="footer-item-text"><i className="fas fa-font" style={{ color: 'var(--color-primary)', marginRight: 8 }}></i>Poppins · FA6</span></li>
            <li><span className="footer-item-text"><i className="fas fa-leaf" style={{ color: 'var(--color-primary)', marginRight: 8 }}></i>Tema sakura</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} <strong style={{ color: 'var(--color-primary)' }}>WhiteMoonCy</strong>. Todos los derechos reservados.</p>
        <div className="footer-meta">
          <div className="visitor-counter">
            <i className="fas fa-eye" aria-hidden="true"></i>
            <span>{count !== null ? formatCount(count) : '···'}</span>
            <small>visitas</small>
          </div>
          <span className="dot-sep" aria-hidden="true">·</span>
          <p>Hecho con <span className="heart" aria-hidden="true">♥</span> desde Chile</p>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
