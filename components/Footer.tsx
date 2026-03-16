'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.footer
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={prefersReduced ? undefined : { duration: 0.6, ease: 'easeOut' }}
      style={{
        backgroundColor: '#0F1117',
        borderTop: '1px solid #1E293B',
        padding: '1.5rem 1.5rem',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {/* Copyright */}
        <span
          style={{
            color: '#64748B',
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
        >
          Nicolás Rozas © 2026
        </span>

        {/* Social links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a
            href="https://github.com/Nicolas-Rozas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#64748B',
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
          >
            <Github size={18} />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/nicolas-sebastian-rozas-7791a1201/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#64748B',
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
          >
            <Linkedin size={18} />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
