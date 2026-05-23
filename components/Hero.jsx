/* global React, CTAPrimary, CTASecondary, TypingText */

function AvailabilityBadge() {
  return (
    <div className="availability-badge">
      <span className="dot"></span>
      Disponible para proyectos
    </div>
  );
}

function CursorGlow({ containerRef }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = containerRef.current;
    const glow = ref.current;
    if (!el || !glow) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      glow.style.left = (e.clientX - r.left) + 'px';
      glow.style.top  = (e.clientY - r.top) + 'px';
    };
    el.addEventListener('pointermove', onMove);
    return () => el.removeEventListener('pointermove', onMove);
  }, [containerRef]);
  return <div className="cursor-glow" ref={ref}></div>;
}

function Petals({ count = 14 }) {
  const petals = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      size: 8 + Math.random() * 14,
      fallDur: 9 + Math.random() * 9,
      swingDur: 2 + Math.random() * 3,
      delay: -Math.random() * 12,
      opacity: 0.5 + Math.random() * 0.5,
    }));
  }, [count]);
  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: p.left + '%',
            width: p.size + 'px',
            height: p.size + 'px',
            opacity: p.opacity,
            animationDuration: `${p.fallDur}s, ${p.swingDur}s`,
            animationDelay: `${p.delay}s, ${p.delay / 2}s`,
          }}
        />
      ))}
    </div>
  );
}

function Hero({ onNavigate }) {
  const heroRef = React.useRef(null);

  React.useEffect(() => {
    if (window.PortfolioCompat && PortfolioCompat.prefersReducedMotion()) return;
    const el = heroRef.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY;
      el.style.setProperty('--parallax-y', (y * 0.18).toFixed(1) + 'px');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="info-section" id="inicio" ref={heroRef} data-screen-label="01 Hero">
      <CursorGlow containerRef={heroRef} />
      <Petals count={16} />
      <div className="Welcome-Section">
        <AvailabilityBadge />
        <p className="hero-greeting">Hola, soy Mateo</p>
        <h1 className="Hello-title">Desarrollador</h1>
        <TypingText phrases={['Web Developer', 'Analista de Sistemas']} />
        <p className="description">
          Construyo <strong>experiencias digitales funcionales</strong>.
          Estudiante de Programación con experiencia en desarrollo web completo
          y administración de infraestructura en{' '}
          <a className="inline-link" href="https://emtecgroup.net" target="_blank" rel="noopener">Emtec Group</a>.
        </p>

        <div className="hero-cta">
          <CTAPrimary href="#proyectos" onClick={e => { e.preventDefault(); onNavigate('proyectos'); }}>
            Ver mis proyectos <i className="fas fa-arrow-right"></i>
          </CTAPrimary>
          <CTASecondary href="#contacto" onClick={e => { e.preventDefault(); onNavigate('contacto'); }}>
            Contacto <i className="fas fa-envelope"></i>
          </CTASecondary>
        </div>

        <div className="social-icons-bar">
          <a href="https://github.com/WhiteMooncy" aria-label="GitHub" target="_blank" rel="noopener"><i className="fab fa-github"></i></a>
          <a href="https://www.linkedin.com/in/whitemooncy" aria-label="LinkedIn" target="_blank" rel="noopener"><i className="fab fa-linkedin-in"></i></a>
          <a href="https://discord.com/users/716745899703009310" aria-label="Discord" target="_blank" rel="noopener"><i className="fab fa-discord"></i></a>
          <a href="mailto:mateo.villablanca.gall@gmail.com" aria-label="Email"><i className="fas fa-envelope"></i></a>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
window.AvailabilityBadge = AvailabilityBadge;
window.Petals = Petals;
