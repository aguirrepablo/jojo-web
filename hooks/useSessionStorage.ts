"use client";

import { useState, useEffect } from 'react';

// A helper function to safely access window.sessionStorage
function getStorageValue<T>(key: string, defaultValue: T): T {
  // Getting stored value
  if (typeof window !== "undefined") {
    const saved = window.sessionStorage.getItem(key);
    if (saved) {
      try {
        return JSON.parse(saved) as T;
      } catch (error) {
        console.error("Error parsing session storage item:", error);
        return defaultValue;
      }
    }
  }
  return defaultValue;
}

export function useSessionStorage<T>(key: string, defaultValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // Storing value
    try {
      // Allow value to be cleared by setting it to undefined or null
      if (value === undefined || value === null) {
        window.sessionStorage.removeItem(key);
      } else {
        window.sessionStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Error setting session storage item:", error);
    }
  }, [key, value]);

  return [value, setValue];
}
