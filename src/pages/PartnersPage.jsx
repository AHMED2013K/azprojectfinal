import React from 'react';

const PartnersPage = () => (
  <div className="max-w-7xl mx-auto px-6 py-16">
    <h1 className="text-4xl font-black mb-6">Partner Portal</h1>
    <p className="text-gray-700 text-lg mb-10">Your dashboard for leads, applications, partner matching, and analytics.</p>
    <section>
      <h2 className="text-2xl font-bold mb-4">Platform Features</h2>
      <ul className="grid md:grid-cols-2 gap-6 text-gray-700">
        <li className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">Lead qualification workflows with scoring and fit criteria.</li>
        <li className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">Automated document checklists + visa tracker.</li>
        <li className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">Dashboards for ROI, dropout risk and cohort outcomes.</li>
        <li className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">Direct collaboration with local Tunisian counselors.</li>
      </ul>
    </section>
  </div>
);

export default PartnersPage;
