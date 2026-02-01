import { useState } from "react";

// Loading skeleton for documents
function DocumentSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2 flex-1">
              <div className="skeleton w-6 h-6 rounded" />
              <div className="skeleton h-4 w-40 rounded" />
            </div>
            <div className="skeleton h-5 w-16 rounded" />
          </div>
          <div className="skeleton h-3 w-full rounded mb-2" />
          <div className="flex items-center justify-between">
            <div className="skeleton h-3 w-24 rounded" />
            <div className="skeleton h-3 w-20 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DocumentPanel() {
  const [isLoading] = useState(false)
  const documents = !isLoading ? getMockDocuments() : []

  return (
    <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 animate-fade-in">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-100">
        Documents
      </h2>

      {isLoading ? (
        <DocumentSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {documents?.map((doc: any) => (
            <DocumentItem key={doc._id || doc.id} document={doc} />
          ))}
        </div>
      )}
    </div>
  );
}

function DocumentItem({ document }: { document: any }) {
  const typeConfig = {
    spec: {
      badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      icon: "📋"
    },
    api: {
      badge: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      icon: "🔌"
    },
    design: {
      badge: "bg-pink-500/20 text-pink-400 border-pink-500/30",
      icon: "🎨"
    },
    notes: {
      badge: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      icon: "📝"
    },
    guide: {
      badge: "bg-green-500/20 text-green-400 border-green-500/30",
      icon: "📚"
    },
  };

  const config = typeConfig[document.type as keyof typeof typeConfig] || typeConfig.notes;

  return (
    <div
      className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-primary-500 transition-all duration-200 cursor-pointer group"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && console.log('Document clicked:', document.title)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-lg flex-shrink-0">{config.icon}</span>
          <h3 className="text-sm font-medium text-gray-100 group-hover:text-primary-400 transition-colors truncate">
            {document.title}
          </h3>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded border flex-shrink-0 ml-2 ${config.badge}`}>
          {document.type.toUpperCase()}
        </span>
      </div>

      {document.description && (
        <p className="text-xs text-gray-400 mb-2 ml-7 line-clamp-2">
          {document.description}
        </p>
      )}

      <div className="flex items-center justify-between ml-7 text-xs">
        <p className="text-gray-500">
          Updated {document.updated}
        </p>
        {document.author && (
          <p className="text-gray-600 truncate max-w-[100px]">
            by {document.author}
          </p>
        )}
      </div>
    </div>
  );
}

function getMockDocuments() {
  return [
    {
      id: 1,
      title: "Project Requirements",
      type: "spec",
      description: "Functional and technical specifications for Mission Control",
      updated: "2 hours ago",
      author: "Agent Fury"
    },
    {
      id: 2,
      title: "API Documentation",
      type: "api",
      description: "RESTful API endpoints and GraphQL schema reference",
      updated: "1 day ago",
      author: "Agent Jarvis"
    },
    {
      id: 3,
      title: "Design System",
      type: "design",
      description: "Color palette, typography, and component library",
      updated: "3 days ago",
      author: "Agent Wanda"
    },
    {
      id: 4,
      title: "Meeting Notes",
      type: "notes",
      description: "Weekly standup and sprint planning notes",
      updated: "5 days ago",
      author: "Agent Fury"
    },
    {
      id: 5,
      title: "Deployment Guide",
      type: "guide",
      description: "Step-by-step guide for deploying to production",
      updated: "1 week ago",
      author: "Agent Banner"
    },
    {
      id: 6,
      title: "Security Protocol",
      type: "spec",
      description: "Authentication, authorization, and data protection",
      updated: "1 week ago",
      author: "Agent Strange"
    },
  ];
}
