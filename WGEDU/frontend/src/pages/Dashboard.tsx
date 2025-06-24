import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import StudentDashboard from '@/components/StudentDashboard';
import ParentDashboard from '@/components/ParentDashboard';
import TeacherDashboard from '@/components/TeacherDashboard';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // This should never happen due to ProtectedRoute
  }

  // Redirect admin users to the admin dashboard
  if (user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard />;
      case 'parent':
        return <ParentDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      default:
        return <div>Invalid user role</div>;
    }
  };

  return (
    <Layout>
      {renderDashboard()}
    </Layout>
  );
};

export default Dashboard; 