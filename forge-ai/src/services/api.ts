// @ts-ignore
import axios from 'axios';
import {Agent, AgentResponse} from '../types/agent';

const API_BASE_URL = 'http://172.22.0.196:4000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export class ApiService {
    // @ts-ignore
    static async getAgents(): Promise<AgentResponse> {
        try {
            const response = await apiClient.get<AgentResponse>('/agents');
            return response.data;
        } catch (error) {
            console.error('Error fetching agents:', error);
            throw error;
        }
    }

    // New method to fetch a single agent by ID
    // @ts-ignore
    static async getAgentById(agentId: string): Promise<Agent> {
        try {
            const response = await apiClient.get<AgentResponse>(`/agents/${agentId}`);
            return response.data; // Adjust this based on your API response structure
        } catch (error) {
            console.error(`Error fetching agent with ID ${agentId}:`, error);
            throw error;
        }
    }
} 