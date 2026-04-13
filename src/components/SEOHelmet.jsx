import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext.jsx';

const siteUrl = 'https://edugrowth.tn/';
const defaultImage = 'https://edugrowth.tn/og-image.png';

const SEOHelmet = ({
  title = 'EduGrowth Outsourcing | Higher Education BPO & Student Recruitment in Tunisia',
  description = 'EduGrowth provides specialized BPO services for universities, language centers, and education agencies. Outsource your student recruitment, admissions, and CRM management to Tunisia.',
  canonical = siteUrl,
  alternates = null,
  robotsContent = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image = defaultImage,
  type = 'website',
  lang = null,
  structuredData = null,
  faqItems = null
}) => {
  const { lang: activeLanguage } = useLanguage();
  const resolvedLanguage = lang || activeLanguage || 'en';
  const locale = resolvedLanguage === 'fr' ? 'fr_FR' : 'en_US';
  const normalizedCanonical = canonical || siteUrl;
  const hreflangAlternates = alternates || [
    { href: normalizedCanonical, hreflang: 'x-default' },
  ];

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        "name": "EduGrowth Outsourcing",
        "url": siteUrl,
        "logo": "https://edugrowth.tn/Submark.png",
        "description": "EduGrowth provides student recruitment, admissions support, lead qualification, and multilingual education outsourcing services from Tunisia for universities, language centres, and education agencies.",
        "telephone": "+21656590703",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+21656590703",
          "contactType": "sales",
          "availableLanguage": ["English", "French", "Arabic"],
          "areaServed": ["TN", "AE", "GB", "FR", "DE", "CA"]
        }
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}#service`,
        "name": "Student Recruitment and Admissions Outsourcing",
        "serviceType": "Education Outsourcing",
        "provider": {
          "@id": `${siteUrl}#organization`
        },
        "audience": {
          "@type": "Audience",
          "audienceType": "Universities, language centres, and education agencies"
        },
        "areaServed": ["TN", "AE", "GB", "FR", "DE", "CA"],
        "availableLanguage": ["English", "French", "Arabic"],
        "description": "Outsourced education operations including student lead generation support, applicant qualification, admissions coordination, CRM follow-up, and multilingual communications delivered from Tunisia."
      },
      {
        "@type": "WebPage",
        "@id": `${normalizedCanonical}#webpage`,
        "url": normalizedCanonical,
        "name": title,
        "description": description,
        "inLanguage": resolvedLanguage,
        "isPartOf": {
          "@id": `${siteUrl}#website`
        },
        "about": {
          "@id": `${siteUrl}#service`
        }
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        "name": "EduGrowth Outsourcing",
        "url": siteUrl,
        "inLanguage": ["en", "fr"],
        "publisher": {
          "@id": `${siteUrl}#organization`
        }
      }
    ]
  };

  const faqStructuredData = faqItems?.length
    ? {
        '@type': 'FAQPage',
        mainEntity: faqItems.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer,
          },
        })),
      }
    : null;

  const baseStructuredData = structuredData || defaultStructuredData;
  const resolvedStructuredData = faqStructuredData
    ? Array.isArray(baseStructuredData?.['@graph'])
      ? {
          ...baseStructuredData,
          '@graph': [...baseStructuredData['@graph'], faqStructuredData],
        }
      : {
          '@context': 'https://schema.org',
          '@graph': [baseStructuredData, faqStructuredData],
        }
    : baseStructuredData;

  return (
    <Helmet prioritizeSeoTags>
      <html lang={resolvedLanguage} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={normalizedCanonical} />

      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="bingbot" content={robotsContent} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={normalizedCanonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="EduGrowth Outsourcing" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {hreflangAlternates.map(({ href, hreflang }) => (
        <link key={hreflang} rel="alternate" href={href} hrefLang={hreflang} />
      ))}

      <script type="application/ld+json">
        {JSON.stringify(resolvedStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHelmet;
