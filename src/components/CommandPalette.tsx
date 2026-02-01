import { useState, useEffect, useRef, useCallback } from 'react'
import { 
  LayoutDashboard, 
  CheckSquare, 
  Users, 
  FileText, 
  Activity, 
  Plus, 
  RefreshCw, 
  Search, 
  Palette, 
  Keyboard 
} from 'lucide-react'

// Command types
interface Command {
  id: string
  title: string
  shortcut?: string
  category: 'navigation' | 'actions' | 'settings'
  icon?: string
  iconComponent?: React.ComponentType<{ className?: string }>
  action: () => void
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (view: string) => void
}

const commands: Command[] = [
  // Navigation
  {
    id: 'nav-dashboard',
    title: 'Go to Dashboard',
    shortcut: '⌘1',
    category: 'navigation',
    iconComponent: LayoutDashboard,
    action: () => {}
  },
  {
    id: 'nav-tasks',
    title: 'Go to Task Board',
    shortcut: '⌘2',
    category: 'navigation',
    iconComponent: CheckSquare,
    action: () => {}
  },
  {
    id: 'nav-agents',
    title: 'Go to Agents',
    shortcut: '⌘3',
    category: 'navigation',
    iconComponent: Users,
    action: () => {}
  },
  {
    id: 'nav-documents',
    title: 'Go to Documents',
    shortcut: '⌘4',
    category: 'navigation',
    iconComponent: FileText,
    action: () => {}
  },
  {
    id: 'nav-activity',
    title: 'Go to Activity Feed',
    shortcut: '⌘5',
    category: 'navigation',
    iconComponent: Activity,
    action: () => {}
  },
  // Actions
  {
    id: 'action-create-task',
    title: 'Create Task',
    category: 'actions',
    iconComponent: Plus,
    action: () => {
      // Trigger task creation - will be handled by parent
      console.log('Create task triggered')
    }
  },
  {
    id: 'action-refresh-feed',
    title: 'Refresh Feed',
    shortcut: '⌘R',
    category: 'actions',
    iconComponent: RefreshCw,
    action: () => {
      window.location.reload()
    }
  },
  {
    id: 'action-search',
    title: 'Search Everything',
    shortcut: '⌘F',
    category: 'actions',
    iconComponent: Search,
    action: () => {}
  },
  // Settings
  {
    id: 'settings-theme',
    title: 'Toggle Theme',
    shortcut: '⌘⌥T',
    category: 'settings',
    iconComponent: Palette,
    action: () => {
      document.documentElement.classList.toggle('dark')
      localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light')
    }
  },
  {
    id: 'settings-shortcuts',
    title: 'Keyboard Shortcuts',
    shortcut: '⌘/',
    category: 'settings',
    iconComponent: Keyboard,
    action: () => {
      alert('Keyboard Shortcuts:\n\n⌘K - Open command palette\nEscape - Close modal/panel\n↑↓ - Navigate lists\nEnter - Select action\n⌘1-9 - Quick navigation\n⌘R - Refresh feed\n⌘⌥T - Toggle theme')
    }
  },
]

const categoryLabels: Record<string, string> = {
  navigation: 'Navigation',
  actions: 'Actions',
  settings: 'Settings',
}

export function CommandPalette({ isOpen, onClose, onNavigate }: CommandPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // Filter commands based on search query
  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Group by category
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) {
      acc[cmd.category] = []
    }
    acc[cmd.category].push(cmd)
    return acc
  }, {} as Record<string, Command[]>)

  const totalOptions = filteredCommands.length

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % totalOptions)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + totalOptions) % totalOptions)
        break
      case 'Enter':
        e.preventDefault()
        if (filteredCommands[selectedIndex]) {
          executeCommand(filteredCommands[selectedIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        onClose()
        break
    }
  }, [selectedIndex, filteredCommands, totalOptions, onClose])

  // Execute command action
  const executeCommand = (cmd: Command) => {
    // Map navigation commands to views
    const viewMap: Record<string, string> = {
      'nav-dashboard': 'dashboard',
      'nav-tasks': 'tasks',
      'nav-agents': 'agents',
      'nav-documents': 'documents',
      'nav-activity': 'activity',
    }
    
    if (viewMap[cmd.id]) {
      onNavigate(viewMap[cmd.id])
    }
    
    cmd.action()
    onClose()
  }

  // Scroll selected item into view
  useEffect(() => {
    if (isOpen && listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex, isOpen])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Palette */}
      <div className="relative w-full max-w-lg mx-4 bg-bg-primary border border-border rounded-xl shadow-2xl overflow-hidden animate-slide-down">
        {/* Search input */}
        <div className="flex items-center px-4 py-3 border-b border-border">
          <Search className="w-5 h-5 text-text-secondary mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent text-text-primary placeholder-text-muted focus:outline-none text-lg"
            aria-label="Search commands"
          />
          <kbd className="px-2 py-1 text-xs text-text-muted bg-bg-tertiary rounded border border-border">
            ESC
          </kbd>
        </div>

        {/* Commands list */}
        <ul 
          ref={listRef}
          className="max-h-[60vh] overflow-y-auto py-2"
          role="listbox"
        >
          {Object.entries(groupedCommands).map(([category, cmds]) => (
            <li key={category}>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {categoryLabels[category]}
              </div>
              <ul>
                {cmds.map((cmd) => {
                  // Calculate actual index in flat list
                  const flatIndex = filteredCommands.findIndex(c => c.id === cmd.id)
                  const isSelected = flatIndex === selectedIndex
                  
                  return (
                    <li
                      key={cmd.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => executeCommand(cmd)}
                      onMouseEnter={() => setSelectedIndex(flatIndex)}
                      className={`mx-2 px-3 py-2.5 rounded-lg cursor-pointer flex items-center gap-3 transition-colors ${
                        isSelected 
                          ? 'bg-accent/20 text-accent' 
                          : 'text-text-primary hover:bg-bg-tertiary'
                      }`}
                    >
                      {cmd.iconComponent && <cmd.iconComponent className="w-5 h-5 text-lg" />}
                      <span className="flex-1">{cmd.title}</span>
                      {cmd.shortcut && (
                        <kbd className="px-2 py-0.5 text-xs text-text-muted bg-bg-tertiary/50 rounded border border-border">
                          {cmd.shortcut}
                        </kbd>
                      )}
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
          
          {filteredCommands.length === 0 && (
            <li className="px-4 py-8 text-center text-gray-500">
              No commands found for "{searchQuery}"
            </li>
          )}
        </ul>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-border bg-bg-tertiary/50 flex items-center justify-between text-xs text-text-muted">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-bg-tertiary rounded border border-border">↑↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-bg-tertiary rounded border border-border">↵</kbd>
              Select
            </span>
          </div>
          <span>Press ⌘K to open</span>
        </div>
      </div>
    </div>
  )
}
