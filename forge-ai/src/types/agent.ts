export interface Agent {
    id: string;
    name: string;
    description: string;
    category: string;
    features: {
        input: string[];
        output: string;
        useCase: string;
        pricing: {
            free: boolean;
            paid: number;
        };
        platforms: string[];
        integration: string[];
        users: number;
        accuracy: string;
    };
    documentation: string;
    tutorial: string;
    imageUrl: string;
    implementationLevel: string;
    rating: number;
}

export interface AgentResponse {
    success: boolean;
    data: {
        [category: string]: Agent[];
    };
} 