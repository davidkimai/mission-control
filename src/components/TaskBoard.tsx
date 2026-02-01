import { useState, useCallback } from "react";
import { AlertCircle, Inbox } from "lucide-react";
import { TaskDetail } from "./TaskDetail";
import type { TaskStatus } from "../types";

const COLUMNS: { key: TaskStatus; label: string }[] = [
  { key: "inbox", label: "Inbox" },
  { key: "assigned", label: "Assigned" },
  { key: "in_progress", label: "In Progress" },
  { key: "review", label: "Review" },
  { key: "done", label: "Done" },
  { key: "blocked", label: "Blocked" },
];

// Loading skeleton for task columns
function TaskBoardSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-bg-primary rounded-lg p-3 border border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="skeleton h-4 w-16 rounded" />
            <div className="skeleton h-5 w-6 rounded-full" />
          </div>
          <div className="space-y-2">
            {[...Array(2)].map((_, j) => (
              <div key={j} className="skeleton h-16 rounded" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Error state component
function TaskBoardError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="bg-bg-secondary rounded-lg p-6 border border-border text-center">
      <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
        <AlertCircle className="w-5 h-5 text-error" />
      </div>
      <h3 className="text-sm font-semibold text-text-primary mb-1">Failed to load tasks</h3>
      <p className="text-xs text-text-secondary mb-3">Unable to fetch tasks. Please check your connection.</p>
      <button
        onClick={onRetry}
        className="btn btn-primary"
      >
        Try Again
      </button>
    </div>
  );
}

export function TaskBoard() {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<any[]>(() => getMockTasks());

  const tasksByStatus = COLUMNS.reduce((acc, { key }) => {
    acc[key] = tasks?.filter((t: any) => t.status === key) || [];
    return acc;
  }, {} as Record<string, any[]>);

  const handleTaskClick = useCallback((task: any) => {
    setSelectedTask(task);
  }, []);

  const handleUpdateTask = useCallback((taskId: string | number, updates: any) => {
    setTasks(prev => prev.map(t =>
      (('id' in t && t.id === taskId) || ('_id' in t && t._id === taskId)) ? { ...t, ...updates } : t
    ));
    setSelectedTask((prev: any) => prev ? { ...prev, ...updates } : null);
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    setIsLoading(true);
    setTimeout(() => {
      setTasks(getMockTasks());
      setIsLoading(false);
    }, 500);
  }, []);

  const totalTasks = Object.values(tasksByStatus).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <>
      <div className="bg-bg-secondary/80 backdrop-blur-sm rounded-xl p-4 border border-border/50">
        <div className="flex items-center justify-between mb-3">
          <h2 className="heading-2">
            Task Board
          </h2>
          {totalTasks > 0 && (
            <span className="caption px-2 py-0.5 bg-bg-primary/50 rounded-full">
              {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'}
            </span>
          )}
        </div>

        {error ? (
          <TaskBoardError onRetry={handleRetry} />
        ) : isLoading ? (
          <TaskBoardSkeleton />
        ) : totalTasks === 0 ? (
          <div className="text-center py-8">
            <Inbox className="w-10 h-10 mx-auto mb-2 text-text-muted" />
            <p className="text-sm text-text-secondary">No tasks yet</p>
            <p className="text-xs text-text-muted mt-1 mb-3">Create your first task to get started</p>
            <button
              onClick={() => console.log('Create task clicked')}
              className="btn btn-primary"
            >
              Create first task
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 overflow-x-auto pb-2">
            {COLUMNS.map((column) => (
              <TaskColumn
                key={column.key}
                status={column.key}
                label={column.label}
                tasks={tasksByStatus[column.key]}
                onTaskClick={handleTaskClick}
              />
            ))}
          </div>
        )}
      </div>

      <TaskDetail
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        onUpdateTask={handleUpdateTask}
      />
    </>
  );
}

interface TaskColumnProps {
  status: string;
  label: string;
  tasks: any[];
  onTaskClick: (task: any) => void;
}

function TaskColumn({ status, label, tasks, onTaskClick }: TaskColumnProps) {
  const getColumnConfig = () => {
    switch (status) {
      case "blocked": 
        return { border: "border-error/60 bg-error/5", badge: "bg-error/20 text-error", label: "text-error" };
      case "done": 
        return { border: "border-success/60 bg-success/5", badge: "bg-success/20 text-success", label: "text-success" };
      case "in_progress": 
        return { border: "border-accent/60 bg-accent/5", badge: "bg-accent/20 text-accent", label: "text-accent" };
      case "review": 
        return { border: "border-warning/60 bg-warning/5", badge: "bg-warning/20 text-warning", label: "text-warning" };
      case "assigned": 
        return { border: "border-blue-500/60 bg-blue-500/5", badge: "bg-blue-500/20 text-blue-400", label: "text-blue-400" };
      default: 
        return { border: "border-border bg-bg-secondary/50", badge: "bg-bg-tertiary/50 text-text-secondary", label: "text-text-secondary" };
    }
  };

  const config = getColumnConfig();

  return (
    <div className={`bg-bg-primary/80 rounded-lg p-3 border ${config.border} min-w-[120px]`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className={`text-xs font-semibold uppercase truncate ${config.label}`}>
          {label}
        </h3>
        <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${config.badge}`}>
          {tasks.length}
        </span>
      </div>
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
        {tasks.map((task) => (
          <TaskCard key={task._id || task.id} task={task} onClick={() => onTaskClick(task)} />
        ))}
      </div>
    </div>
  );
}

interface TaskCardProps {
  task: any;
  onClick: () => void;
}

function TaskCard({ task, onClick }: TaskCardProps) {
  const priorityConfig = {
    high: { 
      border: "border-red-500 bg-red-500/10", 
      badge: "bg-red-500/20 text-red-400",
      label: "High"
    },
    medium: { 
      border: "border-amber-500 bg-amber-500/10", 
      badge: "bg-amber-500/20 text-amber-400",
      label: "Medium"
    },
    low: { 
      border: "border-emerald-500 bg-emerald-500/10", 
      badge: "bg-emerald-500/20 text-emerald-400",
      label: "Low"
    },
  };

  const config = priorityConfig[task.priority as keyof typeof priorityConfig] || { 
    border: "border-border bg-bg-secondary", 
    badge: "bg-bg-tertiary text-text-secondary",
    label: ""
  };

  return (
    <div
      onClick={onClick}
      className={`bg-bg-secondary/80 rounded-lg p-2.5 border-l-2 ${config.border} border-r border-t border-b border-border hover:bg-bg-secondary hover:border-border/80 transition-colors duration-150 cursor-pointer group`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="flex items-start justify-between gap-1 mb-1">
        <h4 className="text-xs font-medium text-text-primary group-hover:text-white transition-colors line-clamp-2 flex-1">
          {task.title}
        </h4>
        {config.label && (
          <span className={`text-xs px-1.5 py-0.5 rounded ${config.badge} flex-shrink-0`}>
            {config.label}
          </span>
        )}
      </div>
      {task.assignedTo && (
        <div className="flex items-center gap-1 text-xs text-text-muted">
          <span className="truncate">{task.assignedTo}</span>
        </div>
      )}
    </div>
  );
}

function getMockTasks() {
  return [
    { id: 1, title: "Setup Convex backend", description: "Initialize Convex project and schema", status: "inbox", priority: "high", assignedTo: "Agent Jarvis", createdAt: new Date(), updatedAt: new Date() },
    { id: 2, title: "Build frontend components", description: "Create React components with Tailwind", status: "assigned", priority: "high", assignedTo: "Agent Friday", createdAt: new Date(), updatedAt: new Date() },
    { id: 3, title: "Implement authentication", description: "Add user login and signup", status: "in_progress", priority: "medium", assignedTo: "Agent Vision", createdAt: new Date(), updatedAt: new Date() },
    { id: 4, title: "Design system review", description: "Review color palette and typography", status: "review", priority: "low", assignedTo: "Agent Wanda", createdAt: new Date(), updatedAt: new Date() },
    { id: 5, title: "Deploy to Vercel", description: "Set up production deployment", status: "inbox", priority: "medium", createdAt: new Date(), updatedAt: new Date() },
    { id: 6, title: "Write documentation", description: "Document API and components", status: "done", priority: "low", assignedTo: "Agent Banner", createdAt: new Date(), updatedAt: new Date() },
    { id: 7, title: "Fix API timeout", description: "Investigate and resolve timeout issues", status: "blocked", priority: "high", assignedTo: "Agent Jarvis", createdAt: new Date(), updatedAt: new Date() },
    { id: 8, title: "Database migration", description: "Migrate from SQLite to PostgreSQL", status: "in_progress", priority: "high", assignedTo: "Agent Thor", createdAt: new Date(), updatedAt: new Date() },
  ];
}
