'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
  },
};

const itemVariantsReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Hero() {
  const t = useTranslations('hero');
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useRef(50);
  const mouseY = useRef(50);
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (prefersReduced) return;
    let animFrame: number;
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      setGradientPos((prev) => ({
        x: lerp(prev.x, mouseX.current, 0.05),
        y: lerp(prev.y, mouseY.current, 0.05),
      }));
      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [prefersReduced]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.current = ((e.clientX - rect.left) / rect.width) * 100;
    mouseY.current = ((e.clientY - rect.top) / rect.height) * 100;
  };

  const usedItemVariants = prefersReduced ? itemVariantsReduced : itemVariants;

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: prefersReduced
          ? '#0F1117'
          : `radial-gradient(ellipse 60% 50% at ${gradientPos.x}% ${gradientPos.y}%, rgba(37, 99, 235, 0.12) 0%, transparent 70%), #0F1117`,
      }}
    >
      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M60 0L0 0 0 60'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hero-inner"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '5rem 4rem',
          display: 'grid',
          gridTemplateColumns: '1fr 300px',
          alignItems: 'center',
          gap: '5rem',
        }}
      >
        {/* ── Left: text ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Available badge */}
          <motion.div variants={usedItemVariants}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(34,197,94,0.1)',
              border: '1px solid rgba(34,197,94,0.25)',
              borderRadius: '999px',
              padding: '0.3rem 0.85rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#22C55E',
              letterSpacing: '0.02em',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', display: 'inline-block', boxShadow: '0 0 8px #22C55E' }} />
              {t('available')}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={usedItemVariants}
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              margin: 0,
              background: 'linear-gradient(135deg, #FFFFFF 60%, #94A3B8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.1,
            }}
          >
            {t('greeting')} <br />{t('name')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={usedItemVariants}
            style={{ color: '#06B6D4', fontSize: '1rem', margin: 0, fontWeight: 600, letterSpacing: '0.04em' }}
          >
            {t('subtitle')}
          </motion.p>

          {/* About */}
          <motion.p
            variants={usedItemVariants}
            style={{ color: '#94A3B8', fontSize: '1.05rem', margin: 0, lineHeight: 1.7, maxWidth: '520px' }}
          >
            {t('about')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={usedItemVariants}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <a
              href="#proyectos"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.75rem 1.75rem',
                borderRadius: '8px',
                background: '#2563EB',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.95rem',
                textDecoration: 'none',
                transition: 'background 0.2s, transform 0.15s',
                border: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1D4ED8';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2563EB';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {t('cta_projects')} →
            </a>
            <motion.a
              href="#contacto"
              animate={prefersReduced ? {} : {
                boxShadow: [
                  '0 0 0px 0px rgba(37,99,235,0)',
                  '0 0 16px 4px rgba(37,99,235,0.5)',
                  '0 0 0px 0px rgba(37,99,235,0)',
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.75rem 1.75rem',
                borderRadius: '8px',
                background: 'transparent',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.95rem',
                textDecoration: 'none',
                border: '1px solid #2563EB',
                transition: 'background 0.2s, transform 0.15s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(37, 99, 235, 0.12)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              }}
            >
              {t('cta_contact')}
            </motion.a>
          </motion.div>
        </div>

        {/* ── Right: photo ── */}
        <motion.div variants={usedItemVariants}>
          <div style={{ position: 'relative', width: 300, height: 300 }}>
            {/* Outer glow — blurred, slower */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: -10,
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, transparent 0%, transparent 40%, #2563EB 55%, #06B6D4 65%, #8B5CF6 75%, transparent 90%)',
                filter: 'blur(6px)',
                opacity: 0.9,
              }}
            />
            {/* Hard ring — sharp colors */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: -5,
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, #0F1117 0%, #0F1117 40%, #2563EB 55%, #06B6D4 65%, #8B5CF6 75%, #0F1117 88%)',
              }}
            />
            {/* Dark mask + image */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                padding: 5,
                background: '#0F1117',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src="/hero.jpg"
                  alt="Nicolás Rozas"
                  fill
                  priority
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .hero-inner {
            grid-template-columns: 1fr !important;
            text-align: center;
            justify-items: center;
          }
        }
      `}</style>
    </section>
  );
}
