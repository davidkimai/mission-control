import { useState } from "react";
import { TaskDetail } from "./TaskDetail";

const COLUMNS = [
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div className="skeleton h-4 w-20 rounded" />
            <div className="skeleton h-5 w-8 rounded-full" />
          </div>
          <div className="space-y-2">
            {[...Array(2)].map((_, j) => (
              <div key={j} className="skeleton h-20 rounded" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function TaskBoard() {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isLoading] = useState(false);
  const [tasks, setTasks] = useState(() => getMockTasks());

  const tasksByStatus = COLUMNS.reduce((acc, { key }) => {
    acc[key] = tasks?.filter((t: any) => t.status === key) || [];
    return acc;
  }, {} as Record<string, any[]>);

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
  };

  const handleUpdateTask = (taskId: string | number, updates: any) => {
    setTasks(prev => prev.map(t =>
      (('id' in t && t.id === taskId) || ('_id' in t && t._id === taskId)) ? { ...t, ...updates } : t
    ));
    setSelectedTask((prev: any) => prev ? { ...prev, ...updates } : null);
  };

  return (
    <>
      <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 animate-fade-in">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-100">
          Task Board
        </h2>

        {isLoading ? (
          <TaskBoardSkeleton />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto pb-2">
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
  const getColumnColor = () => {
    switch (status) {
      case "blocked": return "border-red-500/30";
      case "done": return "border-green-500/30";
      case "in_progress": return "border-primary-500/30";
      default: return "border-gray-700";
    }
  };

  return (
    <div className={`bg-gray-900 rounded-lg p-3 sm:p-4 border ${getColumnColor()} min-w-[140px] sm:min-w-0`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase truncate">
          {label}
        </h3>
        <span className="text-xs font-medium text-gray-500 bg-gray-800 rounded-full px-2 py-0.5 flex-shrink-0">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-2 max-h-[400px] sm:max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
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
  const priorityColors = {
    high: "border-red-500",
    medium: "border-yellow-500",
    low: "border-green-500",
  };

  return (
    <div
      onClick={onClick}
      className={`bg-gray-800 rounded p-2 sm:p-3 border-l-2 ${priorityColors[task.priority as keyof typeof priorityColors] || "border-gray-600"} border-r border-t border-b border-gray-700 hover:border-primary-500 transition-all duration-200 cursor-pointer group`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <h4 className="text-xs sm:text-sm font-medium text-gray-100 mb-1 group-hover:text-primary-400 transition-colors line-clamp-2">
        {task.title}
      </h4>
      <p className="text-xs text-gray-400 line-clamp-2 mb-2">
        {task.description}
      </p>
      {task.assignedTo && (
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
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
