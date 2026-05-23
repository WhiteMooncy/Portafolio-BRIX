/* global React */

function CountUp({ to, suffix }) {
  const [n, setN] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.PortfolioCompat || !PortfolioCompat.supportsIntersectionObserver()) {
      setN(to);
      return;
    }
    const obs = PortfolioCompat.createIntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = window.performance && performance.now ? performance.now() : Date.now();
        const dur = 1200;
        const raf = window.requestAnimationFrame || function(cb) { return window.setTimeout(() => cb(Date.now()), 16); };
        const tick = (t) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(eased * to));
          if (p < 1) raf(tick);
        };
        raf(tick);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (!obs) {
      setN(to);
      return;
    }
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return (
    <span ref={ref} className="stat-value">
      {n}
      {suffix && <span className="suffix">{suffix}</span>}
    </span>
  );
}

function Stats() {
  const stats = (window.SiteData && window.SiteData.stats) || [];
  return (
    <section className="stats-section" data-screen-label="Stats">
      {stats.map((s, i) => (
        <div key={s.label} className="stat-item reveal" data-delay={i * 100}>
          <span className="stat-icon"><i className={s.icon}></i></span>
          <CountUp to={s.value} suffix={s.suffix} />
          <span className="stat-label">{s.label}</span>
          <span className="stat-context">{s.context}</span>
        </div>
      ))}
    </section>
  );
}

window.Stats = Stats;
