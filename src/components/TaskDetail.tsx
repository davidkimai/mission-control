import { useState } from "react";

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
  task: Task;
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

  if (!isOpen) return null;

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
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-gray-800 border-l border-gray-700 z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-100 mb-2">
                {task.title}
              </h2>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority as keyof typeof priorityColors] || "bg-gray-600"} text-white`}>
                  {task.priority || "medium"}
                </span>
                <span className="px-2 py-1 rounded text-xs font-medium bg-primary-500 text-white">
                  {task.status.replace("_", " ")}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">
              Description
            </h3>
            <p className="text-gray-300">
              {task.description}
            </p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">
                Assigned To
              </h3>
              <p className="text-gray-300">
                {task.assignedTo || "Unassigned"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">
                Status
              </h3>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:border-primary-500"
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
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">
              Comments ({comments.length})
            </h3>
            
            <div className="space-y-4 mb-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-100">
                      {comment.author}
                    </span>
                    <time className="text-xs text-gray-500">
                      {comment.timestamp.toLocaleString()}
                    </time>
                  </div>
                  <p className="text-gray-300 text-sm">
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
                className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary-500"
              />
              <button
                onClick={handleAddComment}
                className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded font-medium transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Timestamps */}
          <div className="border-t border-gray-700 pt-4">
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
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
