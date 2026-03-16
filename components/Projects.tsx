'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { X, ExternalLink } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Project {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  shortDesc: string;
  shortDescEn: string;
  role: string;
  roleEn: string;
  fullDesc: string;
  fullDescEn: string;
  tech: string[];
  link: string | null;
  image: string;
  imagePosition?: string;
  lightBg?: boolean;
  gridArea: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    id: 'nearpod',
    title: 'Nearpod',
    category: 'PSH · EdTech',
    categoryColor: '#3B82F6',
    shortDesc: 'Plataforma educativa interactiva con +22,000 lecciones, polls, quizzes y VR. Usada globalmente.',
    shortDescEn: 'Interactive learning platform with 22,000+ lessons, polls, quizzes and VR. Used globally.',
    role: 'Fullstack Developer — React, microservicios, APIs educativas',
    roleEn: 'Fullstack Developer — React, microservices, educational APIs',
    fullDesc: 'Plataforma educativa interactiva con más de 22,000 lecciones, encuestas en tiempo real, quizzes, experiencias VR y herramientas de evaluación formativa. Utilizada por millones de estudiantes en todo el mundo.',
    fullDescEn: 'Interactive learning platform with 22,000+ lessons, real-time polls, quizzes, VR experiences, and formative assessment tools. Used by millions of students worldwide.',
    tech: ['React', 'Node.js', 'TypeScript', 'Microservices', 'AWS'],
    link: 'https://nearpod.com',
    image: '/projects/nearpod.jpg',
    imagePosition: 'top center',
    gridArea: 'nearpod',
  },
  {
    id: 'seesaw',
    title: 'Seesaw',
    category: 'PSH · EdTech',
    categoryColor: '#3B82F6',
    shortDesc: 'LMS para primarias con IA. Portfolios digitales, actividades multimodales, conexión familias.',
    shortDescEn: 'K-12 LMS with AI. Digital portfolios, multimodal activities, family connection.',
    role: 'Fullstack Developer — React, portfolios, herramientas multimodales',
    roleEn: 'Fullstack Developer — React, portfolios, multimodal tools',
    fullDesc: 'Sistema de gestión de aprendizaje para escuelas primarias potenciado por IA. Permite a los estudiantes crear portfolios digitales, completar actividades multimodales y mantener a las familias conectadas con el progreso educativo.',
    fullDescEn: 'AI-powered learning management system for K-12. Students create digital portfolios, complete multimodal activities, and keep families connected with educational progress.',
    tech: ['React', 'Node.js', 'TypeScript', 'AI/ML'],
    link: 'https://web.seesaw.me',
    image: '/projects/seesaw.jpg',
    imagePosition: 'top center',
    gridArea: 'seesaw',
  },
  {
    id: 'life',
    title: 'Life Homecare',
    category: 'PSH · Salud',
    categoryColor: '#22C55E',
    shortDesc: 'Plataforma de gestión de salud domiciliaria. Coordinación de cuidadores, agendamiento y monitoreo.',
    shortDescEn: 'Home healthcare management platform. Caregiver coordination, scheduling and monitoring.',
    role: 'Fullstack Developer — React, gestión pacientes, dashboards',
    roleEn: 'Fullstack Developer — React, patient management, dashboards',
    fullDesc: 'Sistema integral de gestión de salud domiciliaria que coordina cuidadores, gestiona agendas de pacientes, lleva historiales médicos y monitorea la calidad del servicio en tiempo real.',
    fullDescEn: 'Comprehensive home health management system coordinating caregivers, managing patient schedules, tracking medical records, and monitoring service quality in real time.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Healthcare APIs'],
    link: null,
    image: '/projects/life.jpg',
    gridArea: 'life',
  },
  {
    id: 'pathful',
    title: 'Pathful',
    category: 'PSH · Educación',
    categoryColor: '#A855F7',
    shortDesc: 'Orientación vocacional K-16. +500 FlexLessons, Virtual Job Shadow, microcredenciales. +5,000 empresas.',
    shortDescEn: 'K-16 career guidance. 500+ FlexLessons, Virtual Job Shadow, microcredentials. 5,000+ companies.',
    role: 'Fullstack Developer — React, assessments, video platform',
    roleEn: 'Fullstack Developer — React, assessments, video platform',
    fullDesc: 'Plataforma de orientación vocacional para estudiantes K-16. Incluye más de 500 FlexLessons, Virtual Job Shadow, microcredenciales y conexión con más de 5,000 empresas para exploración de carreras.',
    fullDescEn: 'K-16 career guidance platform with 500+ FlexLessons, Virtual Job Shadow, microcredentials, and connections to 5,000+ companies for career exploration.',
    tech: ['React', 'TypeScript', 'Video Streaming', 'Node.js'],
    link: 'https://pathful.com',
    image: '/projects/pathful.jpg',
    gridArea: 'pathful',
  },
  {
    id: 'wakeful',
    title: 'Wakeful',
    category: 'Oaks Valley · Inversiones',
    categoryColor: '#F59E0B',
    shortDesc: 'Plataforma de inversiones LATAM en mercados EE.UU. Interactive Brokers, SIPC $500K.',
    shortDescEn: 'LATAM investment platform for US markets. Interactive Brokers, SIPC $500K protection.',
    role: 'Frontend Developer — React web, Django, APIs financieras',
    roleEn: 'Frontend Developer — React web, Django, financial APIs',
    fullDesc: 'Plataforma de inversiones para el mercado latinoamericano que permite invertir en mercados de EE.UU. a través de Interactive Brokers con protección SIPC de hasta $500K.',
    fullDescEn: 'Investment platform for the Latin American market enabling investments in US markets through Interactive Brokers with up to $500K SIPC protection.',
    tech: ['React', 'Django', 'Financial APIs', 'WebSocket'],
    link: 'https://wakeful.com.ar',
    image: '/projects/wakeful.jpg',
    imagePosition: 'top center',
    lightBg: true,
    gridArea: 'wakeful',
  },
  {
    id: 'bitennial',
    title: 'Bitennial',
    category: 'Oaks Valley · Crypto',
    categoryColor: '#F97316',
    shortDesc: 'App crypto trading mobile. Compra/venta de criptomonedas con APIs real-time.',
    shortDescEn: 'Crypto trading mobile app. Buy/sell cryptocurrencies with real-time APIs.',
    role: 'Frontend Developer — React Native, crypto APIs, Django',
    roleEn: 'Frontend Developer — React Native, crypto APIs, Django',
    fullDesc: 'Aplicación mobile de trading de criptomonedas con compra/venta en tiempo real, APIs de crypto, push notifications y un diseño inspirado en las mejores plataformas del mercado.',
    fullDescEn: 'Mobile cryptocurrency trading app with real-time buy/sell, crypto APIs, push notifications, and a design inspired by top market platforms.',
    tech: ['React Native', 'Django', 'Crypto APIs', 'WebSocket'],
    link: 'https://www.bitennial.com/',
    image: '/projects/bitennial.jpg',
    imagePosition: 'center',
    gridArea: 'bitennial',
  },
  {
    id: 'question',
    title: 'Question Colors',
    category: 'Freelance · E-commerce',
    categoryColor: '#EC4899',
    shortDesc: 'E-commerce para peluquería en Rosario. Diseño, desarrollo, carrito y catálogo de coloración capilar.',
    shortDescEn: 'E-commerce for Rosario hair salon. Design, development, cart, and hair color catalog.',
    role: 'Fullstack Developer & Designer — End-to-end',
    roleEn: 'Fullstack Developer & Designer — End-to-end',
    fullDesc: 'Desarrollo completo end-to-end de e-commerce para una peluquería en Rosario. Incluye diseño en Figma, desarrollo con Next.js, carrito de compras, catálogo de productos de coloración capilar y deploy en Vercel.',
    fullDescEn: 'Complete end-to-end e-commerce for a Rosario hair salon. Includes Figma design, Next.js development, shopping cart, hair color product catalog, and Vercel deployment.',
    tech: ['Next.js', 'Tailwind', 'Vercel', 'Figma'],
    link: 'https://questioncolorrosario.com',
    image: '/projects/question.jpg',
    gridArea: 'question',
  },
];

