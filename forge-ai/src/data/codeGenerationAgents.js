export const codeGenerationAgents = [
    {
        id: 'github-copilot',
        name: 'GitHub Copilot',
        description: 'AI pair programmer that helps you write code faster.',
        category: 'Code Generation Agents',
        features: {
            input: ['Text', 'Code'],
            output: 'Code Suggestions',
            useCase: 'Code Completion',
            pricing: {
                free: false,
                paid: '$10/month'
            },
            platforms: ['Web', 'VS Code'],
            integration: ['GitHub'],
            accuracy: 'High',
            rating: 4.5,
            users: 1500
        },
        documentation: 'https://github.com/features/copilot',
        tutorial: 'https://docs.github.com/en/copilot'
    },
    {
        id: 'tabnine',
        name: 'Tabnine',
        description: 'AI code completion tool that integrates with your IDE.',
        category: 'Code Generation Agents',
        features: {
            input: ['Text', 'Code'],
            output: 'Code Suggestions',
            useCase: 'Code Completion',
            pricing: {
                free: true,
                paid: '$12/month'
            },
            platforms: ['Web', 'VS Code', 'JetBrains'],
            integration: ['GitHub', 'GitLab'],
            accuracy: 'High',
            rating: 4.6,
            users: 2000
        },
        documentation: 'https://www.tabnine.com/',
        tutorial: 'https://www.tabnine.com/learn'
    },
];