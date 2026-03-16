'use client';
import { motion, useReducedMotion } from 'framer-motion';
import CountUp from 'react-countup';
import { useTranslations } from 'next-intl';

interface Stat {
  end: number;
  prefix?: string;
  suffix?: string;
  labelKey: 'years' | 'projects' | 'companies' | 'countries';
}

const STATS: Stat[] = [
  { end: 5, prefix: '+', labelKey: 'years' },
  { end: 10, suffix: '+', labelKey: 'projects' },
  { end: 4, labelKey: 'companies' },
  { end: 3, labelKey: 'countries' },
];

export default function Stats() {
  const t = useTranslations('stats');
  const prefersReduced = useReducedMotion();

  return (
    <section
      style={{
        backgroundColor: '#1A1D2B',
        borderTop: '1px solid #1E293B',
        borderBottom: '1px solid #1E293B',
        padding: '3rem 1.5rem',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '2rem',
          textAlign: 'center',
        }}
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.labelKey}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={
              prefersReduced
                ? undefined
                : { duration: 0.5, delay: i * 0.1, ease: 'easeOut' }
            }
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}
          >
            <span
              style={{
                fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1,
              }}
            >
              {prefersReduced ? (
                `${stat.prefix ?? ''}${stat.end}${stat.suffix ?? ''}`
              ) : (
                <CountUp
                  end={stat.end}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  enableScrollSpy
                  scrollSpyOnce
                  duration={2}
                />
              )}
            </span>
            <span
              style={{
                color: '#94A3B8',
                fontSize: '0.875rem',
                fontWeight: 500,
                lineHeight: 1.4,
              }}
            >
              {t(stat.labelKey)}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
