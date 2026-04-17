import { CheckCircle2, Clock } from 'lucide-react';

const PricingCard = ({ title, price, agents, leads, sla, isFeatured, hybridPrice, isHybrid, onSelect }) => (
  <div className={`relative p-10 rounded-[2.5rem] border transition-all duration-500 ${isFeatured ? 'border-[#2E8B57] shadow-2xl bg-white scale-105 z-10' : 'border-gray-200 bg-white/50'}`}>
    {isFeatured && <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#2E8B57] text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">Recommended</div>}
    <h3 className="text-xl font-bold mb-2 uppercase text-gray-900">{title}</h3>
    <div className="mb-8 text-5xl font-black tracking-tighter text-gray-900">{isHybrid ? (hybridPrice || 'Custom') : price}<span className="text-sm font-medium text-gray-400">/mo</span></div>
    <div className="space-y-5 mb-10 text-sm font-medium text-gray-600">
      <div className="flex items-center gap-4 group"><div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center"><CheckCircle2 className="text-[#2E8B57] w-4 h-4" /></div><span className="text-sm font-medium text-gray-600"><strong>{agents}</strong> Dedicated Agents</span></div>
      <div className="flex items-center gap-4 group"><div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center"><CheckCircle2 className="text-[#2E8B57] w-4 h-4" /></div><span className="text-sm font-medium text-gray-600"><strong>{leads}</strong> Leads Processed</span></div>
      <div className="flex items-center gap-4"><div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center"><Clock className="text-[#2E8B57] w-4 h-4" /></div><span className="text-sm font-medium text-gray-600">SLA: {sla}</span></div>
    </div>
    <button onClick={onSelect} className={`w-full py-5 rounded-2xl font-bold text-lg transition-all ${isFeatured ? 'bg-[#2E8B57] text-white hover:bg-[#256f45] shadow-xl shadow-green-100' : 'bg-gray-900 text-white hover:bg-black'}`}>Select {title}</button>
  </div>
);

export default PricingCard;
