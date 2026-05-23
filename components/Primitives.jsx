/* global React */

const PortfolioCompat = {
  prefersReducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  },
  supportsIntersectionObserver() {
    return 'IntersectionObserver' in window;
  },
  createIntersectionObserver(callback, options) {
    if (!this.supportsIntersectionObserver()) return null;
    return new IntersectionObserver(callback, options);
  },
  smoothScrollTo(top) {
    try {
      window.scrollTo({ top, behavior: 'smooth' });
    } catch (error) {
      window.scrollTo(0, top);
    }
  },
  createRoot(container) {
    if (typeof ReactDOM.createRoot === 'function') {
      return ReactDOM.createRoot(container);
    }
    return {
      render(node) {
        ReactDOM.render(node, container);
      }
    };
  },
  registerServiceWorker() {
    if (!('serviceWorker' in navigator) || !location.protocol.startsWith('http')) return;
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }, { once: true });
  },
  fetchJson(url, options) {
    if (window.fetch) return fetch(url, options);
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(options && options.method ? options.method : 'GET', url, true);
      const headers = (options && options.headers) || {};
      Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]));
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) return;
        resolve({
          ok: xhr.status >= 200 && xhr.status < 300,
          status: xhr.status,
          json: () => Promise.resolve().then(() => JSON.parse(xhr.responseText || '{}')),
        });
      };
      xhr.onerror = reject;
      xhr.send(options && options.body ? options.body : null);
    });
  },
};

function CTAPrimary({ children, ...rest }) {
  return <a className="btn-cta-primary" {...rest}>{children}</a>;
}
function CTASecondary({ children, ...rest }) {
  return <a className="btn-cta-secondary" {...rest}>{children}</a>;
}

function SkillBar({ name, value }) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => { const t = setTimeout(() => setV(value), 100); return () => clearTimeout(t); }, [value]);
  return (
    <div className="skill-item">
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-percentage">{value}%</span>
      </div>
      <div className="skill-bar">
        <div className="skill-fill" style={{ width: v + '%' }}></div>
      </div>
    </div>
  );
}

function SkillTag({ children }) {
  return <span className="skill-tag">{children}</span>;
}
function ProjectTag({ children }) {
  return <span className="project-tag">{children}</span>;
}

function TypingText({ phrases, typingSpeed = 90, erasingSpeed = 50, pauseAfterType = 2500, pauseAfterErase = 400 }) {
  const [text, setText] = React.useState(phrases[0] || '');
  const [phase, setPhase] = React.useState('hold');
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    const cur = phrases[idx];
    if (!cur) return;
    let t;
    if (phase === 'hold') {
      t = setTimeout(() => setPhase('erase'), pauseAfterType);
    } else if (phase === 'erase') {
      if (text.length > 0) {
        t = setTimeout(() => setText(cur.substring(0, text.length - 1)), erasingSpeed);
      } else {
        setIdx((idx + 1) % phrases.length);
        setPhase('type');
        t = setTimeout(() => {}, pauseAfterErase);
      }
    } else if (phase === 'type') {
      if (text.length < cur.length) {
        t = setTimeout(() => setText(cur.substring(0, text.length + 1)), typingSpeed);
      } else {
        setPhase('hold');
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, idx, phrases, typingSpeed, erasingSpeed, pauseAfterType, pauseAfterErase]);

  return (
    <div className="hero-typed-line">
      <span>{text}</span>
      <span className="cursor"></span>
    </div>
  );
}

Object.assign(window, { CTAPrimary, CTASecondary, SkillBar, SkillTag, ProjectTag, TypingText, PortfolioCompat });
