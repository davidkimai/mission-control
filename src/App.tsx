import { useState, useEffect } from 'react'
import { Sidebar } from './components/Sidebar'
import { ActivityFeed } from './components/ActivityFeed'
import { TaskBoard } from './components/TaskBoard'
import { AgentCards } from './components/AgentCards'
import { DocumentPanel } from './components/DocumentPanel'
import { CommandPalette } from './components/CommandPalette'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [currentView, setCurrentView] = useState('dashboard')

  // View mapping for quick navigation shortcuts
  const viewShortcuts: Record<string, string> = {
    '1': 'dashboard',
    '2': 'tasks',
    '3': 'agents',
    '4': 'documents',
    '5': 'activity',
  }

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K - Open command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(prev => !prev)
        return
      }

      // ⌘1-5 or Ctrl+1-5 - Quick navigation
      if ((e.metaKey || e.ctrlKey) && viewShortcuts[e.key]) {
        e.preventDefault()
        setCurrentView(viewShortcuts[e.key])
        return
      }

      // Escape - Close modals/panels
      if (e.key === 'Escape') {
        if (commandPaletteOpen) {
          setCommandPaletteOpen(false)
        } else if (sidebarOpen) {
          setSidebarOpen(false)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [commandPaletteOpen, sidebarOpen])

  // Close sidebar when navigating on mobile
  const handleNavigate = (view: string) => {
    setCurrentView(view)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary"
      >
        Skip to main content
      </a>

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
      />
      {/* Header */}
      <header className="sticky top-0 z-30 bg-bg-primary/95 backdrop-blur-sm border-b border-border px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-bg-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary"
              aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              aria-expanded={sidebarOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Mission Control
            </h1>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Command palette trigger hint */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary bg-bg-tertiary/50 border border-border rounded-lg hover:bg-bg-tertiary hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary"
            >
              <span className="text-text-muted">Search & commands</span>
              <kbd className="px-1.5 py-0.5 text-xs bg-bg-tertiary rounded border border-border">⌘K</kbd>
            </button>
            <span className="text-xs sm:text-sm text-text-secondary hidden sm:block">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="text-xs text-text-secondary sm:hidden">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-20 lg:hidden transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed lg:relative z-30 lg:z-auto w-64 bg-bg-primary border-r border-border p-4 sm:p-6 transition-transform duration-300 lg:translate-x-0 lg:block h-[calc(100vh-64px)] lg:h-screen overflow-y-auto scrollbar-shift scrollbar-thumb-border scrollbar-track-transparent`}
          role="navigation"
          aria-label="Main navigation"
        >
          <Sidebar currentView={currentView} onNavigate={handleNavigate} />
        </aside>

        {/* Main Content */}
        <main id="main-content" className="flex-1 p-4 sm:p-6 min-w-0" tabIndex={-1}>
          {/* Desktop: 3-column layout - Activity | TaskBoard | Agents + Documents */}
          <div className="hidden lg:grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <ActivityFeed />
            </div>
            <div className="col-span-6">
              <TaskBoard />
            </div>
            <div className="col-span-3 space-y-6">
              <AgentCards />
              <DocumentPanel />
            </div>
          </div>

          {/* Tablet: 2-column layout - Activity+Documents | TaskBoard+Agents */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
            <div className="space-y-4">
              <ActivityFeed />
            </div>
            <div className="space-y-4">
              <AgentCards />
              <DocumentPanel />
            </div>
          </div>

          {/* Mobile: Stacked layout */}
          <div className="md:hidden space-y-4">
            <ActivityFeed />
            <AgentCards />
            <DocumentPanel />
          </div>

          {/* Task Board - Main content area for all sizes */}
          <div className="mt-4 lg:mt-6">
            <TaskBoard />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
