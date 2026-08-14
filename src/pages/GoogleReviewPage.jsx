import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Copy, Home, MessageCircle, Star } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const googleReviewUrl = 'https://share.google/CQnH7g1VhKplOtzGs';

export default function GoogleReviewPage() {
  const [review, setReview] = useState('');
  const [copied, setCopied] = useState(false);

  const copyReview = async () => {
    if (!review.trim()) return;
    await navigator.clipboard.writeText(review.trim());
    setCopied(true);
  };

  return (
    <>
      <SEOHelmet
        title="Laisser un avis Google | EduGrowth Tunisie"
        description="Page rapide pour préparer et publier un avis Google sur EduGrowth Tunisie après un accompagnement étudiant."
        canonical="https://edugrowth.tn/avis-google"
        lang="fr"
        robotsContent="noindex, follow"
      />
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            <Home size={16} /> Accueil
          </Link>

          <section className="mt-8 rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map((item) => (
                <Star key={item} size={24} fill="currentColor" />
              ))}
            </div>
            <h1 className="mt-5 text-4xl font-black text-[#17324d]">Merci de laisser un avis Google à EduGrowth</h1>
            <p className="mt-4 leading-8 text-slate-600">
              Google ne permet pas à un site externe de publier l’avis automatiquement. Écrivez votre texte ici, copiez-le, puis ouvrez Google pour le coller et publier depuis votre compte.
            </p>
            <textarea
              value={review}
              onChange={(event) => setReview(event.target.value)}
              rows="7"
              placeholder="Exemple : EduGrowth m’a aidé à clarifier mon projet d’études à l’étranger, préparer mon dossier et comprendre les étapes..."
              className="mt-6 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-base leading-7 outline-none focus:border-[#176b87] focus:ring-2 focus:ring-cyan-100"
            />
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={copyReview}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17324d] px-6 py-3 text-sm font-black text-white hover:bg-[#10263b]"
              >
                <Copy size={16} /> {copied ? 'Avis copié' : 'Copier mon avis'}
              </button>
              <a
                href={googleReviewUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-black text-white hover:bg-emerald-700"
              >
                Ouvrir Google <ArrowRight size={16} />
              </a>
              <a
                href="https://wa.me/21656590703?text=Bonjour%20EduGrowth%2C%20j%27ai%20besoin%20du%20lien%20pour%20laisser%20un%20avis%20Google"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700 hover:bg-slate-100"
              >
                <MessageCircle size={16} /> Aide WhatsApp
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
