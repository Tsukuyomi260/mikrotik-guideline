import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import ProductPage from './components/ProductPage.tsx';
import {useTheme} from './hooks/useTheme.ts';
import './index.css';

function ProductApp() {
  const {isDark} = useTheme();

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 ${
      isDark
        ? 'bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950'
        : 'bg-slate-50 text-slate-900 selection:bg-cyan-600 selection:text-white'
    }`}>
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ProductPage isDark={isDark} />
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductApp />
  </StrictMode>,
);
