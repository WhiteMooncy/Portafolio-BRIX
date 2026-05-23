/* global React, SkillBar, SkillTag */

function ProfileMockup() {
  const [active, setActive] = React.useState(0);
  const frameRef = React.useRef(null);

  React.useEffect(() => {
    if (window.PortfolioCompat && PortfolioCompat.prefersReducedMotion()) return;
    const interval = setInterval(() => setActive(a => (a + 1) % 3), 3500);
    return () => clearInterval(interval);
  }, []);

  const handleMove = (e) => {
    const el = frameRef.current;
    if (!el || (window.PortfolioCompat && PortfolioCompat.prefersReducedMotion())) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateX(${((0.5 - y) * 14).toFixed(2)}deg) rotateY(${((x - 0.5) * 18).toFixed(2)}deg)`;
  };
  const handleLeave = () => {
    const el = frameRef.current;
    if (el) el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  };

  const data = window.SiteData || {};
  const MSKILLS = (data.skills || []).slice(0, 5);
  const MPROJECTS = (data.projects || []).map(p => ({
    name: p.title,
    type: p.cats[0] || '',
    tech: p.tags.join(' · '),
  }));

  const screens = [
    <div className="mscreen-hero" key="hero">
      <span className="mscreen-badge"><span className="mdot"></span>Disponible para proyectos</span>
      <p className="mscreen-name">Hola, soy <strong>Mateo</strong></p>
      <p className="mscreen-role">Full Stack Developer (Junior)<span className="mcursor">_</span></p>
      <div className="mscreen-lines"><span></span><span></span><span></span></div>
      <div className="mscreen-btns">
        <span className="mbtn-primary">Proyectos</span>
        <span className="mbtn-secondary">Contacto</span>
      </div>
    </div>,

    <div className="mscreen-skills" key="skills">
      {MSKILLS.map(([n, v]) => (
        <div key={n} className="mskill">
          <div className="mskill-head"><span>{n}</span><span>{v}%</span></div>
          <div className="mskill-bar"><div className="mskill-fill" style={{ width: v + '%' }}></div></div>
        </div>
      ))}
    </div>,

    <div className="mscreen-projects" key="projects">
      {MPROJECTS.map(p => (
        <div key={p.name} className="mproject-card">
          <div className="mproject-top">
            <span className="mproject-name">{p.name}</span>
            <span className="mproject-type">{p.type}</span>
          </div>
          <span className="mproject-tech">{p.tech}</span>
        </div>
      ))}
    </div>,
  ];

  return (
    <div className="mockup-wrapper" aria-hidden="true">
      <div className="mockup-frame" ref={frameRef} onMouseMove={handleMove} onMouseLeave={handleLeave}>
        <div className="mockup-titlebar">
          <span className="mockup-dot" style={{ background: '#ff5f56' }}></span>
          <span className="mockup-dot" style={{ background: '#ffbd2e' }}></span>
          <span className="mockup-dot" style={{ background: '#27c93f' }}></span>
          <span className="mockup-url">whitemooncy.me</span>
        </div>
        <div className="mockup-tabs">
          {['Inicio', 'Skills', 'Proyectos'].map((t, i) => (
            <button key={t} className={active === i ? 'active' : ''} onClick={() => setActive(i)} tabIndex="-1">{t}</button>
          ))}
        </div>
        <div className="mockup-screen">
          {screens[active]}
        </div>
      </div>
    </div>
  );
}

function About() {
  const data = window.SiteData || {};
  const skills = data.skills || [];
  const tags = data.skillTags || [];

  return (
    <section className="About-section" id="acerca" data-screen-label="02 Acerca">
      <div className="About-image-container reveal">
        <ProfileMockup />
      </div>
      <div className="About-content reveal" data-delay="100">
        <h2 className="About-title">Acerca de Mí</h2>
        <p className="About-summary">
          <strong>Técnico de Nivel Superior titulado</strong> en Programación y Análisis de Sistemas (AIEP),
          actualmente cursando <strong>Ingeniería de Ejecución en Informática</strong>. Experiencia en
          desarrollo web full stack y en operaciones de ciberseguridad con Wazuh en entornos Linux.
        </p>
        <div className="About-detail-block">
          <h3 className="Detail-title">| Educación</h3>
          <p className="Detail-subtitle">Instituto Profesional AIEP · San Felipe</p>
          <p className="Detail-text">Ingeniería de Ejecución en Informática · Mención Desarrollo de Sistemas</p>
          <p className="Detail-status">Primer año · En curso</p>
        </div>
        <div className="About-detail-block">
          <h3 className="Detail-title">| Experiencia</h3>
          <p className="Detail-subtitle">Analista SOC · Ciberseguridad</p>
          <p className="Detail-text">
            Operaciones con <strong>Wazuh</strong> en entornos Linux y desarrollo de sitios con Google Sites en{' '}
            <a className="referent" href="https://emtecgroup.net"><strong>Emtec Group — Team SOC</strong></a>
          </p>
          <p className="Detail-status">2026</p>
        </div>
        <div className="About-detail-block">
          <h3 className="Detail-title">| Experiencia anterior</h3>
          <p className="Detail-subtitle">Desarrollador y Analista</p>
          <p className="Detail-text">
            Administración y mapeo de datos de máquinas virtuales en{' '}
            <a className="referent" href="https://emtecgroup.net"><strong>Emtec Group</strong></a>
          </p>
          <p className="Detail-status">Enero 2025 – Febrero 2025</p>
        </div>
        <div className="About-detail-block">
          <h3 className="Detail-title">| Habilidades Técnicas</h3>
          <div className="skills-progress">
            {skills.map(([n, v]) => <SkillBar key={n} name={n} value={v} />)}
          </div>
          <div className="Skills-container">
            {tags.map(t => <SkillTag key={t}>{t}</SkillTag>)}
          </div>
        </div>
      </div>
    </section>
  );
}

window.About = About;
