import {Agent} from "./agent";

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
    agents: Agent[];
}

export interface AIWorkflow {
    workflows: Workflow
}

export interface WorkflowResponse {
    workflows: Workflow[];
} 