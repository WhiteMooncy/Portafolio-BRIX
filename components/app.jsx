/* global React, ReactDOM, Navbar, Hero, Stats, Stack, About, Projects, Contact, Footer */
const { useState, useEffect } = React;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error('[Portfolio Error]', error, info.componentStack); }
  render() {
    if (this.state.hasError) return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#fff' }}>
        <h2 style={{ color: '#ff416c', marginBottom: '1rem' }}>Algo salió mal</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
          Recarga la página para continuar.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{ padding: '0.75rem 2rem', background: '#ff416c', color: '#fff', border: 'none', borderRadius: '9999px', cursor: 'pointer', fontWeight: 600, fontSize: '1rem' }}
        >
          Recargar
        </button>
      </div>
    );
    return this.props.children;
  }
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { setVisible(window.scrollY > 600); ticking = false; });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      className={`back-to-top${visible ? ' visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver arriba"
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
}

function useScrollReveal() {
  useEffect(() => {
    if (!window.PortfolioCompat || PortfolioCompat.prefersReducedMotion()) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
      return;
    }
    const obs = PortfolioCompat.createIntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    if (!obs) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
      return;
    }
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function App() {
  const [active, setActive] = useState('inicio');
  useScrollReveal();

  const handleNavigate = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 130;
      const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
      if (window.PortfolioCompat) PortfolioCompat.smoothScrollTo(y);
      else window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const sections = ['inicio', 'acerca', 'proyectos', 'contacto'];
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const center = window.scrollY + window.innerHeight / 3;
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el && el.offsetTop <= center) { setActive(sections[i]); break; }
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <ErrorBoundary>
      <Navbar active={active} onNavigate={handleNavigate} />
      <main>
        <Hero onNavigate={handleNavigate} />
        <Stats />
        <About />
        <Stack />
        <Projects />
        <Contact />
      </main>
      <Footer onNavigate={handleNavigate} />
      <BackToTop />
    </ErrorBoundary>
  );
}

if (window.PortfolioCompat) {
  PortfolioCompat.createRoot(document.getElementById('root')).render(<App />);
} else {
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
}

if (window.PortfolioCompat) {
  PortfolioCompat.registerServiceWorker();
}
