
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import LoginForm from '@/components/LoginForm';
import StudentDashboard from '@/components/StudentDashboard';
import ParentDashboard from '@/components/ParentDashboard';
import TeacherDashboard from '@/components/TeacherDashboard';

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm />;
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

export default Index;
