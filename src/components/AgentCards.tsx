import { useState } from "react";

// Loading skeleton component
function AgentSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-gray-900 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="skeleton w-8 h-8 rounded-full" />
            <div className="flex-1 min-w-0">
              <div className="skeleton h-4 w-24 rounded mb-1" />
              <div className="skeleton h-3 w-32 rounded" />
            </div>
            <div className="skeleton h-5 w-14 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function AgentCards() {
  const [isLoading] = useState(false)
  const agents = !isLoading ? getMockAgents() : []

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 animate-fade-in">
      <h2 className="text-lg font-semibold mb-4 text-gray-100">
        Agents ({agents?.length || 0})
      </h2>

      {isLoading ? (
        <AgentSkeleton />
      ) : (
        <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1 scrollbar-thin">
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
      color: "bg-gray-600",
      ring: "",
      text: "text-gray-400"
    },
    active: {
      color: "bg-primary-500",
      ring: "ring-4 ring-primary-500/20 animate-pulse",
      text: "text-primary-400"
    },
    blocked: {
      color: "bg-red-500",
      ring: "ring-4 ring-red-500/20",
      text: "text-red-400"
    },
  };

  const config = statusConfig[agent.status as keyof typeof statusConfig] || statusConfig.idle;

  return (
    <div
      className="bg-gray-900 rounded-lg p-3 border border-gray-700 hover:border-primary-400 transition-all duration-200 cursor-pointer group"
      role="article"
      aria-label={`Agent ${agent.name}`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className={`w-2 h-2 rounded-full ${config.color} ${config.ring}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-100 truncate group-hover:text-primary-400 transition-colors">
            {agent.name}
          </h3>
          <p className="text-xs text-gray-500 truncate">{agent.role}</p>
        </div>
        <span className={`text-xs font-medium ${config.text} uppercase`}>
          {agent.status}
        </span>
      </div>
      {agent.currentTask && (
        <div className="mt-2 pt-2 border-t border-gray-700">
          <p className="text-xs text-gray-400 truncate" title={agent.currentTask}>
            {agent.currentTask}
          </p>
        </div>
      )}
      {agent.tasksCompleted !== undefined && (
        <div className="mt-2 pt-2 border-t border-gray-700 flex items-center justify-between text-xs">
          <span className="text-gray-500">Tasks completed:</span>
          <span className="text-primary-400 font-semibold">{agent.tasksCompleted}</span>
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
