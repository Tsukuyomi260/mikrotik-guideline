import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import ProductPage from './components/ProductPage.tsx';
import {useTheme} from './hooks/useTheme.ts';
import './index.css';

function ProductApp() {
  // Applies the saved or system theme by toggling the `dark` class on <html>.
  useTheme();
  return <ProductPage />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductApp />
  </StrictMode>,
);
