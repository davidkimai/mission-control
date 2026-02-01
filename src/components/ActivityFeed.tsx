import { useState } from "react";

// Loading skeleton component
function ActivitySkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border-l-2 border-primary-500/30 pl-3 py-2">
          <div className="skeleton h-4 w-full rounded mb-2" />
          <div className="skeleton h-3 w-20 rounded" />
        </div>
      ))}
    </div>
  );
}

export function ActivityFeed() {
  const [isLoading] = useState(false)
  const activities = !isLoading ? getMockActivities() : []

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 animate-fade-in">
      <h2 className="text-lg font-semibold mb-4 text-gray-100">
        Activity Feed
      </h2>

      {isLoading ? (
        <ActivitySkeleton />
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
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

  return (
    <div className="text-sm border-l-2 border-primary-500 pl-3 py-2 hover:bg-gray-700/50 rounded-r transition-colors duration-200">
      <p className="text-gray-300">{activity.message}</p>
      <time className="text-gray-500 text-xs" dateTime={new Date(activity.timestamp).toISOString()}>
        {timeAgo}
      </time>
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
