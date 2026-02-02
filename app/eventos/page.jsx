"use client";

import React from 'react';
import { useGlobalData } from '@/components/DataProvider';
import EventosFeed from '@/src/components/EventosFeed';

export default function EventosPage() {
    const { eventos } = useGlobalData();
    return (
        <div className="container mx-auto py-12 px-4 shadow-2xl">
            <EventosFeed eventos={eventos} />
        </div>
    );
}
