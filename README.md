# Todo List Frontend

Next.js application for managing todos with a clean, responsive UI.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

## Features

### Home View
- Task list display
- Task completion toggle
- Task deletion with confirmation
- Task summary statistics
- Create task button
- Responsive layout

### Create/Edit Task View
- Task creation form
- Title input (required)
- Color selection
- Navigation handling
- Form validation

## Installation

```bash
# Clone repository
git clone [repository-url]

# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home view
│   ├── create/
│   │   └── page.tsx         # Create task
│   └── edit/[id]/
│       └── page.tsx         # Edit task
├── components/
│   ├── TaskCard.tsx
│   ├── TaskForm.tsx
│   ├── TaskList.tsx
│   └── TaskSummary.tsx
├── lib/
│   └── api.ts               # API client
└── types/
    └── task.ts              # Type definitions
```

## Environment Variables

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Available Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
npm test        # Run tests
```

## API Integration

```typescript
interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

// API endpoints
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

## Component Props

### TaskCard
```typescript
interface TaskCardProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}
```

### TaskForm
```typescript
interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
}
```

## Development

1. Follow Figma design specs
2. Use TypeScript for type safety
3. Implement responsive design
4. Create reusable components
5. Handle loading and error states

## Testing

```bash
npm run test        # Run all tests
npm run test:watch  # Watch mode
```

## Build & Deployment

```bash
npm run build
npm start
```

## License

MIT
