"use client";

import React from 'react';
import { useGlobalData } from '@/components/DataProvider';
import ConcursosFeed from '@/src/components/ConcursosFeed';

export default function ConcursosPage() {
    const { concursos } = useGlobalData();
    return (
        <div className="container mx-auto py-12 px-4 shadow-2xl">
            <ConcursosFeed concursos={concursos} />
        </div>
    );
}
