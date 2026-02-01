import { useState, useCallback } from "react";
import { User, AlertCircle } from "lucide-react";

// Loading skeleton component
function AgentSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-bg-primary rounded-lg p-2.5 border border-border">
          <div className="flex items-center gap-2">
            <div className="skeleton w-6 h-6 rounded-full" />
            <div className="flex-1 min-w-0">
              <div className="skeleton h-4 w-20 rounded mb-0.5" />
              <div className="skeleton h-3 w-24 rounded" />
            </div>
            <div className="skeleton h-5 w-12 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Error state component
function AgentError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="text-center py-6">
      <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
        <AlertCircle className="w-5 h-5 text-red-400" />
      </div>
      <p className="text-text-secondary text-sm mb-2">Failed to load agents</p>
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
function AgentEmpty() {
  return (
    <div className="text-center py-8">
      <User className="w-10 h-10 text-text-muted mx-auto mb-2" />
      <p className="text-sm text-text-secondary">No agents available</p>
      <p className="text-xs text-text-muted mt-1 mb-3">Configure agents to get started</p>
      <a
        href="#"
        className="btn btn-secondary"
      >
        Configure agents
      </a>
    </div>
  );
}

export function AgentCards() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [agents, setAgents] = useState<any[]>(() => getMockAgents())

  const handleRetry = useCallback(() => {
    setError(null)
    setIsLoading(true)
    setTimeout(() => {
      setAgents(getMockAgents())
      setIsLoading(false)
    }, 500)
  }, [])

  return (
    <div className="bg-bg-secondary/80 backdrop-blur-sm rounded-xl p-4 border border-border/50">
      <h2 className="heading-2 mb-3">
        Agents ({agents?.length || 0})
      </h2>

      {error ? (
        <AgentError onRetry={handleRetry} />
      ) : isLoading ? (
        <AgentSkeleton />
      ) : agents.length === 0 ? (
        <AgentEmpty />
      ) : (
        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {agents?.map((agent: any) => (
            <AgentCard key={agent._id || agent.id} agent={agent} />
          ))}
        </div>
      )}
    </div>
  );
}

function AgentCard({ agent }: { agent: any }) {
  const statusConfig = {
    idle: {
      color: "bg-gray-500",
      ring: "ring-2 ring-gray-500/20",
      bgBadge: "bg-gray-500/15 text-gray-400",
      text: "text-gray-400",
      label: "Idle"
    },
    active: {
      color: "bg-accent",
      ring: "ring-2 ring-accent/30 animate-pulse-slow",
      bgBadge: "bg-accent/15 text-accent",
      text: "text-accent",
      label: "Active"
    },
    blocked: {
      color: "bg-error",
      ring: "ring-2 ring-error/20",
      bgBadge: "bg-error/15 text-error",
      text: "text-error",
      label: "Blocked"
    },
  };

  const config = statusConfig[agent.status as keyof typeof statusConfig] || statusConfig.idle;

  return (
    <div
      className="bg-bg-primary/80 rounded-lg p-2.5 border border-border/50 hover:bg-bg-primary hover:border-border/80 transition-colors duration-150 cursor-pointer group"
      role="article"
      aria-label={`Agent ${agent.name}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          console.log('Agent clicked:', agent.name);
        }
      }}
    >
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className={`w-2 h-2 rounded-full ${config.color} ${config.ring}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-text-primary truncate group-hover:text-white transition-colors">
            {agent.name}
          </h3>
          <p className="text-xs text-text-muted truncate">{agent.role}</p>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.bgBadge} flex-shrink-0`}>
          {config.label}
        </span>
      </div>
      {agent.currentTask && (
        <div className="mt-1.5 pt-1.5 border-t border-border/50">
          <p className="text-xs text-text-secondary truncate" title={agent.currentTask}>
            {agent.currentTask}
          </p>
        </div>
      )}
      {agent.tasksCompleted !== undefined && (
        <div className="mt-1.5 pt-1.5 border-t border-border/50 flex items-center justify-between text-xs">
          <span className="text-text-muted">Tasks:</span>
          <span className="text-accent font-semibold bg-accent/10 px-2 py-0.5 rounded-full">{agent.tasksCompleted}</span>
        </div>
      )}
    </div>
  );
}

function getMockAgents() {
  return [
    {
      id: 1,
      name: "Jarvis",
      role: "Backend Developer",
      status: "active",
      currentTask: "Building API endpoints for task management",
      tasksCompleted: 47
    },
    {
      id: 2,
      name: "Friday",
      role: "Frontend Developer",
      status: "active",
      currentTask: "Creating responsive UI components",
      tasksCompleted: 52
    },
    {
      id: 3,
      name: "Wanda",
      role: "UX Designer",
      status: "idle",
      currentTask: null,
      tasksCompleted: 31
    },
    {
      id: 4,
      name: "Vision",
      role: "QA Engineer",
      status: "active",
      currentTask: "Testing authentication flow and edge cases",
      tasksCompleted: 38
    },
    {
      id: 5,
      name: "Banner",
      role: "DevOps Engineer",
      status: "idle",
      currentTask: null,
      tasksCompleted: 29
    },
    {
      id: 6,
      name: "Thor",
      role: "Database Admin",
      status: "active",
      currentTask: "Optimizing query performance",
      tasksCompleted: 41
    },
    {
      id: 7,
      name: "Stark",
      role: "Architect",
      status: "active",
      currentTask: "Designing microservices architecture",
      tasksCompleted: 35
    },
    {
      id: 8,
      name: "Parker",
      role: "Mobile Developer",
      status: "idle",
      currentTask: null,
      tasksCompleted: 22
    },
    {
      id: 9,
      name: "Strange",
      role: "Security Engineer",
      status: "blocked",
      currentTask: "Waiting for security audit approval",
      tasksCompleted: 27
    },
    {
      id: 10,
      name: "Fury",
      role: "Product Manager",
      status: "active",
      currentTask: "Planning Q2 roadmap and sprint goals",
      tasksCompleted: 44
    },
  ];
}
