# Mission Control - Visual Guide

## 🎨 UI Overview

Mission Control features a **dark editorial aesthetic** inspired by newspaper design, using a carefully crafted dark gray and blue color scheme.

---

## 🖼️ Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  Mission Control                               Sunday, Feb 1...  │  ← Header
├──────────┬──────────────────────────────────────────────┬───────┤
│          │                                              │       │
│ Sidebar  │            Main Content Area                │ Right │
│          │                                              │ Panel │
│          │  ┌─────────────────────────────────────────┐ │       │
│ • Dash   │  │                                         │ │ Agent │
│ • Tasks  │  │         Task Board (Kanban)            │ │ Cards │
│ • Agents │  │                                         │ │       │
│ • Docs   │  │  [Inbox] [Assigned] [Progress] [...]   │ │ • J.. │
│ • Setts  │  │                                         │ │ • F.. │
│          │  │   ┌───┐  ┌───┐  ┌───┐                  │ │ • W.. │
│          │  │   │ T │  │ T │  │ T │                  │ │ • V.. │
│          │  │   │ 1 │  │ 2 │  │ 3 │                  │ │ • B.. │
│          │  │   └───┘  └───┘  └───┘                  │ │       │
│          │  │                                         │ │       │
│          │  └─────────────────────────────────────────┘ │       │
│          │                                              │       │
│ Activity │                                              │       │
│ Feed     │                                              │       │
│          │                                              │       │
│ • Item 1 │                                              │       │
│ • Item 2 │                                              │       │
│ • Item 3 │                                              │       │
│ • ...    │                                              │       │
│          │                                              │       │
└──────────┴──────────────────────────────────────────────┴───────┘
```

---

## 🎨 Color Palette

### Primary Blue
```
#0073ff  ●  Main accent color
#338fff  ●  Hover state
#005acc  ●  Active state
```

### Dark Grays
```
#111827  ██  Darkest (body background)
#1f2937  ██  Dark (card background)
#374151  ██  Medium (borders)
#6b7280  ██  Light (secondary text)
#f3f4f6  ██  Lightest (primary text)
```

---

## 📦 Component Showcase

### 1. Header
```
┌─────────────────────────────────────────────────┐
│  Mission Control    |    Sunday, February 1... │
│  (Serif, Blue)      |    (Sans, Gray)          │
└─────────────────────────────────────────────────┘
```
- **Background**: Dark gray (#1f2937)
- **Title**: Merriweather serif, blue (#0073ff)
- **Date**: Inter sans-serif, gray

---

### 2. Sidebar Navigation
```
┌──────────────┐
│ Dashboard  ● │ ← Active (blue bg)
│ Tasks        │
│ Agents       │ ← Hover (gray bg)
│ Documents    │
│ Settings     │
└──────────────┘
```
- **Active**: Blue background (#0073ff)
- **Hover**: Gray background (#374151)
- **Transition**: Smooth color fade

---

### 3. Activity Feed
```
┌─────────────────────────────┐
│ Activity Feed               │
│                             │
│ │ Agent deployed frontend   │
│ │ 2 minutes ago             │
│                             │
│ │ Task moved to Done        │
│ │ 5 minutes ago             │
│                             │
│ │ API integration complete  │
│ │ 8 minutes ago             │
└─────────────────────────────┘
```
- **Left border**: Blue accent (#0073ff)
- **Message**: Light gray text
- **Timestamp**: Smaller, darker gray
- **Scrollable**: 600px max height

---

### 4. Task Board (Kanban)
```
┌──────────────────────────────────────────────────────────┐
│ Task Board                                               │
│                                                          │
│  INBOX    ASSIGNED   IN PROG    REVIEW     DONE         │
│  ┌────┐   ┌────┐    ┌────┐    ┌────┐    ┌────┐        │
│  │ T1 │   │ T4 │    │ T7 │    │ T10│    │ T12│        │
│  │ ●H │   │ ●H │    │ ●M │    │ ●L │    │ ●L │        │
│  └────┘   │ 👤 │    │ 👤 │    │ 👤 │    │ 👤 │        │
│  ┌────┐   └────┘    └────┘    └────┘    └────┘        │
│  │ T2 │   ┌────┐    ┌────┐                             │
│  │ ●M │   │ T5 │    │ T8 │                             │
│  └────┘   │ ●M │    │ ●H │                             │
│           └────┘    └────┘                             │
└──────────────────────────────────────────────────────────┘
```
- **Columns**: 5 (Inbox, Assigned, In Progress, Review, Done)
- **Task cards**: Gray background, border on hover
- **Priority dots**: ●H=Red, ●M=Yellow, ●L=Green
- **Left border**: Color-coded by priority
- **Agent icon**: 👤 Shows assigned agent

---

### 5. Agent Cards
```
┌──────────────────┐
│ Agents           │
│                  │
│ ● Jarvis         │
│   Backend Dev    │
│   Building API   │
│                  │
│ ● Friday         │
│   Frontend Dev   │
│   Creating UI    │
│                  │
│ ○ Wanda          │
│   Designer       │
│                  │
└──────────────────┘
```
- **Status dots**: ● Active (blue), ○ Idle (gray), ● Blocked (red)
- **Name**: Bold, white text
- **Role**: Smaller, gray text
- **Current task**: Even smaller, darker gray

---

### 6. Task Card Details
```
┌─────────────────────────────┐
│ ▌ Setup Convex Backend      │ ← Priority border (red)
│ ▌ Initialize Convex project │
│ ▌ and schema                │
│ ▌                           │
│ ▌ 👤 Agent Jarvis           │ ← Assigned agent
└─────────────────────────────┘
```
- **Left border**: 2px, priority color
- **Title**: Bold white
- **Description**: Gray, 2-line clamp
- **Agent**: Small text with icon
- **Hover**: Border turns blue

---

### 7. Document Panel (Bonus Component)
```
┌────────────────────────────────┐
│ Documents                      │
│                                │
│ 📋 Project Requirements  [SPEC]│
│    Functional specs...         │
│    Updated 2h ago • by Fury    │
│                                │
│ 🔌 API Documentation     [API] │
│    RESTful endpoints...        │
│    Updated 1d ago • by Jarvis  │
└────────────────────────────────┘
```
- **Icons**: Emoji for document type
- **Badges**: Color-coded by type
- **Metadata**: Author and update time

---

## 🎭 Interactive States

### Hover Effects
- **Cards**: Border color → Blue (#0073ff)
- **Text**: Color → Lighter blue (#338fff)
- **Transitions**: 200ms smooth

### Active States
- **Sidebar**: Blue background
- **Buttons**: Darker blue (#005acc)

### Focus States
- **Inputs**: Blue ring
- **Buttons**: Blue outline

---

## 📱 Responsive Breakpoints

```
Desktop (1200px+)
├─ Sidebar: 256px
├─ Activity: 25% (3 cols)
├─ Tasks: 50% (6 cols)
└─ Agents: 25% (3 cols)

