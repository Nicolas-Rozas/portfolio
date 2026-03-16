'use client';

import { useRef, useState, Fragment } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';

const ENTRIES = {
  es: [
    {
      company: 'Freelance',
      period: '2023 — Presente',
      role: 'Fullstack Developer — Freelance',
      description:
        'Desarrollo de websites y web-apps a medida. E-commerce (Question Colors), AI-bots, chatbots WhatsApp, sistemas de automatización con n8n y GPT.',
      tags: ['Next.js', 'TypeScript', 'n8n', 'OpenAI API', 'WhatsApp API', 'Vercel'],
      dotColor: '#8B5CF6',
    },
    {
      company: 'PSH',
      period: 'Jul 2024 — Presente',
      role: 'Fullstack Developer — PSH',
      description:
        'Software factory argentina con clientes internacionales. Fullstack en Angular, React, Gatsby y Strapi. Productos: Seesaw (portfolios educativos), Life Homecare (salud domiciliaria), Pathful (orientación vocacional K-16).',
      tags: ['Angular', 'React', 'Gatsby', 'Strapi', 'Python', 'Django'],
      dotColor: '#3B82F6',
    },
    {
      company: 'Oaks Valley',
      period: '2022 — Jul 2024',
      role: 'Frontend Developer — Oaks Valley',
      description:
        'Startup FinTech. Wakeful: plataforma de inversiones LATAM en mercados EE.UU. Bitennial: app de crypto trading mobile.',
      tags: ['React', 'React Native', 'Django', 'Python', 'WebSocket', 'REST APIs'],
      dotColor: '#F59E0B',
    },
    {
      company: 'Giant',
      period: 'May 2021 — Mar 2022',
      role: 'Fullstack Developer — Giant',
      description:
        'Software factory UK. E-commerce y plataformas para ONGs (Make-A-Wish). React, Node.js, integración pagos.',
      tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
      dotColor: '#52525B',
    },
  ],
  en: [
    {
      company: 'Freelance',
      period: '2023 — Present',
      role: 'Fullstack Developer — Freelance',
      description:
        'Custom websites and web apps. E-commerce (Question Colors), AI bots, WhatsApp chatbots, automation with n8n and GPT.',
      tags: ['Next.js', 'TypeScript', 'n8n', 'OpenAI API', 'WhatsApp API', 'Vercel'],
      dotColor: '#8B5CF6',
    },
    {
      company: 'PSH',
      period: 'Jul 2024 — Present',
      role: 'Fullstack Developer — PSH',
      description:
        'Argentine software factory with international clients. Fullstack across Angular, React, Gatsby and Strapi. Products: Seesaw (K-12 portfolios), Life Homecare (home health), Pathful (K-16 career guidance).',
      tags: ['Angular', 'React', 'Gatsby', 'Strapi', 'Python', 'Django'],
      dotColor: '#3B82F6',
    },
    {
      company: 'Oaks Valley',
      period: '2022 — Jul 2024',
      role: 'Frontend Developer — Oaks Valley',
      description:
        'FinTech startup. Wakeful: LATAM investment platform for US markets. Bitennial: crypto trading mobile app.',
      tags: ['React', 'React Native', 'Django', 'Python', 'WebSocket', 'REST APIs'],
      dotColor: '#F59E0B',
    },
    {
      company: 'Giant',
      period: 'May 2021 — Mar 2022',
      role: 'Fullstack Developer — Giant',
      description:
        'UK software factory. E-commerce and nonprofit platforms (Make-A-Wish). React, Node.js, payments.',
      tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
      dotColor: '#52525B',
    },
  ],
};

