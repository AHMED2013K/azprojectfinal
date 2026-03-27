import React from 'react';
import { Mail, Phone, Globe2 } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const ContactPage = () => (
  <div className="max-w-7xl mx-auto px-6 py-16">
    <h1 className="text-4xl font-black mb-6">Contact & Request Demo</h1>
    <h2 className="text-2xl font-bold mb-4">Talk to our B2B development team</h2>
    <p className="text-gray-700 mb-10">We provide custom outsourcing proposals for partners in Dubai, UK, UAE and more.</p>
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 text-blue-700 rounded-xl"><Phone className="w-5 h-5" /></div>
          <p>+216 56 59 07 03</p>
        </div>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 text-blue-700 rounded-xl"><Mail className="w-5 h-5" /></div>
          <p>contact@edugrowth.tn</p>
        </div>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 text-blue-700 rounded-xl"><Globe2 className="w-5 h-5" /></div>
          <p>Address: Tunis, Tunisia (remote operation for Dubai/UK/UAE partners)</p>
        </div>
      </div>
      <ContactForm />
    </div>
  </div>
);

export default ContactPage;
