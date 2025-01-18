export const uiuxAgents = [
    {
        id: 'uizard',
        name: 'Uizard.io',
        description: 'Generates UI prototypes.',
        category: 'UI/UX Design Agents',
        features: {
            input: ['Text', 'JSON'],
            output: 'UI Prototype',
            useCase: 'Website prototyping',
            pricing: {
                free: true,
                paid: '$100/month'
            },
            platforms: ['Web', 'Windows', 'macOS'],
            integration: ['Figma', 'Adobe XD'],
            users: 1200,
            me: "okk"
        },
        documentation: 'https://docs.uizard.io',
        tutorial: 'https://tutorial.uizard.io'
    },
    {
        id: 'figma',
        name: 'Figma',
        description: 'Design, prototype, and collaborate on user interfaces.',
        category: 'UI/UX Design Agents',
        features: {
            input: ['Text', 'Images'],
            output: 'UI Design Files',
            useCase: 'UI/UX Design, Prototyping',
            pricing: {
                free: true,
                paid: '$25/month'
            },
            platforms: ['Web', 'Desktop'],
            integration: ['Adobe XD', 'Sketch'],
            rating: 4.8,
            users: 2500
        },
        documentation: 'https://www.figma.com/',
        tutorial: 'https://help.figma.com/'
    },
]; 