'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
  ArrowLeft, ExternalLink,
  TrendingUp, Calendar, LayoutGrid, MapPin, Users, Settings2,
} from 'lucide-react';
import {
  HeroShot, StatsBar, SectionHeading,
  ArchitectureTable, FeaturesGrid, ScreenshotsGrid,
  TechStackGrid, CaseStudyCTA,
} from './CaseStudyParts';
import type { ArchRow, Feature, TechGroup, Stat, Shot } from './CaseStudyParts';

/* ─── Data ────────────────────────────────────────────────────────────────── */

const STATS: Stat[] = [
  { value: '2',      label: 'Modèles de revenus' },
  { value: '10+',   label: 'Tables de BDD' },
  { value: '30',    label: 'Images par bien' },
  { value: '2FA',   label: 'Sécurité admin' },
];

const ARCHITECTURE: ArchRow[] = [
  { layer: 'Public Website',      stack: 'Next.js 14 · React 18 · TypeScript · Tailwind CSS · GSAP' },
  { layer: 'Admin Dashboard',     stack: 'Next.js 14 — routes protégées, même application' },
  { layer: 'API Server',          stack: 'Express.js · Node.js · TypeScript' },
  { layer: 'Base de données',     stack: 'PostgreSQL · Prisma ORM' },
  { layer: 'Cartographie',        stack: 'Leaflet + OpenStreetMap — localisation des biens' },
  { layer: 'State Management',    stack: 'Zustand — auth, favoris, comparaison de biens' },
  { layer: 'Éditeur de contenu',  stack: 'TipTap — descriptions riches, embeds YouTube & images' },
  { layer: 'CDN Médias',          stack: 'Cloudinary — jusqu\'à 30 images par bien, vidéos' },
  { layer: 'Email',               stack: 'Resend (primaire) + Nodemailer (fallback) — OTP, confirmations' },
  { layer: 'Déploiement',         stack: 'Railway.app + Docker · Netlify (option frontend)' },
];

const FEATURES: Feature[] = [
  {
    icon: TrendingUp,
    title: 'Tarification saisonnière',
    desc: 'Moteur PricePeriod : tarifs nuitée différents par période (été, Ramadan…). Le total est calculé automatiquement avec décompte détaillé visible par le client.',
  },
  {
    icon: Calendar,
    title: 'Calendrier & disponibilités',
    desc: 'Validation des chevauchements de réservations en base. Blocage manuel de dates par l\'admin (maintenance, réparations) indépendamment des réservations.',
  },
  {
    icon: LayoutGrid,
    title: 'Double modèle de revenus',
    desc: 'Location (réservations calendrier, flux PENDING → CONFIRMED → COMPLETED) et Vente (pipeline leads NEW → CONTACTÉ → QUALIFIÉ → CONCLU) dans une seule app.',
  },
  {
    icon: MapPin,
    title: 'Cartes interactives',
    desc: 'Leaflet + OpenStreetMap intégré sur chaque fiche bien. Géolocalisation précise avec latitude/longitude stockées en base.',
  },
  {
    icon: Users,
    title: 'Pipeline de vente',
    desc: 'Demandes d\'achat trackées avec statuts, notes internes, capture des coordonnées et alertes email admin à chaque nouveau lead.',
  },
  {
    icon: Settings2,
    title: 'CMS homepage complet',
    desc: 'Carousel hero géré par l\'admin : réorganisation, toggle, CTAs personnalisables, analytics de clics par bannière (visitorId + userId).',
  },
];

const SHOTS: Shot[] = [
  { src: '/images/projects/6.jpg', alt: 'Saidia Bay — Page d\'accueil' },
  { src: '/images/projects/saidiabay-1.jpg',    alt: 'Saidia Bay — Filter de recherche' },
  { src: '/images/projects/saidiabay-2.jpg',    alt: 'Saidia Bay — Calendrier & réservation' },
  { src: '/images/projects/saidiabay-3.jpg',    alt: 'Saidia Bay — Page de blogs' },
  { src: '/images/projects/saidiabay-4.jpg',    alt: 'Saidia Bay — Gestion des réservations' },
];

