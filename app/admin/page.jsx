"use client";

import React, { useState } from 'react';
import { useGlobalData } from '@/components/DataProvider';
import dynamic from 'next/dynamic';
const AdminPanel = dynamic(() => import('@/src/components/AdminPanel'), { ssr: false });
import LoginForm from '@/src/components/LoginForm';

export default function AdminPage() {
    const [userRole, setUserRole] = useState(null);
    const { editors, loading } = useGlobalData();

    const handleLogin = (role) => {
        setUserRole(role);
    };

    const handleLogout = () => {
        setUserRole(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold font-bold"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4 shadow-2xl">
            {userRole ? (
                <div className="animate-fade-in">
                    <div className="flex justify-end mb-6">
                        <button
                            onClick={handleLogout}
                            className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-full text-xs font-bold uppercase transition-all"
                        >
                            Sair do Painel
                        </button>
                    </div>
                    <AdminPanel userRole={userRole} />
                </div>
            ) : (
                <LoginForm onLogin={handleLogin} editors={editors} />
            )}
        </div>
    );
}