Tablet (768px - 1199px)
├─ Sidebar: Collapsed
├─ Activity: 33%
├─ Tasks: 67%
└─ Agents: Hidden (drawer)

Mobile (<768px)
├─ Sidebar: Drawer
├─ Activity: Hidden (tab)
├─ Tasks: 100%
└─ Agents: Hidden (tab)
```

---

## 🌈 Semantic Colors

```css
/* Status Colors */
Success:  #10b981  (Green)
Warning:  #f59e0b  (Yellow)
Error:    #ef4444  (Red)
Info:     #0073ff  (Blue)

/* Priority Colors */
High:     #ef4444  (Red)
Medium:   #f59e0b  (Yellow)
Low:      #10b981  (Green)

/* Agent Status */
Active:   #0073ff  (Blue)
Idle:     #6b7280  (Gray)
Blocked:  #ef4444  (Red)
```

---

## ✨ Design Principles

1. **Editorial Feel**
   - Serif headings (Merriweather)
   - Sans body text (Inter)
   - Newspaper-inspired layout

2. **Dark Mode First**
   - Dark gray backgrounds
   - Light text on dark
   - Blue accents for hierarchy

3. **Consistent Spacing**
   - 4px base unit
   - 8px, 16px, 24px, 32px scale
   - Generous whitespace

4. **Visual Hierarchy**
   - Size: h1 (2xl) → h2 (xl) → h3 (lg) → body (base)
   - Weight: 700 → 600 → 500 → 400
   - Color: white → light gray → gray → dark gray

5. **Smooth Interactions**
   - 200ms transitions
   - Ease-in-out curves
   - Subtle hover effects

---

## 🎬 Animation Guide

```css
/* Transitions */
transition-colors:   200ms ease-in-out
transition-all:      200ms ease-in-out

/* Hover States */
Card border:         gray → blue
Card shadow:         none → blue glow
Text color:          gray → light blue

/* Loading States */
Skeleton:            Pulse animation
Spinner:             Rotate 360deg/1s
```

---

## 📏 Typography Scale

```
h1:  font-serif  2xl    700   Mission Control title
h2:  font-serif  xl     600   Section headings
h3:  font-serif  lg     600   Subsection headings
h4:  font-serif  base   600   Card titles
p:   font-sans   base   400   Body text
sm:  font-sans   sm     400   Metadata
xs:  font-sans   xs     400   Timestamps
```

---

## 🎯 Accessibility

- **Contrast**: WCAG AAA compliant
- **Focus**: Visible blue outline
- **Keyboard**: Full navigation support
- **Screen readers**: Semantic HTML
- **ARIA**: Labels on interactive elements

---

## 📸 Visual Testing

### Current State (Mock Data)
✅ All components visible
✅ Colors match specification
✅ Layout is balanced
✅ Hover effects work
✅ Typography is crisp

### With Real Data
⏳ Pending Convex integration
⏳ Real-time updates to test
⏳ Performance with large datasets

---

**View Live**: http://localhost:5173/  
**Build**: `npm run dev` in frontend folder
