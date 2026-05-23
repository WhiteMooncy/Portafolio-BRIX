/* global React, PortfolioCompat */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Contact() {
  const [sent, setSent] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [form, setForm] = React.useState({ name: '', email: '', subject: '', message: '', _gotcha: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form._gotcha && form._gotcha.trim() !== '') return;

    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!form.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!EMAIL_RE.test(form.email.trim())) {
      newErrors.email = 'Ingresa un email válido';
    }
    if (!form.message.trim()) newErrors.message = 'El mensaje es obligatorio';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setErrors({});
    setSubmitError('');
    setSubmitting(true);
    try {
      const res = await PortfolioCompat.fetchJson('https://formspree.io/f/xgvrwdqb', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: '', email: '', subject: '', message: '', _gotcha: '' });
        setTimeout(() => setSent(false), 3500);
      } else {
        const json = await res.json().catch(() => ({}));
        const msg = json.error || json.message || 'Error al enviar el formulario';
        setSubmitError(msg);
        setTimeout(() => setSubmitError(''), 4000);
      }
    } catch {
      setSubmitError('Error de red. Verifica tu conexión e intenta de nuevo.');
      setTimeout(() => setSubmitError(''), 4000);
    } finally {
      setSubmitting(false);
    }
  };

  const setField = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  return (
    <section className="contact-section" id="contacto" data-screen-label="04 Contacto">
      <h2 className="section-title">Contacto</h2>
      <p className="section-subtitle">¿Tienes un proyecto en mente? ¡Hablemos!</p>

      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-envelope" aria-hidden="true"></i>
            <div>
              <h3>Email</h3>
              <a href="mailto:mateo.villablanca.gall@gmail.com">mateo.villablanca.gall@gmail.com</a>
            </div>
          </div>
          <div className="contact-item">
            <i className="fab fa-linkedin" aria-hidden="true"></i>
            <div>
              <h3>LinkedIn</h3>
              <a href="https://www.linkedin.com/in/whitemooncy" target="_blank" rel="noopener noreferrer">linkedin.com/in/whitemooncy</a>
            </div>
          </div>
          <div className="contact-item">
            <i className="fab fa-github" aria-hidden="true"></i>
            <div>
              <h3>GitHub</h3>
              <a href="https://github.com/WhiteMooncy" target="_blank" rel="noopener noreferrer">github.com/WhiteMooncy</a>
            </div>
          </div>
          <div className="contact-item">
            <i className="fab fa-discord" aria-hidden="true"></i>
            <div>
              <h3>Discord</h3>
              <a href="https://discord.com/users/716745899703009310" target="_blank" rel="noopener noreferrer">WhiteMooncy</a>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {/* Honeypot anti-spam — oculto para humanos, visible para bots */}
          <input type="text" name="_gotcha" autoComplete="off" tabIndex="-1" aria-hidden="true"
            value={form._gotcha} onChange={setField('_gotcha')}
            style={{ display: 'none' }} />

          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input id="name" type="text" placeholder="Tu nombre" required autoComplete="name"
              className={errors.name ? 'input-error' : ''}
              value={form.name} onChange={setField('name')} />
            {errors.name && <span className="field-error" role="alert">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="tu@email.com" required autoComplete="email"
              className={errors.email ? 'input-error' : ''}
              value={form.email} onChange={setField('email')} />
            {errors.email && <span className="field-error" role="alert">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="subject">Asunto</label>
            <input id="subject" type="text" placeholder="Asunto del mensaje"
              value={form.subject} onChange={setField('subject')} />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" rows={5} placeholder="Escribe tu mensaje aquí…" required
              className={errors.message ? 'input-error' : ''}
              value={form.message} onChange={setField('message')} />
            {errors.message && <span className="field-error" role="alert">{errors.message}</span>}
          </div>
          <button type="submit" className="btn-submit" disabled={submitting} aria-busy={submitting}>
            <i className="fas fa-paper-plane" aria-hidden="true"></i>
            {submitting ? ' Enviando...' : ' Enviar Mensaje'}
          </button>
        </form>
      </div>

      {sent && (
        <div className="notification" role="alert" aria-live="assertive">
          <i className="fas fa-check-circle" aria-hidden="true"></i> ¡Mensaje enviado con éxito!
        </div>
      )}
      {submitError && (
        <div className="notification notification--error" role="alert" aria-live="assertive">
          <i className="fas fa-exclamation-circle" aria-hidden="true"></i> {submitError}
        </div>
      )}
    </section>
  );
}

window.Contact = Contact;
