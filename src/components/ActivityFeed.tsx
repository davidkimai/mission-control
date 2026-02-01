import { useState, useCallback } from "react";
import { Activity, Clock, AlertCircle } from "lucide-react";

// Loading skeleton component
function ActivitySkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border-l-2 border-accent/30 pl-3 py-1">
          <div className="skeleton h-4 w-full rounded mb-1" />
          <div className="skeleton h-3 w-12 rounded" />
        </div>
      ))}
    </div>
  );
}

// Error state component
function ActivityError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="text-center py-6">
      <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
        <AlertCircle className="w-5 h-5 text-error" />
      </div>
      <p className="text-text-secondary text-sm mb-2">Failed to load activities</p>
      <button
        onClick={onRetry}
        className="btn btn-secondary"
      >
        Try Again
      </button>
    </div>
  );
}

// Empty state component
function ActivityEmpty() {
  return (
    <div className="text-center py-8">
      <Activity className="w-10 h-10 text-text-muted mx-auto mb-2" />
      <p className="text-sm text-text-secondary">No recent activity</p>
      <p className="text-xs text-text-muted mt-1">Activities will appear here</p>
    </div>
  );
}

export function ActivityFeed() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activities, setActivities] = useState<any[]>(() => getMockActivities())

  const handleRetry = useCallback(() => {
    setError(null)
    setIsLoading(true)
    setTimeout(() => {
      setActivities(getMockActivities())
      setIsLoading(false)
    }, 500)
  }, [])

  return (
    <div className="bg-bg-secondary/80 backdrop-blur-sm rounded-xl p-4 border border-border/50">
      <h2 className="heading-2 mb-3">
        Activity Feed
      </h2>

      {error ? (
        <ActivityError onRetry={handleRetry} />
      ) : isLoading ? (
        <ActivitySkeleton />
      ) : activities.length === 0 ? (
        <ActivityEmpty />
      ) : (
        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
          {activities?.map((activity: any) => (
            <ActivityItem key={activity._id || activity.id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
}

function ActivityItem({ activity }: { activity: any }) {
  const timeAgo = getTimeAgo(activity.timestamp || Date.now())
  const formattedDate = new Date(activity.timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })

  return (
    <div className="text-sm border-l-2 border-accent/60 pl-2.5 py-1.5 hover:bg-bg-tertiary/50 rounded-r-lg transition-colors duration-150 group">
      <p className="text-text-primary group-hover:text-white mb-1">{activity.message}</p>
      <div className="flex items-center gap-1.5">
        <Clock className="w-3 h-3 text-text-muted" />
        <time 
          className="text-xs text-text-secondary font-medium" 
          dateTime={new Date(activity.timestamp).toISOString()}
          title={formattedDate}
        >
          {timeAgo}
        </time>
      </div>
    </div>
  );
}

function getTimeAgo(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

function getMockActivities() {
  const now = Date.now()
  return [
    { id: 1, message: "Agent Friday deployed frontend to production", timestamp: now - 2 * 60 * 1000 },
    { id: 2, message: "Task 'Build UI components' moved to Done", timestamp: now - 5 * 60 * 1000 },
    { id: 3, message: "Agent Jarvis completed API endpoint integration", timestamp: now - 8 * 60 * 1000 },
    { id: 4, message: "Agent Wanda uploaded new design assets", timestamp: now - 12 * 60 * 1000 },
    { id: 5, message: "Code review approved for PR #127", timestamp: now - 18 * 60 * 1000 },
    { id: 6, message: "Agent Vision started testing authentication flow", timestamp: now - 25 * 60 * 1000 },
    { id: 7, message: "Task 'Setup Convex backend' assigned to Jarvis", timestamp: now - 32 * 60 * 1000 },
    { id: 8, message: "Agent Banner configured CI/CD pipeline", timestamp: now - 45 * 60 * 1000 },
    { id: 9, message: "Database migration completed successfully", timestamp: now - 58 * 60 * 1000 },
    { id: 10, message: "Agent Friday created new branch: feature/task-board", timestamp: now - 72 * 60 * 1000 },
    { id: 11, message: "Design system documentation updated", timestamp: now - 95 * 60 * 1000 },
    { id: 12, message: "Agent Jarvis merged PR #124 into main", timestamp: now - 110 * 60 * 1000 },
  ];
}
