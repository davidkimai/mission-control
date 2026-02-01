import { useState, useCallback } from "react";
import { FileText, Code, Palette, StickyNote, Book } from "lucide-react";

// Loading skeleton for documents
function DocumentSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-bg-primary rounded-lg p-3 border border-border">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2 flex-1">
              <div className="skeleton w-5 h-5 rounded" />
              <div className="skeleton h-4 w-32 rounded" />
            </div>
            <div className="skeleton h-5 w-12 rounded" />
          </div>
          <div className="skeleton h-3 w-full rounded mb-2" />
          <div className="flex items-center justify-between">
            <div className="skeleton h-3 w-20 rounded" />
            <div className="skeleton h-3 w-16 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Error state component
function DocumentError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="text-center py-6">
      <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
        <svg className="w-5 h-5 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <p className="text-text-secondary text-sm mb-2">Failed to load documents</p>
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
function DocumentEmpty() {
  return (
    <div className="text-center py-8">
      <FileText className="w-10 h-10 text-text-muted mx-auto mb-3" />
      <p className="text-text-secondary text-sm">No documents found</p>
      <p className="text-text-muted text-xs mt-1 mb-4">Upload your first document to get started</p>
      <button
        onClick={() => console.log('Upload document clicked')}
        className="btn btn-primary"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        Upload document
      </button>
    </div>
  );
}

export function DocumentPanel() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [documents, setDocuments] = useState<any[]>(() => getMockDocuments())

  const handleRetry = useCallback(() => {
    setError(null)
    setIsLoading(true)
    setTimeout(() => {
      setDocuments(getMockDocuments())
      setIsLoading(false)
    }, 500)
  }, [])

  return (
    <div className="bg-bg-secondary/80 backdrop-blur-sm rounded-xl p-4 border border-border/50">
      <h2 className="heading-2 mb-4">
        Documents
      </h2>

      {error ? (
        <DocumentError onRetry={handleRetry} />
      ) : isLoading ? (
        <DocumentSkeleton />
      ) : documents.length === 0 ? (
        <DocumentEmpty />
      ) : (
        <div className="space-y-2">
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
      icon: FileText
    },
    api: {
      badge: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      icon: Code
    },
    design: {
      badge: "bg-pink-500/20 text-pink-400 border-pink-500/30",
      icon: Palette
    },
    notes: {
      badge: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      icon: StickyNote
    },
    guide: {
      badge: "bg-green-500/20 text-green-400 border-green-500/30",
      icon: Book
    },
  };

  const config = typeConfig[document.type as keyof typeof typeConfig] || typeConfig.notes;
  const Icon = config.icon

  const handleClick = () => {
    console.log('Document clicked:', document.title);
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className="bg-bg-primary/60 rounded-lg p-3 border border-border/50 hover:bg-bg-primary hover:border-border/80 transition-colors duration-150 cursor-pointer group"
      role="button"
      tabIndex={0}
      aria-label={`Open ${document.title}`}
    >
      <div className="flex items-start justify-between mb-1">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Icon className="w-4 h-4 flex-shrink-0 text-text-secondary group-hover:text-white transition-colors" />
          <h3 className="text-sm font-medium text-text-primary group-hover:text-white transition-colors truncate">
            {document.title}
          </h3>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded border flex-shrink-0 ml-2 ${config.badge}`}>
          {document.type.toUpperCase()}
        </span>
      </div>

      {document.description && (
        <p className="text-xs text-text-secondary mb-2 ml-6 line-clamp-2">
          {document.description}
        </p>
      )}

      <div className="flex items-center justify-between ml-6 text-xs">
        <p className="text-text-muted">
          Updated {document.updated}
        </p>
        {document.author && (
          <p className="text-text-muted truncate max-w-[80px]">
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
