// Mission Control TypeScript Type Definitions
// These interfaces ensure type safety across all components

// Task Types
export type TaskStatus = 'inbox' | 'assigned' | 'in_progress' | 'review' | 'done' | 'blocked';
export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string | number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Activity Types
export interface Activity {
  id: string | number;
  message: string;
  timestamp: number;
}

// Agent Types
export type AgentStatus = 'idle' | 'active' | 'blocked';

export interface Agent {
  id: string | number;
  name: string;
  role: string;
  status: AgentStatus;
  currentTask?: string;
  tasksCompleted?: number;
}

// Document Types
export interface Document {
  id: string | number;
  title: string;
  description: string;
  type: 'spec' | 'api' | 'guide' | 'other';
  author: string;
  updatedAt: Date;
}

// Component Prop Types
export interface LoadingSkeletonProps {
  lines?: number;
  className?: string;
}

export interface ErrorStateProps {
  onRetry: () => void;
  message?: string;
}

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}
