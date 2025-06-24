import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import AdminDashboardComponent from '@/components/AdminDashboard';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

const AdminDashboardPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  // Only allow admin users to access this page
  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{t('admin.pageTitle') || 'Admin Dashboard'}</title>
      </Helmet>
      <AdminDashboardComponent />
    </>
  );
};

export default AdminDashboardPage; 