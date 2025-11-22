// src/components/AcademyProgramme.tsx
'use client';

import React, { JSX } from 'react';
import {
    Calendar,
    Clock,
    MapPin,
    Users,
    Video,
    Target,
    TrendingUp,
    Award,
    Smartphone,
    BookOpen
} from 'lucide-react';

export default function AcademyProgramme(): JSX.Element {
    const programmeData = [
        {
            image: "/images/academy/insta1.jpg",
            title: "Formation Social Media Complète",
            description: "Un programme intensif de 4 semaines conçu spécifiquement pour les professionnels de santé",
            details: [
                { icon: Calendar, text: "Début : 29 Novembre 2025" },
                { icon: Clock, text: "Durée : 4 semaines" },
                { icon: MapPin, text: "Lieu : Technopark Rabat" },
                { icon: Users, text: "Places très limitées" }
            ],
            features: [
                "Stratégie Social Media sur mesure",
                "Création de contenu médical éthique",
                "Masterclass vidéo et storytelling",
                "Publicité Meta adaptée au secteur santé"
            ]
        },
        {
            image: "/images/academy/insta2.jpg",
            title: "Nos Experts Formateurs",
            description: "Une équipe d'experts dédiés à votre réussite en communication digitale",
            trainers: [
                {
                    name: "Belahcen Mouad, PhD",
                    role: "Expert Marketing Digital & Fondateur EvoMarket",
                    specialization: "Image de marque & Campagnes Meta"
                },
                {
                    name: "Rachid Sami, PhD",
                    role: "Comptable Agréé & Consultant",
                    specialization: "Création d'entreprise & Aspects juridiques"
                },
                {
                    name: "Mandouche Ayoub",
                    role: "Formateur en Montage Vidéo",
                    specialization: "Montage vidéo & Adaptation réseaux sociaux"
                },
                {
                    name: "Youness El Moumine",
                    role: "Filmmaker Professionnel",
                    specialization: "Techniques de tournage & Maîtrise lumière"
                }
            ]
        },
        {
            image: "/images/academy/insta4.jpg",
            title: "Samedi 29 Novembre",
            subtitle: "Avec Belahcen Mouad, PhD en Marketing",
            theme: "Construire votre image de marque & lancer votre première campagne Meta",
            schedule: [
                { time: "09h - 13h", location: "Technopark Rabat" },
                { time: "Séance en ligne", location: "Mercredi suivant pour Q&A" }
            ],
            highlights: [
                "Définition de votre identité visuelle",
                "Stratégie de contenu personnalisée",
                "Configuration des publicités Meta",
                "Analyse des performances"
            ]
        },
        {
            image: "/images/academy/insta5.jpg",
            title: "Samedi 13 Décembre",
            subtitle: "Avec Mandouche Ayoub, Formateur en Montage Vidéo",
            theme: "Montage vidéo professionnel et adaptation pour les réseaux sociaux",
            schedule: [
                { time: "09h - 13h", location: "Technopark Rabat" },
                { time: "Séance en ligne", location: "Mercredi suivant pour correction" }
            ],
            highlights: [
                "Techniques de montage avancées",
                "Insertion de scripts et sous-titres",
                "Adaptation du rythme pour réseaux sociaux",
                "Optimisation pour mobile"
            ]
        }
    ];

    return (
        <section className="py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center bg-[#f1a100] text-[#142143] px-6 py-3 rounded-full text-sm font-semibold mb-12">
                        <BookOpen className="w-4 h-4 mr-2" />
                        PROGRAMME DÉTAILLÉ
                    </div>
                    {/* <h2 className="text-4xl md:text-5xl font-bold text-[#142143] mb-6 leading-tight">
                        FORMATION <span className="text-[#f1a100]">SOCIAL MEDIA</span> <br /> POUR PROFESSIONNELS DE SANTÉ
                    </h2> */}
                    <h2 className="text-4xl md:text-5xl font-bold text-[#142143] mb-6">
                        Notre Programme de Formation
                    </h2>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Une immersion complète dans le monde du social media adaptée aux professionnels de santé
                    </p>
                </div>

                {/* Programme Items */}
                <div className="space-y-20">
                    {programmeData.map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                } gap-8 lg:gap-12 items-center`}
                        >
                            {/* Image Column - Full size portrait */}
                            <div className="w-full lg:w-2/5">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-auto object-cover aspect-[1080/1350]"
                                    />
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </div>

                            {/* Content Column */}
                            <div className="w-full lg:w-3/5">
                                <div className="space-y-6">
                                    {/* Title */}
                                    <div>
                                        <h3 className="text-3xl md:text-4xl font-bold text-[#142143] mb-3">
                                            {item.title}
                                        </h3>
                                        {item.subtitle && (
                                            <p className="text-lg text-[#f1a100] font-semibold mb-2">
                                                {item.subtitle}
                                            </p>
                                        )}
                                        <p className="text-xl text-gray-600 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Theme for sessions */}
                                    {item.theme && (
                                        <div className="bg-gradient-to-r from-[#142143] to-[#1a5d94] text-white p-6 rounded-2xl">
                                            <div className="flex items-start space-x-3">
                                                <Target className="w-6 h-6 mt-1 text-[#f1a100] flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-semibold text-lg mb-2">Thème principal :</h4>
                                                    <p className="text-white/90 leading-relaxed">{item.theme}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Schedule */}
                                    {item.schedule && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {item.schedule.map((session, sessionIndex) => (
                                                <div key={sessionIndex} className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl">
                                                    <Clock className="w-5 h-5 text-[#f1a100]" />
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{session.time}</p>
                                                        <p className="text-sm text-gray-600">{session.location}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Details */}
                                    {item.details && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {item.details.map((detail, detailIndex) => {
                                                const IconComponent = detail.icon;
                                                return (
                                                    <div key={detailIndex} className="flex items-center space-x-3">
                                                        <div className="bg-[#f1a100] text-white p-2 rounded-lg">
                                                            <IconComponent className="w-5 h-5" />
                                                        </div>
                                                        <span className="text-gray-700 font-medium">{detail.text}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Trainers */}
                                    {item.trainers && (
                                        <div className="space-y-4">
                                            <h4 className="text-xl font-bold text-[#142143] flex items-center">
                                                <Users className="w-6 h-6 mr-2 text-[#f1a100]" />
                                                Nos Formateurs
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {item.trainers.map((trainer, trainerIndex) => (
                                                    <div key={trainerIndex} className="bg-gray-50 p-4 rounded-xl border-l-4 border-[#f1a100]">
                                                        <h5 className="font-bold text-[#142143] text-lg">{trainer.name}</h5>
                                                        <p className="text-gray-600 text-sm mb-2">{trainer.role}</p>
                                                        <p className="text-[#f1a100] text-sm font-semibold">{trainer.specialization}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Features/Highlights */}
                                    {(item.features || item.highlights) && (
                                        <div className="space-y-3">
                                            <h4 className="text-xl font-bold text-[#142143] flex items-center">
                                                <TrendingUp className="w-6 h-6 mr-2 text-[#f1a100]" />
                                                Points Forts
                                            </h4>
                                            <div className="grid grid-cols-1 gap-3">
                                                {(item.features || item.highlights)?.map((feature, featureIndex) => (
                                                    <div key={featureIndex} className="flex items-center space-x-3">
                                                        <div className="w-2 h-2 bg-[#f1a100] rounded-full flex-shrink-0"></div>
                                                        <span className="text-gray-700">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Bonus Info */}
                                    <div className="bg-gradient-to-r from-[#f1a100] to-[#ff6b00] text-white p-6 rounded-2xl">
                                        <div className="flex items-center space-x-3">
                                            <Award className="w-8 h-8" />
                                            <div>
                                                <h4 className="font-bold text-lg">Bonus Inclus</h4>
                                                <p className="text-white/90">Attestation officielle + Accompagnement en ligne personnalisé</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Final CTA */}
                <div className="text-center mt-16 bg-gradient-to-r from-[#142143] to-[#1a5d94] rounded-3xl p-12 text-white">
                    <h3 className="text-3xl md:text-4xl font-bold mb-6">
                        Prêt à Maîtriser le Social Media ?
                    </h3>
                    <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                        Rejoignez notre formation exclusive et transformez votre communication digitale
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="https://wa.me/212751788358?text=Bonjour! Je suis intéressé(e) par la Formation Social Media pour Professionnels de Santé"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-200 transform hover:scale-105 text-lg shadow-lg hover:shadow-xl flex items-center space-x-3"
                        >
                            <Smartphone className="w-6 h-6" />
                            <span>Réserver sur WhatsApp</span>
                        </a>
                        <div className="text-white/90">
                            <p className="font-semibold">📞 07 51 78 83 58</p>
                            <p className="font-semibold">📞 05 37 70 59 11</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* WhatsApp Floating Button */}
            <a
                href="https://wa.me/212751788358"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg animate-bounce z-50"
                aria-label="Chat on WhatsApp"
            >
                <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M20.52 3.48A11.75 11.75 0 0012.03 0C5.38 0 .02 5.37.02 12a11.9 11.9 0 001.64 6.03L0 24l6.22-1.63a11.9 11.9 0 005.81 1.5h.01c6.63 0 12.01-5.37 12.01-12 0-3.2-1.25-6.22-3.53-8.49zm-8.5 18.9h-.01a9.91 9.91 0 01-5.04-1.35l-.36-.21-3.7.97.99-3.6-.23-.38a9.93 9.93 0 01-1.53-5.3c0-5.45 4.45-9.89 9.94-9.89 2.64 0 5.12 1.03 6.98 2.9a9.83 9.83 0 012.9 6.98c0 5.45-4.45 9.88-9.94 9.88zm5.47-7.44c-.3-.15-1.75-.87-2.02-.97-.27-.1-.47-.15-.67.15s-.77.97-.95 1.17c-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.23-.24-.6-.49-.52-.67-.53-.17 0-.37-.02-.57-.02s-.52.07-.8.37c-.27.3-1.05 1.02-1.05 2.48s1.08 2.88 1.23 3.08c.15.2 2.12 3.24 5.15 4.54.72.31 1.28.49 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.75-.72 2-1.42.25-.7.25-1.3.17-1.42-.08-.13-.27-.2-.57-.35z" />
                </svg>
            </a>
        </section>
    );
}