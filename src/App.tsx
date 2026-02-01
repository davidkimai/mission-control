import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { ActivityFeed } from './components/ActivityFeed'
import { TaskBoard } from './components/TaskBoard'
import { AgentCards } from './components/AgentCards'
import { DocumentPanel } from './components/DocumentPanel'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-gray-800/95 backdrop-blur-sm border-b border-gray-700 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl sm:text-2xl font-serif text-primary-500">
              Mission Control
            </h1>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-xs sm:text-sm text-gray-400 hidden sm:block">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="text-xs text-gray-400 sm:hidden">
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
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed lg:relative z-30 lg:z-auto w-64 bg-gray-800 border-r border-gray-700 p-4 sm:p-6 transition-transform duration-300 lg:translate-x-0 lg:block h-[calc(100vh-64px)] lg:h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent`}
        >
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 min-w-0">
          {/* Desktop: 3-column layout */}
          <div className="hidden lg:grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <ActivityFeed />
            </div>
            <div className="col-span-6">
              <TaskBoard />
            </div>
            <div className="col-span-3">
              <AgentCards />
            </div>
          </div>

          {/* Tablet: 2-column layout */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
            <div>
              <ActivityFeed />
            </div>
            <div>
              <AgentCards />
            </div>
          </div>

          {/* Mobile: Stacked layout */}
          <div className="md:hidden space-y-4">
            <ActivityFeed />
            <AgentCards />
          </div>

          {/* Task Board - visible on all sizes */}
          <div className="mt-4 lg:mt-6">
            <TaskBoard />
          </div>

          {/* Documents Section */}
          <div className="mt-4 lg:mt-6">
            <DocumentPanel />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
