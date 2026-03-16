'use client';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Globe, Smartphone, Server, Lightbulb, Bot, Zap } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

const serviceData = [
  { icon: Globe,       color: '#2563EB', key: 0 },
  { icon: Smartphone,  color: '#06B6D4', key: 1 },
  { icon: Server,      color: '#8B5CF6', key: 2 },
  { icon: Bot,         color: '#EC4899', key: 3 },
  { icon: Zap,         color: '#F59E0B', key: 4 },
  { icon: Lightbulb,   color: '#22C55E', key: 5 },
];

const servicesEs = [
  { title: 'Desarrollo Web',    desc: 'SPAs, landing pages y e-commerce con React, Next.js o el stack que el proyecto necesite.' },
  { title: 'Apps Mobile',       desc: 'Aplicaciones cross-platform para iOS y Android con React Native.' },
  { title: 'Backend & APIs',    desc: 'Servidores robustos, APIs REST, microservicios y bases de datos con Node.js o Django.' },
  { title: 'Bots con IA',       desc: 'Chatbots y agentes con GPT-4. WhatsApp bots, asistentes virtuales y bots de atención al cliente conectados a tus sistemas.' },
  { title: 'Automatizaciones',  desc: 'Flujos automáticos con n8n: notificaciones, sincronización de datos, CRM, facturación y cualquier proceso repetitivo que quieras eliminar.' },
  { title: 'Consultoría Tech',  desc: 'Arquitectura de sistemas, code review y mentoring para equipos y proyectos.' },
];

const servicesEn = [
  { title: 'Web Development',  desc: 'SPAs, landing pages and e-commerce with React, Next.js or whatever stack fits.' },
  { title: 'Mobile Apps',      desc: 'Cross-platform iOS and Android apps with React Native.' },
  { title: 'Backend & APIs',   desc: 'Robust servers, REST APIs, microservices and databases with Node.js or Django.' },
  { title: 'AI Bots',          desc: 'Chatbots and agents powered by GPT-4. WhatsApp bots, virtual assistants and customer support bots connected to your systems.' },
  { title: 'Automations',      desc: 'Automated workflows with n8n: notifications, data sync, CRM, billing and any repetitive process you want to eliminate.' },
  { title: 'Tech Consulting',  desc: 'System architecture, code review and mentoring for teams and projects.' },
];

function ServiceCard({
  icon: Icon,
  color,
  title,
  desc,
  index,
  prefersReduced,
}: {
  icon: React.ElementType;
  color: string;
  title: string;
  desc: string;
  index: number;
  prefersReduced: boolean | null;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={
        prefersReduced
          ? undefined
          : { duration: 0.32, delay: index * 0.08, ease: 'easeOut' }
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#1A1D2B',
        border: `1px solid ${hovered ? color + '44' : '#1E293B'}`,
        borderRadius: '16px',
        padding: '2rem',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: hovered ? `0 0 40px ${color}30, 0 8px 32px rgba(0,0,0,0.3)` : 'none',
        transform: hovered && !prefersReduced ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'border-color 0.25s ease, box-shadow 0.3s ease, transform 0.3s ease',
      }}
    >
      {/* Shimmer sweep on hover */}
      {!prefersReduced && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(105deg, transparent 30%, ${color}18 50%, transparent 70%)`,
            transform: hovered ? 'translateX(100%)' : 'translateX(-100%)',
            transition: hovered ? 'transform 0.55s ease' : 'none',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Subtle radial glow from top-left on hover */}
      {hovered && !prefersReduced && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '200px',
            height: '200px',
            background: `radial-gradient(circle, ${color}14 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Icon */}
      <motion.div
        animate={
          prefersReduced
            ? {}
            : hovered
            ? { rotate: 8, scale: 1.15 }
            : { rotate: 0, scale: 1 }
        }
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        style={{
          display: 'inline-flex',
          marginBottom: '1.25rem',
          position: 'relative',
        }}
      >
        {/* Icon glow ring */}
        {hovered && !prefersReduced && (
          <div
            style={{
              position: 'absolute',
              inset: -6,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
            }}
          />
        )}
        <Icon size={32} color={color} strokeWidth={1.75} />
      </motion.div>

      {/* Title */}
      <h3
        style={{
          color: hovered ? '#FFFFFF' : '#E2E8F0',
          fontSize: '1.125rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
          letterSpacing: '-0.01em',
          transition: 'color 0.2s ease',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          color: '#94A3B8',
          fontSize: '0.9375rem',
          lineHeight: 1.65,
        }}
      >
        {desc}
      </p>

      {/* Bottom accent line that grows on hover */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          width: hovered ? '100%' : '0%',
          background: `linear-gradient(to right, ${color}, ${color}44)`,
          transition: 'width 0.4s ease',
          borderRadius: '0 0 16px 16px',
        }}
      />
    </motion.div>
  );
}

export default function Services() {
  const t = useTranslations('services');
  const locale = useLocale();
  const prefersReduced = useReducedMotion();

  const items = locale === 'es' ? servicesEs : servicesEn;

  return (
    <section
      id="servicios"
      style={{
        padding: '6rem 1.5rem',
        backgroundColor: '#0F1117',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={prefersReduced ? undefined : { duration: 0.3, ease: 'easeOut' }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: '0.75rem',
            }}
          >
            {t('title')}
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.0625rem' }}>
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {serviceData.map(({ icon, color, key }, index) => (
            <ServiceCard
              key={key}
              icon={icon}
              color={color}
              title={items[key].title}
              desc={items[key].desc}
              index={index}
              prefersReduced={prefersReduced}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
