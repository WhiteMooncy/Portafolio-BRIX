/* global React, ProjectTag */

const FILTERS = ['Todos', 'Frontend', 'Backend', 'Full Stack'];

function ProjectCard({ project, onOpen }) {
  const ref = React.useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    if (window.PortfolioCompat && PortfolioCompat.prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (0.5 - y) * 8;
    const ry = (x - 0.5) * 10;
    el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-8px)`;
  };
  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = '';
  };

  return (
    <article
      ref={ref}
      className="project-card"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={() => onOpen(project)}
    >
      <div className="project-image-container">
        <img src="assets/placeholders/project-thumb.svg" alt={`Vista previa de ${project.title}`} loading="lazy" />
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.type}</p>
        <div className="project-tags">
          {project.tags.map(t => <ProjectTag key={t}>{t}</ProjectTag>)}
        </div>
        <div className="project-links" onClick={e => e.stopPropagation()}>
          <a className="project-link" href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`Ver demo de ${project.title}`}>
            <i className="fas fa-search"></i> Ver Proyecto
          </a>
          <a className="project-link" href={project.repo} target="_blank" rel="noopener noreferrer" aria-label={`Repositorio de ${project.title} en GitHub`}>
            <i className="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
    </article>
  );
}

function ProjectModal({ project, onClose }) {
  const modalRef = React.useRef(null);

  React.useEffect(() => {
    const prevFocus = document.activeElement;
    const modal = modalRef.current;

    const getFocusable = () => modal
      ? Array.from(modal.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'))
      : [];

    // Mover foco al primer elemento (botón cerrar) al abrir
    const focusable = getFocusable();
    if (focusable[0]) focusable[0].focus();

    const handleKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;
      const els = getFocusable();
      if (!els.length) { e.preventDefault(); return; }
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
      // Restaurar foco al elemento que lo tenía antes de abrir el modal
      if (prevFocus && typeof prevFocus.focus === 'function') prevFocus.focus();
    };
  }, [onClose]);

  if (!project) return null;
  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div
        className="project-modal"
        ref={modalRef}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button className="project-modal-close" onClick={onClose} aria-label="Cerrar modal">
          <i className="fas fa-times"></i>
        </button>
        <div className="project-modal-image">
          <img src="assets/placeholders/project-thumb.svg" alt={`Vista previa de ${project.title}`} />
        </div>
        <div className="project-modal-body">
          <span className="meta">{project.cats.join(' · ')}</span>
          <h3 id="modal-title">{project.title}</h3>
          <p style={{ color: '#ff7c9f', fontWeight: 500, fontSize: '0.9rem' }}>{project.type}</p>
          <p>{project.summary}</p>
          <div className="tags">
            {project.tags.map(t => <ProjectTag key={t}>{t}</ProjectTag>)}
          </div>
          <div className="modal-cta-row">
            <a className="btn-cta-primary" href={project.demo} target="_blank" rel="noopener noreferrer">
              Ver demo <i className="fas fa-arrow-right"></i>
            </a>
            <a className="btn-cta-secondary" href={project.repo} target="_blank" rel="noopener noreferrer">
              Repositorio <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [filter, setFilter] = React.useState('Todos');
  const [open, setOpen] = React.useState(null);
  const PROJECTS = (window.SiteData && window.SiteData.projects) || [];

  const filtered = filter === 'Todos'
    ? PROJECTS
    : PROJECTS.filter(p => p.cats.includes(filter));

  return (
    <section className="Projects-section" id="proyectos" data-screen-label="03 Proyectos">
      <h2 className="MyProjects-title">Mis Proyectos</h2>
      <div className="project-filters" role="group" aria-label="Filtrar proyectos por categoría">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`project-filter${filter === f ? ' active' : ''}`}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="projects-grid">
        {filtered.map(p => <ProjectCard key={p.id} project={p} onOpen={setOpen} />)}
      </div>
      {open && <ProjectModal project={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

window.Projects = Projects;
window.ProjectCard = ProjectCard;
window.ProjectModal = ProjectModal;
