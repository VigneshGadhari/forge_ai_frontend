import { useState, useEffect } from 'react';
import { Agent, AgentResponse } from '../types/agent';
import { ApiService } from '../services/api';

export const useAgents = () => {
    const [agents, setAgents] = useState<{ [category: string]: Agent[] }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchAgents();
    }, []);

    // @ts-ignore
    const fetchAgents = async () => {
        try {
            setLoading(true);
            const response = await ApiService.getAgents();
            if (response.success) {
                setAgents(response.data);
            } else {
                setError('Failed to fetch agents');
            }
        } catch (err) {
            setError('Error fetching agents');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { agents, loading, error, refetch: fetchAgents };
}; 