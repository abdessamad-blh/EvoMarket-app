'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
  ArrowLeft, ExternalLink,
  Zap, Shield, BarChart3, Lock, Package, Search,
} from 'lucide-react';
import {
  HeroShot, StatsBar, SectionHeading,
  ArchitectureTable, FeaturesGrid, ScreenshotsGrid,
  TechStackGrid, CaseStudyCTA,
} from './CaseStudyParts';
import type { ArchRow, Feature, TechGroup, Stat, Shot } from './CaseStudyParts';

/* ─── Data ────────────────────────────────────────────────────────────────── */

const STATS: Stat[] = [
  { value: '3',   label: 'Rôles utilisateur' },
  { value: '15+', label: 'Tables de BDD' },
  { value: '20+', label: 'Endpoints API' },
  { value: 'Live', label: 'Socket.io' },
];

const ARCHITECTURE: ArchRow[] = [
  { layer: 'Customer Store',    stack: 'Next.js 15 · React 19 · TypeScript · Tailwind CSS' },
  { layer: 'Admin Dashboard',   stack: 'Next.js 15 — routes protégées, même application' },
  { layer: 'API Server',        stack: 'Fastify · Node.js 20 · TypeScript' },
  { layer: 'Base de données',   stack: 'PostgreSQL 16 · Prisma ORM · pg_trgm (full-text)' },
  { layer: 'Cache & Sessions',  stack: 'Redis 7 — rotation JWT, panier persistant, rate limiting' },
  { layer: 'Temps réel',        stack: 'Socket.io — tableau des commandes live (orders_room)' },
  { layer: 'CDN Médias',        stack: 'Cloudinary — upload sécurisé, WebP auto, magic byte validation' },
  { layer: 'Email',             stack: 'Resend — OTP, confirmation commandes (noreply@electrosky.ma)' },
  { layer: 'Proxy inverse',     stack: 'Caddy — SSL Let\'s Encrypt automatique, rate limiting global' },
  { layer: 'Infrastructure',    stack: 'Docker Compose · Ubuntu 24.04 LTS · VPS Contabo (4 vCPU / 8 Go)' },
];

const FEATURES: Feature[] = [
  {
    icon: Zap,
    title: 'Commandes en temps réel',
    desc: 'Socket.io "orders_room" — les caissiers voient chaque nouvelle commande instantanément sans rechargement. Événements new_order et order_status_changed.',
  },
  {
    icon: Shield,
    title: 'Contrôle d\'accès granulaire',
    desc: '3 rôles : Client, Caissier (permissions par module configurables), Admin. Chaque caissier peut être limité à certains modules uniquement.',
  },
  {
    icon: BarChart3,
    title: 'Dashboard analytique',
    desc: 'Revenus par période, graphiques 30 jours (Recharts), top 10 produits, performance des caissiers, inventaire, alertes stock bas.',
  },
  {
    icon: Lock,
    title: 'Sécurité OTP & 2FA',
    desc: 'Connexion admin par OTP email. Toute modification de profil (email, téléphone, mot de passe) déclenche une confirmation OTP. Historique des mots de passe.',
  },
  {
    icon: Package,
    title: 'Gestion des stocks',
    desc: 'Suivi par produit et variante, historique des mouvements (ADD/REMOVE), gestion des fournisseurs, alertes de seuil bas.',
  },
  {
    icon: Search,
    title: 'Recherche full-text + audit',
    desc: 'Extension PostgreSQL pg_trgm. Chaque recherche utilisateur est journalisée (SearchLog) pour analytics futures. Journal d\'activité complet (ActionLog).',
  },
];

const SHOTS: Shot[] = [
  { src: '/images/projects/electrosky-7.jpg',  alt: 'Electrosky — Vitrine produits' },
  { src: '/images/projects/electrosky-2.jpg',     alt: 'Electrosky — Dashboard admin' },
  { src: '/images/projects/electrosky-4.jpg',     alt: 'Electrosky — Gestion des équipes' },
  { src: '/images/projects/electrosky-5.jpg',     alt: 'Electrosky — Suivir tous les activités sur site' },
  { src: '/images/projects/electrosky-6.jpg',     alt: 'Electrosky — Gestion de fournisseurs' },
];

const TECH: TechGroup[] = [
  { label: 'Frontend',  tags: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'Zustand', 'Recharts'] },
  { label: 'Backend',   tags: ['Fastify', 'Node.js 20', 'TypeScript', 'Zod', 'Socket.io', 'JWT', 'OTP'] },
  { label: 'Database',  tags: ['PostgreSQL 16', 'Prisma ORM', 'Redis 7', 'pg_trgm'] },
  { label: 'DevOps',    tags: ['Docker Compose', 'Caddy', 'Ubuntu VPS', 'Cloudinary', 'Resend', 'TipTap'] },
];

/* ─── Page component ─────────────────────────────────────────────────────── */

export default function ElectroskyPage() {
  const locale = useLocale();

  return (
    <div className="bg-[#0A0E27] min-h-screen">

      {/* ── Hero ── */}
      <div className="pt-20">
        <HeroShot src="/images/projects/electrosky-hero1.jpg" alt="Electrosky vitrine">
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
                Web · E-commerce
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/8 text-white/40 border border-white/10 font-mono">
                2024
              </span>
              <a
                href="https://electrosky.ma"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#F4B223]/15 text-[#F4B223] border border-[#F4B223]/25 hover:bg-[#F4B223]/25 transition-colors"
              >
                electrosky.ma
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Title */}
            <h1
              className="text-6xl sm:text-7xl lg:text-[7rem] xl:text-[8.5rem] text-white leading-none"
              style={{ fontFamily: 'var(--font-bebas)' }}
            >
              Electro Sky
            </h1>

            {/* Subtitle */}
            <p className="text-white/50 text-base mt-4 max-w-xl leading-relaxed">
              Plateforme e-commerce full-stack pour un magasin d&apos;électronique à Rabat — click-and-collect,
              tableau admin en temps réel, gestion des stocks et analytics avancés.
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
              Electro Sky est un magasin d&apos;électronique physique situé à Rabat. Le projet consistait à construire
              une plateforme e-commerce complète avec un modèle <strong className="text-white/80">click-and-collect</strong> — les clients
              commandent en ligne et récupèrent leurs achats en magasin en environ 30 minutes.
            </p>
            <p className="text-white/55 text-sm leading-[1.9]">
              La plateforme gère tout le cycle de vie d&apos;une commande : de la navigation produit et la gestion
              du panier jusqu&apos;à la livraison en caisse, avec des mises à jour en temps réel pour le personnel.
            </p>
          </div>
          <div>
            <SectionHeading title="Défis techniques" />
            <ul className="space-y-3 text-sm text-white/55">
              {[
                'Synchronisation en temps réel entre la caisse et les commandes client via Socket.io',
                'Système d\'authentification à double facteur (OTP email) pour l\'admin',
                'Gestion multi-rôles avec permissions granulaires par module pour chaque caissier',
                'Suivi des stocks avec variantes produit (couleur, stockage, etc.) et mouvements historisés',
                'Déploiement containerisé avec reverse proxy Caddy et SSL automatique sur VPS',
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