export default function Timeline() {
  const t = useTranslations('timeline');
  const locale = useLocale();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const entries = ENTRIES[locale as 'es' | 'en'] ?? ENTRIES.en;

  return (
    <section
      id="trayectoria"
      ref={sectionRef}
      style={{
        backgroundColor: '#0F1117',
        padding: '5rem 0',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '0.75rem',
            }}
          >
            {t('title')}
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1rem' }}>{t('subtitle')}</p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="timeline-desktop">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 60px 1fr',
              gap: '0 1rem',
            }}
          >
            {entries.map((entry, i) => {
              const isLast = i === entries.length - 1;
              const isHovered = hoveredKey === `d-${i}`;

              return (
                <Fragment key={entry.company}>
                  {/* Col 1: fecha */}
                  <div
                    style={{
                      textAlign: 'right',
                      paddingTop: '1.75rem',
                      color: '#94A3B8',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {entry.period}
                  </div>

                  {/* Col 2: línea + dot */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minHeight: isLast ? '80px' : 'auto',
                    }}
                  >
                    {/* Dot */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 12,
                        delay: i * 0.08,
                      }}
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        backgroundColor: entry.dotColor,
                        boxShadow: `0 0 12px ${entry.dotColor}88`,
                        flexShrink: 0,
                        marginTop: '1.75rem',
                        zIndex: 10,
                        position: 'relative',
                      }}
                    />

                    {/* Línea hacia abajo (excepto último) */}
                    {!isLast && (
                      <div
                        style={{
                          flex: 1,
                          width: 2,
                          backgroundColor: '#1E293B',
                          position: 'relative',
                          overflow: 'hidden',
                          marginTop: 0,
                        }}
                      >
                        <motion.div
                          initial={{ height: '0%' }}
                          whileInView={{ height: '100%' }}
                          viewport={{ once: true, amount: 0 }}
                          transition={{
                            duration: 0.55,
                            delay: i * 0.1 + 0.1,
                            ease: 'easeInOut',
                          }}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            background:
                              'linear-gradient(to bottom, #2563EB, #8B5CF6)',
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Col 3: card */}
                  <motion.div
                    initial={{ x: 80, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      type: 'spring',
                      stiffness: 100,
                      damping: 20,
                      delay: i * 0.06,
                    }}
                    onMouseEnter={() => setHoveredKey(`d-${i}`)}
                    onMouseLeave={() => setHoveredKey(null)}
                    style={{
                      backgroundColor: '#1A1D2B',
                      border: `1px solid ${isHovered ? entry.dotColor : '#1E293B'}`,
                      borderRadius: '0.75rem',
                      padding: '1.5rem',
                      marginBottom: isLast ? 0 : '1.5rem',
                      marginTop: '1rem',
                      cursor: 'default',
                      boxShadow: isHovered
                        ? `0 0 20px ${entry.dotColor}33, 0 4px 24px rgba(0,0,0,0.3)`
                        : '0 4px 16px rgba(0,0,0,0.2)',
                      transition:
                        'border-color 0.25s ease, box-shadow 0.25s ease',
                    }}
                  >
                    {/* Role */}
                    <h3
                      style={{
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {entry.role}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        color: '#94A3B8',
                        fontSize: '0.9rem',
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {entry.description}
                    </p>
                  </motion.div>
                </Fragment>
              );
            })}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="timeline-mobile" style={{ display: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {entries.map((entry, i) => {
              const isHovered = hoveredKey === `m-${i}`;

              const isLastMobile = i === entries.length - 1;
              return (
                <div key={`mobile-${entry.company}`} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  {/* Dot + line column */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      flexShrink: 0,
                      width: 24,
                      alignSelf: 'stretch',
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 12,
                        delay: i * 0.08,
                      }}
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        backgroundColor: entry.dotColor,
                        boxShadow: `0 0 10px ${entry.dotColor}88`,
                        marginTop: '1.1rem',
                        flexShrink: 0,
                        zIndex: 1,
                      }}
                    />
                    {/* Vertical line to next entry */}
                    {!isLastMobile && (
                      <div
                        style={{
                          flex: 1,
                          width: 2,
                          marginTop: 4,
                          position: 'relative',
                          overflow: 'hidden',
                          backgroundColor: '#1E293B',
                        }}
                      >
                        <motion.div
                          initial={{ height: '0%' }}
                          whileInView={{ height: '100%' }}
                          viewport={{ once: true, amount: 0 }}
                          transition={{ duration: 0.55, delay: i * 0.1 + 0.1, ease: 'easeInOut' }}
                          style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0,
                            background: 'linear-gradient(to bottom, #2563EB, #8B5CF6)',
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Card */}
                  <motion.div
                    initial={{ x: 40, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      type: 'spring',
                      stiffness: 100,
                      damping: 20,
                      delay: i * 0.06,
                    }}
                    onMouseEnter={() => setHoveredKey(`m-${i}`)}
                    onMouseLeave={() => setHoveredKey(null)}
                    style={{
                      flex: 1,
                      backgroundColor: '#1A1D2B',
                      border: `1px solid ${isHovered ? entry.dotColor : '#1E293B'}`,
                      borderRadius: '0.75rem',
                      padding: '1.25rem',
                      boxShadow: isHovered
                        ? `0 0 20px ${entry.dotColor}33`
                        : '0 4px 16px rgba(0,0,0,0.2)',
                      transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                    }}
                  >
                    {/* Period (inside card on mobile) */}
                    <p
                      style={{
                        color: '#94A3B8',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        marginBottom: '0.4rem',
                      }}
                    >
                      {entry.period}
                    </p>

                    <h3
                      style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {entry.role}
                    </h3>

                    <p
                      style={{
                        color: '#94A3B8',
                        fontSize: '0.875rem',
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {entry.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .timeline-desktop {
            display: none !important;
          }
          .timeline-mobile {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}
