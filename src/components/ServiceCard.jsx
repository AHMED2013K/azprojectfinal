import React from 'react';

const ServiceCard = ({ icon, title, description }) => (
  <div className="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
    <div className="w-14 h-14 bg-blue-50 text-[#005A9C] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#005A9C] group-hover:text-white transition-all duration-300">
      {icon ? React.createElement(icon, { size: 28 }) : null}
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-800 tracking-tight">{title}</h3>
    <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
  </div>
);

export default ServiceCard;
