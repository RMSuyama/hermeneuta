"use client";

import React, { createContext, useContext } from 'react';
import { useData } from '@/src/hooks/useData';

const DataContext = createContext(null);

export function DataProvider({ children }) {
    const data = useData();

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
}

export function useGlobalData() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useGlobalData must be used within a DataProvider');
    }
    return context;
}
