import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Home, MessageCircle } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const SITE = 'https://edugrowth.tn';
const WA_NUMBER = '21656590703';

const faq = [
  {
    q: 'كيف أختار البلد المناسب للدراسة بالخارج من تونس؟',
    a: 'ابدأ بمقارنة الميزانية، اللغة، مستوى الدراسة، شروط القبول، التأشيرة، السكن، والهدف المهني. البلد المناسب يختلف حسب الباكالوريا، الإجازة، الماجستير أو وضعية العائلة.',
  },
  {
    q: 'متى يجب أن أبدأ ملف الدراسة بالخارج؟',
    a: 'من الأفضل البدء قبل 6 إلى 12 شهرا من موعد الدخول الجامعي، خاصة للبلدان التي تتطلب تأشيرة طويلة، Campus France، منح أو بحث عن سكن.',
  },
  {
    q: 'هل يمكن ضمان التأشيرة؟',
    a: 'لا. لا توجد وكالة جدية تضمن التأشيرة. يمكن فقط إعداد ملف واضح ومنظم ومتناسق لتقليل الأخطاء والمخاطر.',
  },
  {
    q: 'هل يمكن للوالدين المشاركة في التوجيه؟',
    a: 'نعم. مشاركة العائلة مهمة لفهم الميزانية، السكن، شروط التأشيرة، المخاطر والاختيارات البديلة قبل اتخاذ القرار.',
  },
];

const sections = [
  {
    h2: '1. فهم وضعية الطالب',
    text: 'نبدأ بالمستوى الدراسي، النقاط، اللغة، الميزانية، الاختصاص المرغوب، والبلدان الممكنة. الهدف هو اختيار مسار واقعي وليس فقط بلد مشهور.',
  },
  {
    h2: '2. مقارنة البلدان والاختصاصات',
    text: 'نقارن فرنسا، ألمانيا، كندا، النمسا، رومانيا، هنغاريا، إسبانيا، الصين، كوريا الجنوبية، اليابان ووجهات أخرى حسب الميزانية والفيزا والاعتراف بالشهادة.',
  },
  {
    h2: '3. تحضير الملف والوثائق',
    text: 'الملف يحتاج عادة إلى جواز سفر، كشوف أعداد، شهادة، ترجمات، سيرة ذاتية، رسالة دافع، إثباتات مالية، قبول جامعي ووثائق السكن حسب البلد.',
  },
  {
    h2: '4. التأشيرة والسكن والاستعداد للسفر',
    text: 'بعد القبول يجب تحضير التأشيرة، السكن، التأمين، الميزانية الشهرية وخطة واضحة للانطلاق. كل خطوة يجب أن تكون موثقة ومفهومة للطالب والعائلة.',
  },
];

export default function ArabicGuidancePage() {
  const canonical = `${SITE}/ar/tawjih-dirasa-kharij-tunisia/`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: 'توجيه للدراسة بالخارج من تونس',
        description: 'دليل EduGrowth للطلبة التونسيين والوالدين حول الدراسة بالخارج، القبول، التأشيرة، الميزانية، السكن واختيار البلد.',
        inLanguage: 'ar-TN',
        about: { '@id': `${SITE}/#study-abroad-service` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        inLanguage: 'ar-TN',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'EduGrowth', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'توجيه للدراسة بالخارج', item: canonical },
        ],
      },
    ],
  };

  return (
    <>
      <SEOHelmet
        title="توجيه للدراسة بالخارج من تونس | EduGrowth"
        description="توجيه للطلبة التونسيين للدراسة بالخارج: اختيار البلد، القبول، الفيزا، السكن، الميزانية وملف الطالب مع EduGrowth."
        canonical={canonical}
        lang="ar"
        structuredData={structuredData}
      />
      <main dir="rtl" className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 sm:px-6">
        <article className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-sm sm:p-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-black text-[#005A9C]">
            <Home size={16} /> الصفحة الرئيسية
          </Link>
          <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-[#176b87]">توجيه · دراسة بالخارج · تونس</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-[#17324d]">توجيه للطلبة التونسيين للدراسة بالخارج</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
            EduGrowth يساعد الطلبة التونسيين والوالدين على فهم الاختيارات الواقعية: البلد، الاختصاص، القبول، التأشيرة، السكن، الميزانية وخطة الانطلاق.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('مرحبا EduGrowth، أريد توجيها للدراسة بالخارج من تونس.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white"
            >
              <MessageCircle size={16} /> تواصل عبر واتساب
            </a>
            <Link to="/fr/etudier-a-l-etranger-depuis-tunisie" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-black text-[#17324d]">
              الدليل بالفرنسية <ArrowLeft size={16} />
            </Link>
          </div>

          <section className="mt-10 grid gap-5">
            {sections.map((section) => (
              <div key={section.h2} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-2xl font-black text-[#17324d]">{section.h2}</h2>
                <p className="mt-3 leading-8 text-slate-700">{section.text}</p>
              </div>
            ))}
          </section>

          <section className="mt-10">
            <h2 className="text-3xl font-black text-[#17324d]">أسئلة متداولة</h2>
            <div className="mt-5 space-y-4">
              {faq.map((item) => (
                <div key={item.q} className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="flex items-start gap-3 text-lg font-black text-[#17324d]">
                    <CheckCircle2 size={18} className="mt-1 text-emerald-600" />
                    <span>{item.q}</span>
                  </h3>
                  <p className="mt-3 leading-8 text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
