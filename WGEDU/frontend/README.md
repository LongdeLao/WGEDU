
# WGEducation Dashboard

A modern, responsive tuition center management system built with React, TypeScript, and Tailwind CSS. Features a clean, minimalist design inspired by Notion with role-based dashboards for students, parents, and teachers.

## 🚀 Features

### 🎨 Modern Design
- **Notion-inspired UI**: Clean, minimalist white theme with black accents
- **Custom Typography**: Inter font for enhanced readability
- **Transparent Floating Dock**: Smooth animations with backdrop blur effects
- **Responsive Layout**: Desktop-first design with mobile compatibility

### 👥 Role-Based Dashboards

#### 🎓 Student Dashboard
- **Quick Stats**: Overview of classes, pending tasks, completed assignments, and messages
- **Homework Panel**: Prioritized view of assignments due soon
- **Today's Schedule**: Upcoming classes with teacher information
- **Quick Messaging**: Direct communication with teachers
- **Recent Announcements**: Latest updates from instructors

#### 👨‍👩‍👧 Parent Dashboard
- **Financial Overview**: Balance tracking with detailed transaction history
- **Child Progress**: Academic status and assignment tracking
- **Payment Monitoring**: $50 per class deduction system
- **Communication Hub**: Direct messaging with teachers and administration
- **Real-time Updates**: Live tracking of child's academic performance

#### 👨‍🏫 Teacher Dashboard
- **Class Management**: Schedule overview and student enrollment
- **Assignment Creation**: Easy-to-use form for creating and managing assignments
- **Student Overview**: Organized view of students by class
- **Communication Center**: Messaging system for students and parents
- **Today's Schedule**: Quick view of daily teaching schedule

### 🎛️ Interactive Elements
- **Floating Navigation**: Aceternity-style floating dock with smooth hover animations
- **Informative Panels**: Card-based layout with clear data visualization
- **Real-time Updates**: Dynamic content updates without page refresh
- **Intuitive Icons**: Lucide React icons for clear visual communication

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui component library
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React + Tabler Icons
- **Build Tool**: Vite for fast development and building
- **State Management**: React hooks with local state

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Shadcn/ui components
│   ├── FloatingDock.tsx       # Navigation dock component
│   ├── Layout.tsx             # Main layout wrapper
│   ├── LoginForm.tsx          # Authentication form
│   ├── StudentDashboard.tsx   # Student role dashboard
│   ├── ParentDashboard.tsx    # Parent role dashboard
│   └── TeacherDashboard.tsx   # Teacher role dashboard
├── hooks/
│   └── useAuth.tsx            # Authentication hook
├── pages/
│   ├── Index.tsx              # Main application page
│   └── NotFound.tsx           # 404 error page
├── types/
│   └── index.ts               # TypeScript type definitions
├── lib/
│   └── utils.ts               # Utility functions
└── styles/
    └── index.css              # Global styles and design system
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wgeducation-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Test Accounts

Use these credentials to test different user roles:

| Role | Username | Password |
|------|----------|----------|
| Student | `test_student` | `test_student` |
| Parent | `test_parent` | `test_parent` |
| Teacher | `test_teacher` | `test_teacher` |

## 🎨 Design System

### Colors
- **Primary**: Clean whites and grays
- **Accents**: Minimal black elements
- **Status Colors**: 
  - Blue: Information and primary actions
  - Green: Positive states and balances
  - Orange: Warnings and pending items
  - Red: Negative values and urgent items
  - Purple: Communication and messages

### Typography
- **Font Family**: Inter (300, 400, 500, 600, 700 weights)
- **Hierarchy**: Clear heading and body text distinction
- **Readability**: Optimized line heights and spacing

### Components
- **Cards**: Subtle borders with hover effects
- **Buttons**: Consistent styling with hover states
- **Forms**: Clean inputs with proper validation states
- **Navigation**: Transparent floating dock with animations

## 🔧 Customization

### Adding New Features
1. Create new components in `src/components/`
2. Define types in `src/types/index.ts`
3. Add routing in `src/App.tsx`
4. Style with Tailwind CSS classes

### Modifying the Design
1. Update color variables in `src/index.css`
2. Modify component styles using Tailwind classes
3. Adjust animations in `tailwind.config.ts`

### Adding New User Roles
1. Update `User` type in `src/types/index.ts`
2. Add new dashboard component
3. Update authentication logic in `src/hooks/useAuth.tsx`
4. Add routing in `src/pages/Index.tsx`

## 📱 Responsive Design

The application is built with a desktop-first approach but includes responsive breakpoints:

- **Desktop**: Full feature set with multi-column layouts
- **Tablet**: Responsive grid adjustments
- **Mobile**: Collapsible navigation and stacked layouts

## 🔒 Security Notes

⚠️ **Important**: This is a demo application with mock authentication. For production use:

- Implement proper authentication with JWT tokens
- Add input validation and sanitization
- Use HTTPS for all communications
- Implement proper error handling
- Add rate limiting for API calls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Shadcn/ui**: For the excellent component library
- **Tailwind CSS**: For the utility-first CSS framework
- **Framer Motion**: For smooth animations
- **Lucide**: For beautiful icons
- **Aceternity**: For floating dock inspiration

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

Built with ❤️ for WGEducation
