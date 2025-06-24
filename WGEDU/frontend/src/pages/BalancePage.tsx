import Layout from '@/components/Layout';
import ParentBalanceUI from '@/components/ParentBalanceUI';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

const BalancePage = () => {
  const { user } = useAuth();

  // Redirect non-parent users
  if (user && user.role !== 'parent') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Layout>
      <ParentBalanceUI />
    </Layout>
  );
};

export default BalancePage; 