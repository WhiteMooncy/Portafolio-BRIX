/* global React */

// Font Awesome 6 brand icons for techs that have them
const TECH = {
  HTML:        { icon: 'fab fa-html5' },
  CSS:         { icon: 'fab fa-css3-alt' },
  JavaScript:  { icon: 'fab fa-js' },
  Bootstrap:   { icon: 'fab fa-bootstrap' },
  PHP:         { icon: 'fab fa-php' },
  Python:      { icon: 'fab fa-python' },
  Java:        { icon: 'fab fa-java' },
  'C#':        { icon: 'fas fa-hashtag' },
  MySQL:       { icon: 'fas fa-database' },
  'SQL Server':{ icon: 'fas fa-server' },
  Git:         { icon: 'fab fa-git-alt' },
  GitHub:      { icon: 'fab fa-github' },
  XAMPP:       { icon: 'fas fa-cubes' },
  'VS Code':   { icon: 'fas fa-code' },
};

const STACK_GROUPS = [
  { title: 'Frontend',        catIcon: 'fas fa-paint-brush',  items: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'] },
  { title: 'Backend',         catIcon: 'fas fa-server',       items: ['PHP', 'Python', 'Java', 'C#'] },
  { title: 'Bases de datos',  catIcon: 'fas fa-database',     items: ['MySQL', 'SQL Server'] },
  { title: 'Herramientas',    catIcon: 'fas fa-toolbox',      items: ['Git', 'GitHub', 'XAMPP', 'VS Code'] },
];

function Stack() {
  return (
    <section className="stack-section reveal" data-screen-label="Stack">
      <h2>Stack actual</h2>
      <div className="stack-grid">
        {STACK_GROUPS.map(g => (
          <div key={g.title} className="stack-group">
            <div className="stack-group-head">
              <span className="stack-group-icon"><i className={g.catIcon}></i></span>
              <h3>{g.title}</h3>
            </div>
            <div className="stack-chips">
              {g.items.map(t => {
                const meta = TECH[t] || {};
                return (
                  <span key={t} className="stack-chip">
                    {meta.icon && <i className={meta.icon}></i>}
                    {t}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

window.Stack = Stack;
