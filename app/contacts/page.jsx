"use client";

import React from 'react';
import { useGlobalData } from '@/components/DataProvider';
import ContactDirectory from '@/src/components/ContactDirectory';

export default function ContactsPage() {
    const { contacts } = useGlobalData();
    return (
        <div className="container mx-auto py-12 px-4 shadow-xl">
            <ContactDirectory contacts={contacts} />
        </div>
    );
}
