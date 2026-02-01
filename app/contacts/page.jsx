"use client";

import React from 'react';
import ContactDirectory from '@/src/components/ContactDirectory';

export default function ContactsPage() {
    return (
        <div className="container mx-auto py-12 px-4 shadow-xl">
            <ContactDirectory />
        </div>
    );
}
