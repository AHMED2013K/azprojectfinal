import React from 'react';
import { NavLink } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

const HomePageFr = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-700 text-white">
    <div className="max-w-7xl mx-auto px-6 py-24 text-center">
      <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Edugrowth Outsourcing : Portail B2B pour universités & centres de langue</h1>
      <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">Recrutement d'étudiants tunisiens pour Dubaï, UK, UAE & Europe avec accompagnement complet (lead, pré-qualification, dossier, visa, reporting).</p>
      <div className="flex flex-wrap justify-center gap-4">
        <NavLink to="/partners" className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-black hover:shadow-xl transition">Portail Partenaires</NavLink>
        <NavLink to="/contact" className="bg-blue-500 text-white px-8 py-4 rounded-2xl font-black hover:shadow-xl transition">Demande de Proposition</NavLink>
      </div>
    </div>

    <section className="max-w-6xl mx-auto px-6 py-16 bg-white rounded-3xl text-gray-900 shadow-2xl -mt-12">
      <h2 className="text-3xl font-black text-center mb-8">Valeur ajoutée pour les institutions</h2>
      <div className="grid md:grid-cols-3 gap-6 text-center">
        <article className="space-y-3 p-6 border border-gray-100 rounded-2xl">
          <h3 className="text-xl font-bold">Pipeline étudiant garanti</h3>
          <p className="text-sm text-gray-600">Sourcing et qualification depuis Tunis pour maximiser le taux de conversion.</p>
        </article>
        <article className="space-y-3 p-6 border border-gray-100 rounded-2xl">
          <h3 className="text-xl font-bold">Suivi réglementaire</h3>
          <p className="text-sm text-gray-600">Prise en charge des documents, conformité visa et onboarding international.</p>
        </article>
        <article className="space-y-3 p-6 border border-gray-100 rounded-2xl">
          <h3 className="text-xl font-bold">Performance et ROI</h3>
          <p className="text-sm text-gray-600">Modèle B2B adaptatif avec SLA et dashboard analytics en temps réel.</p>
        </article>
      </div>
    </section>

    <div className="max-w-6xl mx-auto px-6 py-16 text-center">
      <h2 className="text-3xl font-black mb-4">Partenariat stratégique depuis la Tunisie</h2>
      <p className="text-gray-200 mb-6">Lancez un centre d'excellence transfrontalier avec une équipe dédiée en 3 jours et des économies opérationnelles immédiates.</p>
      <NavLink to="/contact" className="inline-block bg-blue-500 text-white px-10 py-4 rounded-2xl font-black">Envoyer une demande</NavLink>
    </div>
  </div>
);

export default HomePageFr;
