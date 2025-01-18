export interface WorkflowAgent {
    id: string;
    category: string;
}

export interface Workflow {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    category: string;
    agents: WorkflowAgent[];
}

export interface WorkflowResponse {
    workflows: Workflow[];
} 