const TECH: TechGroup[] = [
  { label: 'Frontend',  tags: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Zustand', 'Swiper', 'Leaflet'] },
  { label: 'Backend',   tags: ['Express.js', 'Node.js', 'TypeScript', 'JWT', 'OTP', 'bcryptjs'] },
  { label: 'Database',  tags: ['PostgreSQL', 'Prisma ORM'] },
  { label: 'Services',  tags: ['Cloudinary', 'Resend', 'Nodemailer', 'TipTap', 'Recharts', 'Railway', 'Docker'] },
];

/* ─── Page component ─────────────────────────────────────────────────────── */

export default function SaidibayPage() {
  const locale = useLocale();

  return (
    <div className="bg-[#0A0E27] min-h-screen">

      {/* ── Hero ── */}
      <div className="pt-20">
        <HeroShot src="/images/projects/6.jpg" alt="Saidia Bay accueil">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-20 w-full">

            {/* Back */}
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Tous les projets
            </Link>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/15 text-blue-300 border border-blue-400/20">
                Web · Immobilier
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/8 text-white/40 border border-white/10 font-mono">
                2024
              </span>
              <a
                href="https://saidibay.ma"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#F4B223]/15 text-[#F4B223] border border-[#F4B223]/25 hover:bg-[#F4B223]/25 transition-colors"
              >
                saidibay.ma
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Title */}
            <h1
              className="text-6xl sm:text-7xl lg:text-[7rem] xl:text-[8.5rem] text-white leading-none"
              style={{ fontFamily: 'var(--font-bebas)' }}
            >
              Saidia Bay
            </h1>

            {/* Subtitle */}
            <p className="text-white/50 text-base mt-4 max-w-xl leading-relaxed">
              Plateforme immobilière full-stack pour la gestion de biens en location et en vente —
              tarification saisonnière dynamique, calendrier avancé et CMS admin complet.
            </p>
          </div>
        </HeroShot>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 space-y-20">

        {/* Stats */}
        <StatsBar stats={STATS} />

        {/* Context */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          <div>
            <SectionHeading title="Contexte" />
            <p className="text-white/55 text-sm leading-[1.9] mb-4">
              Saidia Bay est une plateforme immobilière dédiée à la station balnéaire de Saidia, au Maroc.
              Elle permet à un propriétaire ou une agence de gérer simultanément deux types de transactions :
              la <strong className="text-white/80">location saisonnière</strong> (réservations calendrier) et la{' '}
              <strong className="text-white/80">vente de biens</strong> (pipeline de leads).
            </p>
            <p className="text-white/55 text-sm leading-[1.9]">
              La plateforme gère l&apos;intégralité du parcours client — de la consultation des biens avec carte
              interactive jusqu&apos;à la confirmation de réservation — tout en offrant à l&apos;administrateur
              un tableau de bord sécurisé avec analytics, gestion des contenus et suivi des revenus.
            </p>
          </div>
          <div>
            <SectionHeading title="Défis techniques" />
            <ul className="space-y-3 text-sm text-white/55">
              {[
                'Moteur de tarification dynamique avec périodes saisonnières et calcul de coût détaillé à la nuitée',
                'Détection des chevauchements de réservations côté serveur avec validation en base de données',
                'Double flux métier (location calendrier vs. vente par lead) dans une architecture unifiée',
                'Intégration Leaflet pour la localisation géographique de chaque bien immobilier',
                'Authentification admin renforcée : OTP 2FA obligatoire + auto-logout par inactivité (5 min)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[#F4B223] mt-1 shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Architecture */}
        <div>
          <SectionHeading title="Architecture" />
          <ArchitectureTable rows={ARCHITECTURE} />
        </div>

        {/* Features */}
        <div>
          <SectionHeading title="Fonctionnalités clés" />
          <FeaturesGrid features={FEATURES} />
        </div>

        {/* Screenshots */}
        <div>
          <SectionHeading title="Aperçu" />
          <ScreenshotsGrid shots={SHOTS} />
        </div>

        {/* Tech stack */}
        <div>
          <SectionHeading title="Stack technique" />
          <TechStackGrid groups={TECH} />
        </div>

        {/* CTA */}
        <CaseStudyCTA
          title="Un projet similaire en tête ?"
          desc="Parlons de votre vision et construisons ensemble votre prochaine plateforme digitale."
          cta="Démarrer un projet"
        />

      </div>
    </div>
  );
}
