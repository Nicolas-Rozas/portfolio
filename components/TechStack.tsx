'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const STACK = [
  {
    category: 'Frontend',
    color: '#3B82F6',
    techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    color: '#8B5CF6',
    techs: ['Node.js', 'Express', 'Django', 'Python', 'REST APIs'],
  },
  {
    category: 'Mobile',
    color: '#06B6D4',
    techs: ['React Native', 'iOS', 'Android', 'Expo'],
  },
  {
    category: 'Database',
    color: '#22C55E',
    techs: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase'],
  },
  {
    category: 'Cloud & DevOps',
    color: '#F59E0B',
    techs: ['AWS', 'Vercel', 'Docker', 'CI/CD'],
  },
  {
    category: 'AI & Automation',
    color: '#EC4899',
    techs: ['OpenAI API', 'n8n', 'WhatsApp API', 'GPT-4'],
  },
];

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────────

function TiltCard({
  group,
  gi,
  prefersReduced,
}: {
  group: (typeof STACK)[number];
  gi: number;
  prefersReduced: boolean | null;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 12, y: dx * 12 });
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }

  return (
    <motion.div
      key={group.category}
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={
        prefersReduced
          ? undefined
          : { duration: 0.3, delay: gi * 0.07, ease: 'easeOut' }
      }
      style={{ perspective: '800px', height: '100%' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundColor: '#1A1D2B',
          border: `1px solid ${isHovered ? group.color + '55' : group.color + '22'}`,
          borderRadius: '14px',
          padding: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          boxSizing: 'border-box',
          transform: prefersReduced
            ? 'none'
            : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
          transition: isHovered
            ? 'transform 0.08s ease-out, border-color 0.2s ease, box-shadow 0.2s ease'
            : 'transform 0.45s cubic-bezier(0.23,1,0.32,1), border-color 0.2s ease, box-shadow 0.2s ease',
          boxShadow: isHovered
            ? `0 20px 50px -12px ${group.color}30, 0 0 0 1px ${group.color}20`
            : 'none',
          willChange: 'transform',
        }}
      >
        {/* Dynamic glow spot that follows cursor */}
        {isHovered && !prefersReduced && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${group.color}18 0%, transparent 60%)`,
              pointerEvents: 'none',
              borderRadius: '14px',
            }}
          />
        )}

        {/* Shiny edge highlight on hover */}
        {isHovered && !prefersReduced && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(135deg, ${group.color}14 0%, transparent 40%, transparent 60%, ${group.color}08 100%)`,
              pointerEvents: 'none',
              borderRadius: '14px',
            }}
          />
        )}

        {/* Category label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: group.color,
              boxShadow: isHovered ? `0 0 12px ${group.color}` : `0 0 8px ${group.color}`,
              flexShrink: 0,
              transition: 'box-shadow 0.2s ease',
            }}
          />
          <span
            style={{
              color: group.color,
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {group.category}
          </span>
        </div>

        {/* Tech pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', position: 'relative' }}>
          {group.techs.map((tech, ti) => (
            <motion.span
              key={tech}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0 }}
              transition={
                prefersReduced
                  ? undefined
                  : { duration: 0.2, delay: gi * 0.07 + ti * 0.04 }
              }
              whileHover={prefersReduced ? undefined : { scale: 1.08, y: -2 }}
              style={{
                display: 'inline-block',
                backgroundColor: `${group.color}14`,
                color: '#CBD5E1',
                border: `1px solid ${group.color}30`,
                borderRadius: '6px',
                padding: '0.3rem 0.75rem',
                fontSize: '0.82rem',
                fontWeight: 500,
                cursor: 'default',
                transition: 'background-color 0.15s ease',
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function TechStack() {
  const t = useTranslations('techstack');
  const prefersReduced = useReducedMotion();

  return (
    <section
      style={{
        backgroundColor: '#0A0D14',
        padding: '5rem 1.5rem',
        borderTop: '1px solid #1E293B',
        borderBottom: '1px solid #1E293B',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={prefersReduced ? undefined : { duration: 0.35, ease: 'easeOut' }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.25rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: '0.5rem',
            }}
          >
            {t('title')}
          </h2>
          <p style={{ color: '#64748B', fontSize: '1rem' }}>{t('subtitle')}</p>
        </motion.div>

        {/* Grid of tilt cards */}
        <div
          className="techstack-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridAutoRows: '1fr',
            gap: '1.25rem',
            alignItems: 'stretch',
          }}
        >
          {STACK.map((group, gi) => (
            <TiltCard
              key={group.category}
              group={group}
              gi={gi}
              prefersReduced={prefersReduced}
            />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .techstack-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
