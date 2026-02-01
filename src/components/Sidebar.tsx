import { LayoutDashboard, CheckSquare, Users, FileText, Settings } from 'lucide-react'

interface SidebarProps {
  onNavigate?: (view: string) => void
  currentView?: string
}

export function Sidebar({ onNavigate, currentView = 'dashboard' }: SidebarProps) {
  const navItems = [
    {
      name: 'Dashboard',
      view: 'dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Tasks',
      view: 'tasks',
      icon: CheckSquare,
    },
    {
      name: 'Agents',
      view: 'agents',
      icon: Users,
    },
    {
      name: 'Documents',
      view: 'documents',
      icon: FileText,
    },
    {
      name: 'Settings',
      view: 'settings',
      icon: Settings,
    },
  ]

  return (
    <nav className="space-y-1" aria-label="Main navigation">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.name}
            onClick={() => onNavigate?.(item.view)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors duration-150 text-left ${
              currentView === item.view
                ? 'bg-accent/15 text-accent font-medium border-l-2 border-accent'
                : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary border-l-2 border-transparent'
            }`}
            aria-current={currentView === item.view ? 'page' : undefined}
            aria-label={`Navigate to ${item.name}`}
          >
            <Icon className={`w-5 h-5 ${currentView === item.view ? 'text-accent' : 'text-text-muted'}`} />
            {item.name}
          </button>
        )
      })}
    </nav>
  );
}
