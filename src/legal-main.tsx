import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import LegalPage from './components/LegalPage.tsx';
import {PRIVACY, TERMS} from './data/legalData.ts';
import {useTheme} from './hooks/useTheme.ts';
import './index.css';

const root = document.getElementById('root')!;
const legalContent = root.dataset.page === 'privacy' ? PRIVACY : TERMS;

function LegalApp() {
  // Applies the saved or system theme by toggling the `dark` class on <html>.
  useTheme();
  return <LegalPage content={legalContent} />;
}

createRoot(root).render(
  <StrictMode>
    <LegalApp />
  </StrictMode>,
);
