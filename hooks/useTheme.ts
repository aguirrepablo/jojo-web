"use client";

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

const isTheme = (value: string | null): value is Theme => {
  return value === 'light' || value === 'dark' || value === 'system';
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (isTheme(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const updateResolvedTheme = () => {
      let currentTheme: ResolvedTheme;
      if (theme === 'system') {
        currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        currentTheme = theme;
      }
      setResolvedTheme(currentTheme);

      if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    updateResolvedTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (theme === 'system') {
        updateResolvedTheme();
      }
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return { resolvedTheme, toggleTheme };
};