// ─── Side projects (no screenshot, no link) ───────────────────────────────────

interface SideProject {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  shortDesc: string;
  shortDescEn: string;
  tech: string[];
}

const sideProjects: SideProject[] = [
  {
    id: 'autos',
    title: 'FleetBoard',
    category: 'Personal · Gestión',
    categoryColor: '#06B6D4',
    shortDesc: 'Dashboard para gestión de flota de 6 Ubers. Planillas de choferes, gastos, mecánica y rentabilidad por auto.',
    shortDescEn: 'Dashboard for a 6-car Uber fleet. Driver sheets, expenses, maintenance, and profitability per vehicle.',
    tech: ['React', 'TypeScript', 'Supabase', 'Tailwind', 'Vite'],
  },
  {
    id: 'track',
    title: 'FinanceFlow',
    category: 'Personal · FinTech',
    categoryColor: '#10B981',
    shortDesc: 'App de finanzas personales. Ingresos, egresos, categorías, gráficos mensuales y soporte multi-moneda ARS/USD.',
    shortDescEn: 'Personal finance app. Income, expenses, categories, monthly charts, and ARS/USD multi-currency support.',
    tech: ['React', 'Firebase', 'Chart.js', 'Clerk', 'TypeScript'],
  },
  {
    id: 'stock',
    title: 'Stock Manager',
    category: 'Personal · Retail',
    categoryColor: '#F59E0B',
    shortDesc: 'Gestor de inventario colaborativo para ferias. Registro de productos, ventas en tiempo real y cierre de caja diario.',
    shortDescEn: 'Collaborative inventory manager for fairs. Product registry, real-time sales tracking and daily cash close.',
    tech: ['React', 'TypeScript', 'Supabase', 'Material UI', 'Vite'],
  },
];

