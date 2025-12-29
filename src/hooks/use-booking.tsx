"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type BookingContextType = {
  isOpen: boolean;
  open: (initialData?: { pickupAddress?: string }) => void;
  close: () => void;
  initialData: { pickupAddress?: string } | null;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<{ pickupAddress?: string } | null>(null);

  const open = useCallback((data?: { pickupAddress?: string }) => {
    if (data) setInitialData(data);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setInitialData(null);
  }, []);

  return (
    <BookingContext.Provider value={{ isOpen, open, close, initialData }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
