'use client';
import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, MessageCircle, Github, Linkedin } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

const PARTICLES = [
  { size: 20, color: '#2563EB', left: 15, top: 20, duration: 4,   delay: 0   },
  { size: 14, color: '#06B6D4', left: 70, top: 15, duration: 6,   delay: 1   },
  { size: 18, color: '#8B5CF6', left: 30, top: 70, duration: 5,   delay: 0.5 },
  { size: 10, color: '#2563EB', left: 85, top: 40, duration: 7,   delay: 1.5 },
  { size: 16, color: '#06B6D4', left: 55, top: 80, duration: 4.5, delay: 0.8 },
];

const LINKS = [
  { icon: Mail,          label: 'rozasnicolas23@gmail.com',          href: 'mailto:rozasnicolas23@gmail.com',    color: '#2563EB', external: true },
  { icon: MessageCircle, label: '+54 9 341-3532-704',                href: 'https://wa.me/5493413532704?text=Hola%20Nicol%C3%A1s%2C%20vi%20tu%20portfolio%20y%20me%20gustar%C3%ADa%20hablar%20sobre%20un%20proyecto.', color: '#22C55E', external: true },
  { icon: Github,        label: 'Nicolas-Rozas',                     href: 'https://github.com/Nicolas-Rozas',  color: '#94A3B8', external: true },
  { icon: Linkedin,      label: 'nicolas-sebastian-rozas',           href: 'https://www.linkedin.com/in/nicolas-sebastian-rozas-7791a1201/', color: '#3B82F6', external: true },
];

export default function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const prefersReduced = useReducedMotion();

  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError]     = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    try {
      const res = await fetch('https://formspree.io/f/xbdzangv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setSent(true);
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setSent(false), 5000);
      } else {
        setError(true);
        setTimeout(() => setError(false), 4000);
      }
    } catch {
      setError(true);
      setTimeout(() => setError(false), 4000);
    } finally {
      setSending(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#0F1117',
    border: '1px solid #1E293B',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    color: '#FFFFFF',
    fontSize: '0.9375rem',
    outline: 'none',
    fontFamily: 'inherit',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: '#94A3B8',
    fontSize: '0.875rem',
    fontWeight: 500,
    marginBottom: '0.4rem',
  };

  return (
    <section
      id="contacto"
      style={{ padding: '6rem 1.5rem', position: 'relative', overflow: 'hidden', backgroundColor: '#0F1117' }}
    >
      {/* Inject keyframes */}
      <style>{`
        @keyframes rotate-gradient {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
      `}</style>

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width:  p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            opacity: 0.08,
            left: `${p.left}%`,
            top:  `${p.top}%`,
            animation: prefersReduced ? 'none' : `float-${i + 1} ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            pointerEvents: 'none',
          }}
        />
      ))}

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={prefersReduced ? undefined : { duration: 0.5, ease: 'easeOut' }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: '0.5rem',
            }}
          >
            {t('title')}
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.0625rem' }}>{t('subtitle')}</p>
        </motion.div>

        {/* Main card with animated gradient border */}
        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={prefersReduced ? undefined : { duration: 0.55, ease: 'easeOut' }}
        >
          {/* Gradient border wrapper */}
          <div
            style={{
              background: 'linear-gradient(135deg, #2563EB, #06B6D4, #8B5CF6, #2563EB)',
              backgroundSize: '300% 300%',
              animation: prefersReduced ? 'none' : 'rotate-gradient 4s ease infinite',
              borderRadius: '20px',
              padding: '2px',
            }}
          >
            {/* Inner card */}
            <div style={{ background: '#1A1D2B', borderRadius: '18px', padding: 'clamp(1.5rem, 4vw, 3rem)' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '3rem',
                  alignItems: 'start',
                }}
              >
                {/* ── Left column: form ── */}
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>{t('name_label')}</label>
                    <input
                      type="text"
                      required
                      placeholder={t('name_placeholder')}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>{t('email_label')}</label>
                    <input
                      type="email"
                      required
                      placeholder={t('email_placeholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={labelStyle}>{t('message_label')}</label>
                    <textarea
                      rows={4}
                      required
                      placeholder={t('message_placeholder')}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={prefersReduced || sending ? undefined : { scale: 1.02 }}
                    whileTap={prefersReduced  || sending ? undefined : { scale: 0.98 }}
                    style={{
                      width: '100%',
                      background: sent
                        ? 'linear-gradient(135deg, #22C55E, #16A34A)'
                        : error
                        ? 'linear-gradient(135deg, #EF4444, #DC2626)'
                        : 'linear-gradient(135deg, #2563EB, #06B6D4)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '0.9rem 2rem',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: sending ? 'not-allowed' : 'pointer',
                      fontFamily: 'inherit',
                      letterSpacing: '0.01em',
                      transition: 'background 0.3s ease',
                      opacity: sending ? 0.75 : 1,
                    }}
                  >
                    {sending
                      ? (locale === 'es' ? 'Enviando...' : 'Sending...')
                      : sent
                      ? (locale === 'es' ? '✓ ¡Mensaje enviado!' : '✓ Message sent!')
                      : error
                      ? (locale === 'es' ? '✗ Error, intentá de nuevo' : '✗ Error, try again')
                      : t('send_button')
                    }
                  </motion.button>
                </form>

                {/* ── Right column: contact info ── */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    justifyContent: 'center',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        color: '#FFFFFF',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        marginBottom: '0.4rem',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      Nicolás Rozas
                    </h3>
                    <p style={{ color: '#94A3B8', fontSize: '0.9375rem' }}>
                      Fullstack Developer · Argentina
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {LINKS.map(({ icon: Icon, label, href, color, external }) => (
                      <motion.a
                        key={href}
                        href={href}
                        target={href.startsWith('mailto:') ? undefined : '_blank'}
                        rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                        whileHover={prefersReduced ? undefined : { x: 4 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          color: '#94A3B8',
                          textDecoration: 'none',
                          fontSize: '0.9375rem',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8'; }}
                      >
                        <Icon size={20} color={color} strokeWidth={1.75} />
                        <span>{label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
