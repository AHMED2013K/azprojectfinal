import { useEffect, useState } from 'react';
import { MessageCircle, Star } from 'lucide-react';

const initialReviews = [
  { name: 'Nesrine', content: "Je suis très satisfaite de mon expérience avec cette agence. Dès le premier accueil, l’équipe a été très chaleureuse, professionnelle et à l’écoute. Ils prennent vraiment le temps de comprendre mes besoins et de m’orienter vers la solution qui me correspond le mieux pour mes études à l’étranger. Merci pour votre accompagnement, votre disponibilité et votre gentillesse. Je recommande vivement cette agence." },
  { name: 'Kacem Meriam', content: "Un immense merci pour votre professionnalisme, votre disponibilité et votre bienveillance tout au long de mon accompagnement. Une équipe à l'écoute que je recommande les yeux fermés !" },
  { name: 'DCB', content: "Merci à toute l’équipe d’Abroad Zone (surtout Mr. Yousssef et Ahmed) pour leur disponibilité, leur réactivité et leur accompagnement tout au long du processus. Une équipe sérieuse, professionnelle et toujours à l’écoute. Je recommande vivement leurs services à toute personne souhaitant poursuivre ses études à l’étranger." },
  { name: 'Mehdi', content: "Bel7a9 équipe yeser pro, bel5sous sid Ahmed c'est lui qui a géré mon dossier de A jusqu'à Z, je suis très satisfait, il était tjrs disponible w fin manest7a9hom mawjoudin." },
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState(initialReviews);
  useEffect(() => { fetch('/api/reviews/public').then((response) => response.ok ? response.json() : null).then((data) => { if (data?.reviews?.length) setReviews([...data.reviews, ...initialReviews]); }).catch(() => {}); }, []);
  return <section className="px-4 pb-20 sm:px-6" aria-labelledby="reviews-title"><div className="mx-auto max-w-7xl rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-[#176b87]">Avis clients</p><h2 id="reviews-title" className="mt-3 text-3xl font-black text-[#17324d]">Ils parlent de leur expérience avec EduGrowth.</h2></div><a href="/ajouter-un-avis" className="inline-flex items-center gap-2 rounded-full bg-[#176b87] px-4 py-3 text-sm font-bold text-white"><MessageCircle size={16}/> Ajouter un avis</a></div><div className="mt-7 grid gap-4 md:grid-cols-2">{reviews.map((review) => <article key={review.name + review.content} className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><div className="flex items-center justify-between gap-3"><h3 className="font-black text-[#17324d]">{review.name}</h3><div className="flex text-amber-500">{[1,2,3,4,5].map((item) => <Star key={item} size={15} fill="currentColor" />)}</div></div><p className="mt-4 text-sm leading-7 text-slate-700">“{review.content}”</p><p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Avis client</p></article>)}</div></div></section>;
}
