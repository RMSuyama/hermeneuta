
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { mockNews } from '../data/mockNews';

export const useData = () => {
    const [data, setData] = useState({
        news: [],
        concursos: [],
        contacts: [],
        leituras: [],
        editors: [],
        eventos: [],
        instituicoes: [],
        equipamentos: [],
        vagas: [],
        vozDoVale: [],
        comments: [],
        reservas: [],
        academico: []
    });
    const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [
                newsRes,
                eventosRes,
                editorsRes,
                contactsRes,
                leiturasRes,
                concursosRes,
                commentsRes,
                reservasRes,
                vozDoValeRes,
                vagasRes,
                instituicoesRes,
                equipamentosRes,
                configRes
            ] = await Promise.all([
                supabase.from('news').select('*').order('created_at', { ascending: false }),
                supabase.from('eventos').select('*').order('date', { ascending: true }),
                supabase.from('editors').select('*'),
                supabase.from('contacts').select('*'),
                supabase.from('leituras').select('*').order('created_at', { ascending: false }),
                supabase.from('concursos').select('*').order('created_at', { ascending: false }),
                supabase.from('comments').select('*').order('created_at', { ascending: false }),
                supabase.from('reservas').select('*').order('created_at', { ascending: false }),
                supabase.from('voz_do_vale').select('*').order('created_at', { ascending: false }),
                supabase.from('vagas').select('*').order('created_at', { ascending: false }),
                supabase.from('instituicoes').select('*').order('name', { ascending: true }),
                supabase.from('equipamentos').select('*').order('created_at', { ascending: false }),
                supabase.from('config').select('*')
            ]);

            // Troubleshooting logs
            if (newsRes.error) console.error("News error:", newsRes.error);
            if (vozDoValeRes.error) console.error("Voz do Vale error:", vozDoValeRes.error);
            if (reservasRes.error) console.error("Reservas error:", reservasRes.error);

            // Fallback content if Supabase is empty
            const finalNews = (newsRes.data && newsRes.data.length > 0) ? newsRes.data : mockNews;

            console.log("Supabase Fetch Results:", {
                news: newsRes.data?.length || 0,
                reservas: reservasRes.data?.length || 0,
                academico: vozDoValeRes.data?.length || 0,
                usingFallback: !newsRes.data || newsRes.data.length === 0
            });

            // Maintenance Check
            const maintenance = configRes.data?.find(c => c.key === 'maintenance_mode');
            if (maintenance) setIsMaintenanceMode(maintenance.value === true);

            setData({
                news: finalNews,
                eventos: eventosRes.data || [],
                editors: editorsRes.data || [],
                contacts: contactsRes.data || [],
                concursos: concursosRes.data || [],
                leituras: leiturasRes.data || [],
                instituicoes: instituicoesRes.data || [],
                equipamentos: equipamentosRes.data || [],
                vozDoVale: vozDoValeRes.data || [],
                vagas: vagasRes.data || [],
                comments: commentsRes.data || [],
                reservas: reservasRes.data || [],
                academico: vozDoValeRes.data || [],
                properties: []
            });

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addItem = async (key, item) => {
        if (isMaintenanceMode) {
            console.warn("CRUD blocked: Maintenance mode is active.");
            return;
        }
        try {
            const tableMap = {
                news: 'news',
                eventos: 'eventos',
                editors: 'editors',
                contacts: 'contacts',
                leituras: 'leituras',
                concursos: 'concursos',
                vagas: 'vagas',
                academico: 'voz_do_vale',
                comments: 'comments',
                reservas: 'reservas'
            };
            const tableName = tableMap[key];

            // ... (rest of function) ...

            // Align form authorId with DB author_id for news
            const itemToSave = { ...item };
            if (key === 'news' && itemToSave.authorId) {
                itemToSave.author_id = itemToSave.authorId;
                delete itemToSave.authorId;
            }

            if (!tableName) {
                setData(prev => ({ ...prev, [key]: [itemToSave, ...prev[key]] }));
                return;
            }

            const { data: inserted, error } = await supabase.from(tableName).insert([itemToSave]).select();
            if (error) throw error;
            if (inserted) {
                setData(prev => ({ ...prev, [key]: [inserted[0], ...prev[key]] }));
            }
        } catch (error) {
            console.error(`Error adding to ${key}:`, error);
        }
    };

    const deleteItem = async (key, id) => {
        if (isMaintenanceMode) {
            console.warn("CRUD blocked: Maintenance mode is active.");
            return;
        }
        try {
            const tableMap = {
                news: 'news',
                eventos: 'eventos',
                editors: 'editors',
                contacts: 'contacts',
                leituras: 'leituras',
                concursos: 'concursos',
                vagas: 'vagas',
                academico: 'voz_do_vale',
                comments: 'comments',
                reservas: 'reservas'
            };
            const tableName = tableMap[key];
            if (!tableName) {
                setData(prev => ({ ...prev, [key]: prev[key].filter(i => i.id !== id) }));
                return;
            }
            const { error } = await supabase.from(tableName).delete().eq('id', id);
            if (error) throw error;
            setData(prev => ({ ...prev, [key]: prev[key].filter(i => i.id !== id) }));
        } catch (error) {
            console.error(`Error deleting from ${key}:`, error);
        }
    };

    const updateItem = async (key, id, updatedFields) => {
        if (isMaintenanceMode) {
            console.warn("CRUD blocked: Maintenance mode is active.");
            return;
        }
        try {
            const tableMap = {
                news: 'news',
                eventos: 'eventos',
                editors: 'editors',
                contacts: 'contacts',
                leituras: 'leituras',
                concursos: 'concursos',
                vagas: 'vagas',
                academico: 'voz_do_vale',
                comments: 'comments',
                reservas: 'reservas'
            };
            const tableName = tableMap[key];
            if (!tableName) {
                setData(prev => ({ ...prev, [key]: prev[key].map(i => i.id === id ? { ...i, ...updatedFields } : i) }));
                return;
            }
            const { error } = await supabase.from(tableName).update(updatedFields).eq('id', id);
            if (error) throw error;
            setData(prev => ({ ...prev, [key]: prev[key].map(i => i.id === id ? { ...i, ...updatedFields } : i) }));
        } catch (error) {
            console.error(`Error updating ${key}:`, error);
        }
    };

    const updateConfig = async (key, value) => {
        try {
            const { error } = await supabase.from('config').upsert({ key, value });
            if (error) throw error;
            if (key === 'maintenance_mode') setIsMaintenanceMode(value === true);
        } catch (error) {
            console.error(`Error updating config ${key}:`, error);
        }
    };

    return { ...data, addItem, deleteItem, updateItem, updateConfig, isMaintenanceMode, loading, refresh: fetchData };
};
