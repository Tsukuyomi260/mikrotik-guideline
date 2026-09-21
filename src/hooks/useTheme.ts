import { useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'mikrotik_guide_theme';

type Theme = 'dark' | 'light';

/**
 * Dark/light theme shared by the guide and the sales page.
 * Saved choice wins, otherwise the OS preference, otherwise dark.
 * Syncs the `dark` class on <html>.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    const next: Theme = isDark ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return { isDark, toggleTheme };
}
