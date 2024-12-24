import { v4 as uuidv4 } from 'uuid';

export interface Task {
    id: string;
    title: string;
    color: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export const mockTasks: Task[] = [
    {
        id: uuidv4(),
        title: 'Complete project documentation',
        color: 'blue',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: uuidv4(),
        title: 'Review pull requests',
        color: 'purple',
        completed: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: uuidv4(),
        title: 'Setup development environment',
        color: 'green',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];

export const mockTaskApi = {
    getTasks: () => Promise.resolve(mockTasks),

    getTaskById: (id: string) =>
        Promise.resolve(mockTasks.find(task => task.id === id)),

    createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
        const newTask: Task = {
            id: Math.random().toString(36).substr(2, 9),
            ...task,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        mockTasks.push(newTask);
        return Promise.resolve(newTask);
    },

    updateTask: (id: string, updates: Partial<Task>) => {
        const index = mockTasks.findIndex(task => task.id === id);
        if (index > -1) {
            mockTasks[index] = {
                ...mockTasks[index],
                ...updates,
                updatedAt: new Date().toISOString(),
            };
            return Promise.resolve(mockTasks[index]);
        }
        return Promise.reject(new Error('Task not found'));
    },

    deleteTask: (id: string) => {
        const index = mockTasks.findIndex(task => task.id === id);
        if (index > -1) {
            mockTasks.splice(index, 1);
            return Promise.resolve(true);
        }
        return Promise.reject(new Error('Task not found'));
    },
};