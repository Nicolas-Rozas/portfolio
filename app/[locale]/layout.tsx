import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl =
    locale === 'en'
      ? 'https://nicolasrozas.com/en'
      : 'https://nicolasrozas.com';

  return {
    metadataBase: new URL('https://nicolasrozas.com'),

    title: {
      default: 'Nicolás Rozas — Fullstack Developer',
      template: '%s | Nicolás Rozas',
    },
    description:
      'Nicolás Rozas, desarrollador Fullstack con más de 5 años de experiencia en React, Next.js, Node.js y React Native. Disponible para proyectos freelance.',
    keywords: [
      'Nicolas Rozas',
      'Nicolás Rozas',
      'Fullstack Developer',
      'React',
      'Next.js',
      'Node.js',
      'React Native',
      'Argentina',
      'Rosario',
    ],
    authors: [{ name: 'Nicolás Rozas', url: 'https://nicolasrozas.com' }],
    creator: 'Nicolás Rozas',

    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: 'https://nicolasrozas.com',
        en: 'https://nicolasrozas.com/en',
      },
    },

    openGraph: {
      title: 'Nicolás Rozas — Fullstack Developer',
      description:
        'Desarrollador Fullstack con más de 5 años de experiencia. React, Next.js, Node.js, React Native.',
      url: canonicalUrl,
      siteName: 'Nicolás Rozas',
      images: [
        {
          url: '/hero.jpg',
          width: 1200,
          height: 630,
          alt: 'Nicolás Rozas - Fullstack Developer',
        },
      ],
      locale: locale === 'en' ? 'en_US' : 'es_AR',
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: 'Nicolás Rozas — Fullstack Developer',
      description:
        'Desarrollador Fullstack con más de 5 años de experiencia. React, Next.js, Node.js, React Native.',
      images: ['/hero.jpg'],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },

    verification: {
      google: 'iY2hG8bursR018kz1pVuc5c1fsfpydftHRNLJMZp0GE',
    },
  };
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nicolás Rozas',
  url: 'https://nicolasrozas.com',
  jobTitle: 'Fullstack Developer',
  email: 'rozasnicolas23@gmail.com',
  knowsAbout: ['React', 'Next.js', 'Node.js', 'React Native', 'TypeScript'],
  sameAs: [
    'https://github.com/Nicolas-Rozas',
    'https://www.linkedin.com/in/nicolas-sebastian-rozas-7791a1201/',
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`scroll-smooth ${inter.variable}`}>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
