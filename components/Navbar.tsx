'use client';
import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/navigation';
import { Menu, X } from 'lucide-react';

const NAV_KEYS = ['trayectoria', 'proyectos', 'servicios', 'contacto'] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLocale = () => {
    const newLocale = locale === 'es' ? 'en' : 'es';
    router.replace(pathname, { locale: newLocale });
  };

  const menuVariants: Variants = {
    hidden: { opacity: 0, y: -12, scaleY: 0.95 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -8, scaleY: 0.97, transition: { duration: 0.15 } },
  };

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid #1E293B',
        backgroundColor: 'rgba(15, 17, 23, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            fontSize: '1.375rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textDecoration: 'none',
            userSelect: 'none',
          }}
        >
          NR
        </a>

        {/* Desktop links */}
        <ul
          className="nav-desktop-links"
          style={{
            display: 'flex',
            gap: '2rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {NAV_KEYS.map((key) => (
            <li key={key}>
              <a
                href={`#${key}`}
                style={{
                  color: '#94A3B8',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Locale toggle */}
          <button
            onClick={toggleLocale}
            title={locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid #1E293B',
              borderRadius: '6px',
              padding: '0.3rem 0.65rem',
              color: '#94A3B8',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
              lineHeight: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.color = '#94A3B8';
            }}
          >
            <span style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em' }}>
              {locale === 'es' ? 'ES' : 'EN'}
            </span>
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="nav-hamburger"
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'none',
              alignItems: 'center',
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={prefersReduced ? undefined : menuVariants}
            initial={prefersReduced ? undefined : 'hidden'}
            animate={prefersReduced ? undefined : 'visible'}
            exit={prefersReduced ? undefined : 'exit'}
            style={{
              borderTop: '1px solid #1E293B',
              backgroundColor: '#0F1117',
              transformOrigin: 'top',
            }}
            className="nav-mobile-menu"
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: '0.75rem 1.5rem 1rem' }}>
              {NAV_KEYS.map((key) => (
                <li key={key} style={{ borderBottom: '1px solid #1E293B' }}>
                  <a
                    href={`#${key}`}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.75rem 0',
                      color: '#94A3B8',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
