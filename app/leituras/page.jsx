"use client";

import React from 'react';
import { useGlobalData } from '@/components/DataProvider';
import LeituraFeed from '@/src/components/LeituraFeed';

export default function LeiturasPage() {
    const { leituras } = useGlobalData();
    return (
        <div className="container mx-auto py-12 px-4 shadow-xl">
            <LeituraFeed leituras={leituras} />
        </div>
    );
}