// ─── Card component ───────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  locale,
  onClick,
}: {
  project: Project;
  index: number;
  locale: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.08, duration: 0.5, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.02 }}
      style={{
        gridArea: project.gridArea,
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        border: `1px solid ${hovered ? project.categoryColor + '55' : '#1E293B'}`,
        backgroundColor: '#1A1D2B',
        transition: 'border-color 0.25s ease',
      }}
    >
      {/* Background image with zoom effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.45s ease',
        }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          style={{ objectFit: 'cover', objectPosition: project.imagePosition ?? 'center center' }}
          sizes="(max-width: 768px) 100vw, 445px"
        />
      </div>

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: project.lightBg
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.7) 100%)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.82) 100%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Top: category tag */}
        <span
          style={{
            background: `${project.categoryColor}22`,
            color: project.categoryColor,
            border: `1px solid ${project.categoryColor}55`,
            borderRadius: '6px',
            padding: '3px 10px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.03em',
            alignSelf: 'flex-start',
            backdropFilter: 'blur(4px)',
          }}
        >
          {project.category}
        </span>

        {/* Bottom: title + description */}
        <div>
          <h3
            style={{
              color: '#FFFFFF',
              fontSize: '1.2rem',
              fontWeight: 700,
              marginBottom: '0.3rem',
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              color: '#94A3B8',
              fontSize: '0.78rem',
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            {locale === 'es' ? project.shortDesc : project.shortDescEn}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function ProjectModal({
  project,
  locale,
  t,
  onClose,
}: {
  project: Project;
  locale: string;
  t: ReturnType<typeof useTranslations>;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.88)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
        }}
      />

      {/* Centering wrapper */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 101,
          padding: '1rem',
          pointerEvents: 'none',
        }}
      >
        {/* Modal panel */}
        <motion.div
          key={`modal-${project.id}`}
          initial={{ opacity: 0, scale: 0.88, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 24 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          style={{
            width: 'min(92vw, 820px)',
            maxHeight: '88vh',
            overflowY: 'auto',
            backgroundColor: '#1A1D2B',
            borderRadius: '20px',
            border: '1px solid #1E293B',
            padding: '2rem',
            scrollbarWidth: 'thin',
            scrollbarColor: '#1E293B transparent',
            pointerEvents: 'auto',
            position: 'relative',
          }}
        >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid #1E293B',
            borderRadius: '8px',
            color: '#94A3B8',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s',
            zIndex: 1,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.14)';
            (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.07)';
            (e.currentTarget as HTMLButtonElement).style.color = '#94A3B8';
          }}
        >
          <X size={18} />
        </button>

        {/* Hero image */}
        <div
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            height: '260px',
            position: 'relative',
            marginBottom: '1.75rem',
            backgroundColor: '#0F1117',
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{ objectFit: 'cover', objectPosition: project.imagePosition ?? 'top center' }}
            sizes="820px"
          />
          {/* Subtle dark vignette so any screenshot blends with the dark modal */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 40%, rgba(15,17,23,0.55) 100%)',
              borderRadius: '12px',
            }}
          />
          {/* Colored accent line at bottom matching project color */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: `linear-gradient(to right, ${project.categoryColor}, ${project.categoryColor}44)`,
            }}
          />
        </div>

        {/* Category tag */}
        <span
          style={{
            display: 'inline-block',
            background: `${project.categoryColor}22`,
            color: project.categoryColor,
            border: `1px solid ${project.categoryColor}55`,
            borderRadius: '6px',
            padding: '3px 10px',
            fontSize: '12px',
            fontWeight: 600,
            marginBottom: '0.75rem',
          }}
        >
          {project.category}
        </span>

        {/* Title */}
        <h2
          style={{
            color: '#FFFFFF',
            fontSize: '1.75rem',
            fontWeight: 800,
            marginBottom: '0.85rem',
            lineHeight: 1.15,
          }}
        >
          {project.title}
        </h2>

        {/* Full description */}
        <p
          style={{
            color: '#94A3B8',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            marginBottom: '1.5rem',
          }}
        >
          {locale === 'es' ? project.fullDesc : project.fullDescEn}
        </p>

        {/* Divider */}
        <div style={{ height: '1px', background: '#1E293B', marginBottom: '1.5rem' }} />

        {/* Role */}
        <div style={{ marginBottom: '1.25rem' }}>
          <p
            style={{
              color: '#64748B',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.4rem',
            }}
          >
            {t('role_label')}
          </p>
          <p style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 500 }}>
            {locale === 'es' ? project.role : project.roleEn}
          </p>
        </div>

        {/* Tech stack */}
        <div style={{ marginBottom: '1.75rem' }}>
          <p
            style={{
              color: '#64748B',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.6rem',
            }}
          >
            {t('tech_label')}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.tech.map((tag) => (
              <span
                key={tag}
                style={{
                  background: 'rgba(37,99,235,0.12)',
                  color: '#60A5FA',
                  border: '1px solid rgba(37,99,235,0.3)',
                  borderRadius: '6px',
                  padding: '4px 12px',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* External link */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#2563EB',
              color: '#FFFFFF',
              borderRadius: '10px',
              padding: '0.65rem 1.4rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#1D4ED8';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#2563EB';
            }}
          >
            {t('view_project')}
            <ExternalLink size={15} />
          </a>
        )}
        </motion.div>
      </div>
    </>
  );
}

