import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { DockNavigation, DockItem } from '@/components/DockNavigation';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { 
  House, 
  Calendar, 
  ChatCircle, 
  User, 
  Book,
  CreditCard,
  Users,
  ClipboardText,
  SignOut,
  Gear,
  ChartBar,
  Coins,
  Student
} from '@phosphor-icons/react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleCalendarClick = () => {
    navigate('/calendar');
  };
  
  const handleBalanceClick = () => {
    navigate('/balance');
  };
  
  const handleAdminClick = () => {
    navigate('/admin');
  };

  const getDockItems = (): DockItem[] => {
    const baseItems: DockItem[] = [
      {
        title: t('navigation.home'),
        icon: <House weight="fill" className="h-full w-full" />,
        href: "/",
        onClick: () => navigate('/')
      },
    ];

    if (user?.role === 'student') {
      return [
        ...baseItems,
        {
          title: t('navigation.schedule'),
          icon: <Calendar weight="fill" className="h-full w-full" />,
          href: "#schedule",
          onClick: handleCalendarClick
        },
        {
          title: t('navigation.assignments'),
          icon: <ClipboardText weight="fill" className="h-full w-full" />,
          href: "#assignments",
        },
        {
          title: t('navigation.messages'),
          icon: <ChatCircle weight="fill" className="h-full w-full" />,
          href: "#messages",
        },
        {
          title: t('navigation.settings'),
          icon: <Gear weight="fill" className="h-full w-full" />,
          href: "#settings",
          onClick: handleSettingsClick
        },
        {
          title: t('navigation.logout'),
          icon: <SignOut weight="fill" className="h-full w-full" />,
          href: "#logout",
          onClick: handleLogout
        },
      ];
    } else if (user?.role === 'parent') {
      return [
        ...baseItems,
        {
          title: t('navigation.children'),
          icon: <Users weight="fill" className="h-full w-full" />,
          href: "#children",
        },
        {
          title: t('navigation.balance'),
          icon: <CreditCard weight="fill" className="h-full w-full" />,
          href: "/balance",
          onClick: handleBalanceClick
        },
        {
          title: t('navigation.messages'),
          icon: <ChatCircle weight="fill" className="h-full w-full" />,
          href: "#messages",
        },
        {
          title: t('navigation.settings'),
          icon: <Gear weight="fill" className="h-full w-full" />,
          href: "#settings",
          onClick: handleSettingsClick
        },
        {
          title: t('navigation.logout'),
          icon: <SignOut weight="fill" className="h-full w-full" />,
          href: "#logout",
          onClick: handleLogout
        },
      ];
    } else if (user?.role === 'teacher') {
      return [
        ...baseItems,
        {
          title: t('navigation.classes'),
          icon: <Book weight="fill" className="h-full w-full" />,
          href: "#classes",
        },
        {
          title: t('navigation.calendar'),
          icon: <Calendar weight="fill" className="h-full w-full" />,
          href: "#calendar",
          onClick: handleCalendarClick
        },
        {
          title: t('navigation.students'),
          icon: <Users weight="fill" className="h-full w-full" />,
          href: "#students",
        },
        {
          title: t('navigation.assignments'),
          icon: <ClipboardText weight="fill" className="h-full w-full" />,
          href: "#assignments",
        },
        {
          title: t('navigation.messages'),
          icon: <ChatCircle weight="fill" className="h-full w-full" />,
          href: "#messages",
        },
        {
          title: t('navigation.settings'),
          icon: <Gear weight="fill" className="h-full w-full" />,
          href: "#settings",
          onClick: handleSettingsClick
        },
        {
          title: t('navigation.logout'),
          icon: <SignOut weight="fill" className="h-full w-full" />,
          href: "#logout",
          onClick: handleLogout
        },
      ];
    } else if (user?.role === 'admin') {
      return [
        {
          title: t('navigation.dashboard') || 'Dashboard',
          icon: <ChartBar weight="fill" className="h-full w-full" />,
          href: "/admin",
          onClick: handleAdminClick
        },
        {
          title: t('navigation.students') || 'Students',
          icon: <Student weight="fill" className="h-full w-full" />,
          href: "#students",
          onClick: handleAdminClick
        },
        {
          title: t('navigation.classes') || 'Classes',
          icon: <Book weight="fill" className="h-full w-full" />,
          href: "#classes",
          onClick: handleAdminClick
        },
        {
          title: t('navigation.finances') || 'Finances',
          icon: <Coins weight="fill" className="h-full w-full" />,
          href: "#finances",
          onClick: handleAdminClick
        },
        {
          title: t('navigation.calendar') || 'Calendar',
          icon: <Calendar weight="fill" className="h-full w-full" />,
          href: "/calendar",
          onClick: handleCalendarClick
        },
        {
          title: t('navigation.settings'),
          icon: <Gear weight="fill" className="h-full w-full" />,
          href: "/settings",
          onClick: handleSettingsClick
        },
        {
          title: t('navigation.logout'),
          icon: <SignOut weight="fill" className="h-full w-full" />,
          href: "#logout",
          onClick: handleLogout
        },
      ];
    }

    return baseItems;
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-neutral-900 font-sans overflow-hidden">
      <header className="border-b border-gray-100 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm sticky top-0 z-40 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-pastel-blue dark:text-pastel-blue tracking-tight">WG Education</h1>
              {user && (
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="h-6 w-px bg-gray-200 dark:bg-neutral-700"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                    {user.name}
                  </span>
                  <span className="text-xs text-pastel-blue dark:text-pastel-blue px-2 py-1 bg-pastel-blue/10 dark:bg-pastel-blue/20 rounded-full capitalize">
                    {user.role}
                  </span>
                </div>
              )}
            </div>
            {user && (
              <div className="flex items-center space-x-2">
                <LanguageSwitcher />
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-pastel-blue hover:text-pastel-purple hover:bg-pastel-blue/10 border-0 rounded-xl"
                >
                  <User weight="fill" className="h-4 w-4 mr-2" />
                  {t('common.signOut')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden px-4 lg:px-6 py-4 pb-16">
        <div className="max-w-7xl mx-auto h-full">
          {children}
        </div>
      </main>

      {user && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <DockNavigation
            items={getDockItems()}
            desktopClassName="bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm border border-gray-200/30 dark:border-neutral-700/30 shadow-sm rounded-lg w-auto"
            mobileClassName="rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Layout;
