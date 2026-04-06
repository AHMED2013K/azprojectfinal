import { useTheme } from '../context/ThemeContext';

export default function StatCard({ title, value, subtitle }) {
  const { theme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'rounded-3xl border border-white/10 bg-white/6 p-5 shadow-xl backdrop-blur' : 'rounded-3xl border border-slate-200 bg-white p-5 shadow-sm'}>
      <p className={theme === 'dark' ? 'text-sm text-slate-300' : 'text-sm text-slate-500'}>{title}</p>
      <h3 className={theme === 'dark' ? 'mt-2 text-4xl font-semibold text-white' : 'mt-2 text-4xl font-semibold text-slate-900'}>{value}</h3>
      <p className={theme === 'dark' ? 'mt-2 text-sm text-cyan-200' : 'mt-2 text-sm text-sky-700'}>{subtitle}</p>
    </div>
  );
}
