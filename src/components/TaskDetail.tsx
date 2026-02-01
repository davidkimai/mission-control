import { useState, useEffect, useRef } from "react";

interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: Date;
}

interface Task {
  _id?: string;
  id?: number;
  title: string;
  description: string;
  status: string;
  assignedTo?: string;
  priority?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TaskDetailProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateTask?: (taskId: string | number, updates: Partial<Task>) => void;
}

export function TaskDetail({ task, isOpen, onClose, onUpdateTask }: TaskDetailProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Agent Jarvis",
      text: "Started working on this task",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: 2,
      author: "Agent Friday",
      text: "Updated the UI components",
      timestamp: new Date(Date.now() - 1800000),
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle escape key and focus management
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      // Focus on close button for accessibility
      setTimeout(() => {
        const closeBtn = panelRef.current?.querySelector('[data-close-btn]') as HTMLElement;
        closeBtn?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
      previousActiveElement.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: comments.length + 1,
      author: "You",
      text: newComment,
      timestamp: new Date(),
    };
    
    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleStatusChange = (newStatus: string) => {
    if (onUpdateTask) {
      onUpdateTask(task._id || task.id!, { status: newStatus });
    }
  };

  const priorityColors = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal - responsive: full width on mobile, fixed width on desktop */}
      <div 
        ref={panelRef}
        className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md md:max-w-lg lg:max-w-xl bg-bg-secondary border-l border-border overflow-y-auto animate-slide-in-right"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-detail-title"
      >
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1 min-w-0 pr-4">
              <h2 id="task-detail-title" className="text-xl sm:text-2xl font-semibold text-text-primary mb-2 truncate">
                {task.title}
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityColors[task.priority as keyof typeof priorityColors] || "bg-gray-600"} text-white`}>
                  {task.priority || "medium"}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-accent text-white capitalize">
                  {task.status.replace("_", " ")}
                </span>
              </div>
            </div>
            <button
              data-close-btn
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary transition-colors p-3 rounded-lg hover:bg-bg-tertiary focus:outline-none focus:ring-2 focus:ring-accent flex-shrink-0"
              aria-label="Close task details"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-text-secondary uppercase mb-2">
              Description
            </h3>
            <p className="text-text-primary whitespace-pre-wrap">
              {task.description}
            </p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-semibold text-text-secondary uppercase mb-2">
                Assigned To
              </h3>
              <p className="text-text-primary">
                {task.assignedTo || "Unassigned"}
              </p>
            </div>
            <div>
              <label htmlFor="status-select" className="text-sm font-semibold text-text-secondary uppercase mb-2 block">
                Status
              </label>
              <select
                id="status-select"
                value={task.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              >
                <option value="inbox">Inbox</option>
                <option value="assigned">Assigned</option>
                <option value="in_progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>

          {/* Comments */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-text-secondary uppercase mb-4">
              Comments ({comments.length})
            </h3>
            
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-bg-primary rounded-lg p-3 border border-border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-text-primary">
                      {comment.author}
                    </span>
                    <time className="text-xs text-text-muted">
                      {comment.timestamp.toLocaleString()}
                    </time>
                  </div>
                  <p className="text-text-primary text-sm">
                    {comment.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                placeholder="Add a comment..."
                className="flex-1 bg-bg-primary border border-border rounded-lg px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                aria-label="New comment"
              />
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
          </div>

          {/* Timestamps */}
          <div className="border-t border-border pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-muted">
              <div>
                <span className="font-semibold">Created:</span>{" "}
                {task.createdAt?.toLocaleString() || "Unknown"}
              </div>
              <div>
                <span className="font-semibold">Updated:</span>{" "}
                {task.updatedAt?.toLocaleString() || "Unknown"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