// ─── Side Project Card ────────────────────────────────────────────────────────

function SideProjectCard({ sp, i, locale }: { sp: SideProject; i: number; locale: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      key={sp.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: i * 0.1, duration: 0.45 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: '#1A1D2B',
        border: `1px solid ${hovered ? sp.categoryColor + '55' : '#1E293B'}`,
        borderRadius: '12px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        boxShadow: hovered ? `0 0 32px ${sp.categoryColor}28, 0 8px 24px rgba(0,0,0,0.3)` : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'border-color 0.25s ease, box-shadow 0.3s ease, transform 0.3s ease',
      }}
    >
      {/* Shimmer sweep */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(105deg, transparent 30%, ${sp.categoryColor}15 50%, transparent 70%)`,
          transform: hovered ? 'translateX(100%)' : 'translateX(-100%)',
          transition: hovered ? 'transform 0.55s ease' : 'none',
          pointerEvents: 'none',
        }}
      />

      {/* Radial glow top-left */}
      {hovered && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '180px',
            height: '180px',
            background: `radial-gradient(circle, ${sp.categoryColor}12 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
      )}

      <span
        style={{
          background: `${sp.categoryColor}22`,
          color: sp.categoryColor,
          border: `1px solid ${sp.categoryColor}55`,
          borderRadius: '6px',
          padding: '2px 9px',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.03em',
          alignSelf: 'flex-start',
          position: 'relative',
        }}
      >
        {sp.category}
      </span>

      <h3
        style={{
          color: hovered ? '#FFFFFF' : '#E2E8F0',
          fontSize: '1rem',
          fontWeight: 700,
          margin: 0,
          transition: 'color 0.2s ease',
          position: 'relative',
        }}
      >
        {sp.title}
      </h3>

      <p
        style={{
          color: '#64748B',
          fontSize: '0.8rem',
          lineHeight: 1.55,
          margin: 0,
          flexGrow: 1,
          position: 'relative',
        }}
      >
        {locale === 'es' ? sp.shortDesc : sp.shortDescEn}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.25rem', position: 'relative' }}>
        {sp.tech.map((tag) => (
          <span
            key={tag}
            style={{
              background: 'rgba(255,255,255,0.05)',
              color: '#94A3B8',
              border: '1px solid #1E293B',
              borderRadius: '4px',
              padding: '2px 8px',
              fontSize: '0.72rem',
              fontWeight: 500,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          width: hovered ? '100%' : '0%',
          background: `linear-gradient(to right, ${sp.categoryColor}, ${sp.categoryColor}44)`,
          transition: 'width 0.4s ease',
          borderRadius: '0 0 12px 12px',
        }}
      />
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Projects() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section
      id="proyectos"
      style={{
        backgroundColor: '#0F1117',
        padding: '6rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '3rem', textAlign: 'center' }}
        >
          <h2
            style={{
              color: '#FFFFFF',
              fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
              fontWeight: 800,
              marginBottom: '0.6rem',
              lineHeight: 1.15,
            }}
          >
            {t('title')}
          </h2>
          <p style={{ color: '#64748B', fontSize: '1rem', fontWeight: 400 }}>
            {t('subtitle')}
          </p>
        </motion.div>

        {/* ── Bento grid — desktop ── */}
        <div
          className="projects-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '3fr 2fr',
            gridTemplateRows: 'repeat(4, 280px)',
            gridTemplateAreas: `
              "nearpod seesaw"
              "life pathful"
              "wakeful wakeful"
              "bitennial question"
            `,
            gap: '1rem',
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              locale={locale}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>

        {/* ── Side Projects ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginTop: '3rem' }}
        >
          <p
            style={{
              color: '#64748B',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1.25rem',
            }}
          >
            {locale === 'es' ? 'Proyectos personales' : 'Side projects'}
          </p>
          <div
            className="side-projects-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
            }}
          >
            {sideProjects.map((sp, i) => (
              <SideProjectCard key={sp.id} sp={sp} i={i} locale={locale} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            locale={locale}
            t={t}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile styles injected via style tag ── */}
      <style>{`
        @media (max-width: 768px) {
          .projects-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 0.875rem !important;
          }
          .projects-grid > div {
            height: 220px !important;
            min-height: 220px !important;
          }
          .side-projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
