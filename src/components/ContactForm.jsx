import React, { useState } from 'react';

const ContactForm = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    setStatus('Sending...');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          organization: data.organization,
          message: data.message,
          type: 'B2B enquiry'
        })
      });

      if (!response.ok) throw new Error('Submission failed');
      setStatus("Message sent successfully. We'll contact you shortly.");
      e.target.reset();
    } catch (error) {
      setStatus('There was a problem sending your request. Please try again.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] p-12 text-gray-900 space-y-6 shadow-2xl">
      <h2 className="text-3xl font-black">Contact Our B2B Partnership Team</h2>
      <p className="text-gray-500">Submit your brief and we will follow up within 24 hours.</p>
      <input type="text" name="name" required placeholder="Full name" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-0 focus:ring-2 focus:ring-blue-500 outline-none font-bold" />
      <input type="email" name="email" required placeholder="Business email" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-0 focus:ring-2 focus:ring-blue-500 outline-none font-bold" />
      <input type="text" name="organization" required placeholder="Organization / University" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-0 focus:ring-2 focus:ring-blue-500 outline-none font-bold" />
      <textarea name="message" rows="5" required placeholder="What do you need help with?" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-0 focus:ring-2 focus:ring-blue-500 outline-none font-bold resize-none" />
      <button type="submit" className="w-full bg-blue-700 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-800 transition-all">Send Inquiry</button>
      {status && <p className="text-sm text-gray-700 font-semibold">{status}</p>}
    </form>
  );
};

export default ContactForm;
