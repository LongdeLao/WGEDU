import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Gear, 
  User,
  Translate, 
  PaintBrush, 
  Moon,
  Sun,
  Bell,
  Password,
  DeviceMobile,
  Check,
  Shield,
  Desktop
} from "@phosphor-icons/react";
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: `${user?.username}@example.com`,
    username: user?.username || '',
  });
  
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailAssignments: true,
    emailMessages: true,
    emailAnnouncements: false,
    pushNotifications: true,
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast({
      title: t('settings.profileUpdated'),
      description: t('settings.profileUpdatedDesc'),
    });
    
    setIsLoading(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast({
        title: t('settings.passwordsNotMatch'),
        description: t('settings.passwordsNotMatchDesc'),
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast({
      title: t('settings.passwordChanged'),
      description: t('settings.passwordChangedDesc'),
    });
    
    setPasswords({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    
    setIsLoading(false);
  };

  const handleNotificationChange = async () => {
    toast({
      title: t('settings.notificationsUpdated'),
      description: t('settings.notificationsUpdatedDesc'),
    });
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // Map for navigation tabs with their labels to avoid translation missing errors
  const tabLabels = {
    profile: t('settings.profile') || 'Profile',
    security: 'Security', // Using direct string as fallback
    notifications: t('settings.notifications') || 'Notifications',
    appearance: t('settings.appearance') || 'Appearance',
    language: t('settings.language.title') || 'Language'
  };

  // Map for theme labels to avoid translation missing errors
  const themeLabels = {
    light: 'Light',
    dark: 'Dark',
    system: 'System'
  };

  // Color mapping for tab icons
  const iconColors = {
    profile: "#5661b3",
    security: "#b35661",
    notifications: "#b39256",
    appearance: "#8c56b3",
    language: "#56b374"
  };

  // Background colors for tab icons
  const iconBgColors = {
    profile: "#e9ecf5",
    security: "#f5e9ec",
    notifications: "#f5efe9",
    appearance: "#eee9f5",
    language: "#e9f5ec"
  };

  return (
    <div className="container mx-auto max-w-6xl p-6 bg-[#f8f9fa] dark:bg-[#1a1d23]">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#333c4d] dark:text-[#e5e7eb]">{t('settings.title')}</h1>
          <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mt-1">{t('settings.subtitle')}</p>
        </div>
        <Badge 
          variant="outline" 
          className="bg-[#eef1f8] text-[#5661b3] border-[#dce0ef] dark:bg-[#2d3748] dark:text-[#a5b4fc] dark:border-[#4b5563] rounded-lg px-3 py-1 text-sm"
        >
          {user?.role}
        </Badge>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* Profile Card */}
        <div className="col-span-12 lg:col-span-4">
          <Card className="overflow-hidden border-none rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] dark:bg-[#252a34] h-full">
            <div className="bg-gradient-to-r from-[#f1f3f9] to-white dark:from-[#252a34] dark:to-[#1e2128] p-6 flex flex-col items-center border-b border-[#eaeef3] dark:border-[#343a46]">
              <Avatar className="h-24 w-24 border-4 border-white dark:border-[#343a46] shadow-md mb-4">
                <AvatarFallback className="text-xl bg-[#e9ecf5] dark:bg-[#343a46] text-[#5661b3] dark:text-[#a5b4fc]">
                  {user?.name?.charAt(0) || user?.username?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold text-[#333c4d] dark:text-white">{profile.name}</h2>
              <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">{profile.email}</p>
            </div>
            <CardContent className="p-6">
              <nav className="space-y-2">
                <div className="w-full flex flex-col space-y-2">
                  {[
                    { value: "profile", icon: <User className="h-4 w-4" /> },
                    { value: "security", icon: <Shield className="h-4 w-4" /> },
                    { value: "notifications", icon: <Bell className="h-4 w-4" /> },
                    { value: "appearance", icon: <PaintBrush className="h-4 w-4" /> },
                    { value: "language", icon: <Translate className="h-4 w-4" /> }
                  ].map((item) => (
                    <Button 
                      key={item.value}
                      variant="ghost"
                      className={`w-full justify-start py-3 px-4 rounded-lg h-auto transition-all ${
                        activeTab === item.value 
                        ? `bg-[${iconBgColors[item.value as keyof typeof iconBgColors]}] dark:bg-[#343a46] text-[${iconColors[item.value as keyof typeof iconColors]}] dark:text-white`
                        : 'hover:bg-[#f1f3f9] dark:hover:bg-[#343a46] text-[#6b7280] dark:text-[#9ca3af]'
                      }`}
                      onClick={() => setActiveTab(item.value)}
                    >
                      <div className="flex items-center">
                        <div 
                          className={`h-7 w-7 rounded-md flex items-center justify-center mr-3 ${
                            activeTab === item.value
                            ? `bg-white dark:bg-[#252a34] text-[${iconColors[item.value as keyof typeof iconColors]}] dark:text-white`
                            : 'text-[#6b7280] dark:text-[#9ca3af]'
                          }`}
                        >
                          {item.icon}
                        </div>
                        <span className={activeTab === item.value ? `text-[#333c4d] dark:text-white font-medium` : `text-[#6b7280] dark:text-[#9ca3af]`}>
                          {tabLabels[item.value as keyof typeof tabLabels]}
                        </span>
                      </div>
                    </Button>
                  ))}
                </div>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="border-none rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] dark:bg-[#252a34] h-full">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
              {/* Profile Tab */}
              <TabsContent value="profile" className="flex-1 flex flex-col h-full">
                <CardHeader className="border-b border-[#eaeef3] dark:border-[#343a46] px-6 py-5 flex-shrink-0 flex items-center">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-lg bg-[#e9ecf5] dark:bg-[#343a46] flex items-center justify-center mr-3">
                      <User className="h-4 w-4 text-[#5661b3] dark:text-white" />
                    </div>
                    <CardTitle className="text-[#333c4d] dark:text-white">
                      {t('settings.profileInfo') || 'Profile Information'}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-1 overflow-auto">
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[#4b5563] dark:text-[#e5e7eb]">{t('settings.name') || 'Name'}</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          placeholder={t('settings.name') || 'Name'}
                          className="rounded-lg h-10 border-[#eaeef3] dark:border-[#343a46] dark:bg-[#1e2128] dark:text-white focus-visible:ring-[#5661b3]"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#4b5563] dark:text-[#e5e7eb]">{t('settings.email') || 'Email'}</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          placeholder={t('settings.email') || 'Email'}
                          className="rounded-lg h-10 border-[#eaeef3] dark:border-[#343a46] dark:bg-[#1e2128] dark:text-white focus-visible:ring-[#5661b3]"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="username" className="text-[#4b5563] dark:text-[#e5e7eb]">{t('settings.username') || 'Username'}</Label>
                        <span className="text-xs text-[#6b7280] dark:text-[#9ca3af]">{t('settings.usernameNote') || 'Cannot be changed'}</span>
                      </div>
                      <Input
                        id="username"
                        value={profile.username}
                        readOnly
                        className="rounded-lg h-10 bg-[#f1f3f9] dark:bg-[#2d3748] border-[#eaeef3] dark:border-[#343a46] dark:text-[#9ca3af]"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="rounded-lg h-11 px-6 bg-[#5661b3] hover:bg-[#4a538f] text-white transition-colors"
                    >
                      {isLoading ? t('settings.saving') || 'Saving...' : t('settings.saveChanges') || 'Save Changes'}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>
              
              {/* Security Tab */}
              <TabsContent value="security" className="flex-1 flex flex-col h-full">
                <CardHeader className="border-b border-[#eaeef3] dark:border-[#343a46] px-6 py-5 flex-shrink-0 flex items-center">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-lg bg-[#f5e9ec] dark:bg-[#343a46] flex items-center justify-center mr-3">
                      <Shield className="h-4 w-4 text-[#b35661] dark:text-white" />
                    </div>
                    <CardTitle className="text-[#333c4d] dark:text-white">
                      {t('settings.password') || 'Password'}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-1 overflow-auto">
                  <form onSubmit={handlePasswordChange} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-[#4b5563] dark:text-[#e5e7eb]">{t('settings.currentPassword') || 'Current Password'}</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwords.currentPassword}
                        onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
                        className="rounded-lg h-10 border-[#eaeef3] dark:border-[#343a46] dark:bg-[#1e2128] dark:text-white focus-visible:ring-[#b35661]"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-[#4b5563] dark:text-[#e5e7eb]">{t('settings.newPassword') || 'New Password'}</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={passwords.newPassword}
                          onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                          className="rounded-lg h-10 border-[#eaeef3] dark:border-[#343a46] dark:bg-[#1e2128] dark:text-white focus-visible:ring-[#b35661]"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-[#4b5563] dark:text-[#e5e7eb]">{t('settings.confirmPassword') || 'Confirm Password'}</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={passwords.confirmPassword}
                          onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                          className="rounded-lg h-10 border-[#eaeef3] dark:border-[#343a46] dark:bg-[#1e2128] dark:text-white focus-visible:ring-[#b35661]"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="rounded-lg h-11 px-6 bg-[#b35661] hover:bg-[#9a4a55] text-white transition-colors"
                    >
                      {isLoading ? t('settings.updating') || 'Updating...' : t('settings.changePasswordBtn') || 'Change Password'}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>
              
              {/* Notifications Tab */}
              <TabsContent value="notifications" className="flex-1 flex flex-col h-full">
                <CardHeader className="border-b border-[#eaeef3] dark:border-[#343a46] px-6 py-5 flex-shrink-0 flex items-center">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-lg bg-[#f5efe9] dark:bg-[#343a46] flex items-center justify-center mr-3">
                      <Bell className="h-4 w-4 text-[#b39256] dark:text-white" />
                    </div>
                    <CardTitle className="text-[#333c4d] dark:text-white">
                      {t('settings.notifications') || 'Notifications'}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-1 overflow-auto">
                  <div className="space-y-6">
                    {[
                      {
                        key: "emailAssignments",
                        title: t('settings.assignmentNotifications') || 'Assignment Notifications',
                        description: t('settings.assignmentNotificationsDesc') || 'Get notified when assignments are posted'
                      },
                      {
                        key: "emailMessages",
                        title: t('settings.messageNotifications') || 'Message Notifications',
                        description: t('settings.messageNotificationsDesc') || 'Get notified for new messages'
                      },
                      {
                        key: "emailAnnouncements",
                        title: t('settings.announcementNotifications') || 'Announcement Notifications',
                        description: t('settings.announcementNotificationsDesc') || 'Get notified for announcements'
                      },
                      {
                        key: "pushNotifications",
                        title: t('settings.pushNotifications') || 'Push Notifications',
                        description: t('settings.pushNotificationsDesc') || 'Get mobile push notifications'
                      }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-[#f9fafb] dark:hover:bg-[#343a46] transition-colors">
                        <Switch
                          id={item.key}
                          checked={notifications[item.key as keyof typeof notifications]}
                          onCheckedChange={(checked) => {
                            setNotifications({
                              ...notifications, 
                              [item.key]: checked
                            });
                            handleNotificationChange();
                          }}
                          className="data-[state=checked]:bg-[#b39256] data-[state=checked]:text-white"
                        />
                        <div className="flex-1">
                          <Label htmlFor={item.key} className="text-base font-medium text-[#333c4d] dark:text-white">{item.title}</Label>
                          <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </TabsContent>
              
              {/* Appearance Tab */}
              <TabsContent value="appearance" className="flex-1 flex flex-col h-full">
                <CardHeader className="border-b border-[#eaeef3] dark:border-[#343a46] px-6 py-5 flex-shrink-0 flex items-center">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-lg bg-[#eee9f5] dark:bg-[#343a46] flex items-center justify-center mr-3">
                      <PaintBrush className="h-4 w-4 text-[#8c56b3] dark:text-white" />
                    </div>
                    <CardTitle className="text-[#333c4d] dark:text-white">
                      {t('settings.appearance') || 'Appearance'}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-1 overflow-auto">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-base font-medium mb-4 text-[#333c4d] dark:text-white">Theme Mode</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { value: "light", label: "Light", icon: <Sun className="h-8 w-8" />, color: "#e6b422" },
                          { value: "dark", label: "Dark", icon: <Moon className="h-8 w-8" />, color: "#5661b3" },
                          { value: "system", label: "System", icon: <Desktop className="h-8 w-8" />, color: "#8c56b3" }
                        ].map((themeOption) => (
                          <div 
                            key={themeOption.value}
                            onClick={() => setTheme(themeOption.value as any)}
                            className={`relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all cursor-pointer
                              ${theme === themeOption.value 
                                ? 'border-[#8c56b3] bg-[#f9f6fc] dark:border-[#a5b4fc] dark:bg-[#343a46] shadow-[0_2px_10px_rgba(140,86,179,0.1)]' 
                                : 'border-[#eaeef3] dark:border-[#4b5563] hover:border-[#d8c9e8] dark:hover:border-[#a5b4fc]'
                              }`}
                          >
                            <div className="h-16 w-16 rounded-lg bg-white dark:bg-[#1e2128] shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center justify-center mb-4">
                              <span className="text-[#8c56b3] dark:text-[#a5b4fc]">{themeOption.icon}</span>
                            </div>
                            <span className="text-base font-medium text-[#333c4d] dark:text-white">
                              {themeOption.label}
                            </span>
                            
                            {theme === themeOption.value && (
                              <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-[#8c56b3] dark:bg-[#a5b4fc] flex items-center justify-center shadow-md">
                                <Check size={14} className="text-white" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="text-base font-medium mb-4 text-[#333c4d] dark:text-white">Theme Colors</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {["coastal", "forest", "lavender", "ocean", "earthy"].map((colorTheme) => (
                          <button
                            key={colorTheme}
                            type="button"
                            className={`p-4 rounded-lg border-2 transition-all ${
                              theme === colorTheme 
                                ? 'border-[#8c56b3] dark:border-[#a5b4fc] shadow-[0_2px_10px_rgba(140,86,179,0.1)]' 
                                : 'border-[#eaeef3] dark:border-[#4b5563] hover:border-[#d8c9e8] dark:hover:border-[#a5b4fc]'
                            }`}
                            onClick={() => setTheme(colorTheme as any)}
                          >
                            <div className="aspect-square w-full mb-2 rounded-lg shadow-inner overflow-hidden">
                              <div className="w-full h-full bg-gradient-to-br from-[#eaeef3] via-[#eee9f5] to-[#f9f6fc] dark:from-[#252a34] dark:via-[#343a46] dark:to-[#1e2128]" />
                            </div>
                            <p className="text-sm font-medium text-center capitalize text-[#4b5563] dark:text-[#e5e7eb]">{colorTheme}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
              
              {/* Language Tab */}
              <TabsContent value="language" className="flex-1 flex flex-col h-full">
                <CardHeader className="border-b border-[#eaeef3] dark:border-[#343a46] px-6 py-5 flex-shrink-0 flex items-center">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-lg bg-[#e9f5ec] dark:bg-[#343a46] flex items-center justify-center mr-3">
                      <Translate className="h-4 w-4 text-[#56b374] dark:text-white" />
                    </div>
                    <CardTitle className="text-[#333c4d] dark:text-white">
                      {t('settings.language.title') || 'Language'}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-1 overflow-auto">
                  <RadioGroup 
                    defaultValue={i18n.language} 
                    onValueChange={changeLanguage}
                    className="space-y-4"
                  >
                    <div 
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        i18n.language === 'en' 
                        ? 'border-[#56b374] bg-[#f5fbf7] dark:border-[#56b374] dark:bg-[#263c2d] shadow-[0_2px_10px_rgba(86,179,116,0.1)]' 
                        : 'border-[#eaeef3] dark:border-[#4b5563] hover:border-[#c9e8d4] dark:hover:border-[#56b374]'
                      }`}
                    >
                      <RadioGroupItem 
                        value="en" 
                        id="language-en"
                        className="text-[#56b374] border-[#56b374]"
                      />
                      <div className="flex-1">
                        <Label htmlFor="language-en" className="text-base font-medium cursor-pointer text-[#333c4d] dark:text-white">English</Label>
                        <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mt-0.5">English (United States)</p>
                      </div>
                      <Badge variant="outline" className="bg-[#e9f5ec] dark:bg-[#263c2d] text-[#56b374] border-[#d8e8dc] dark:border-[#3b5741] rounded-md">EN</Badge>
                    </div>
                    
                    <div 
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        i18n.language === 'zh' 
                        ? 'border-[#56b374] bg-[#f5fbf7] dark:border-[#56b374] dark:bg-[#263c2d] shadow-[0_2px_10px_rgba(86,179,116,0.1)]' 
                        : 'border-[#eaeef3] dark:border-[#4b5563] hover:border-[#c9e8d4] dark:hover:border-[#56b374]'
                      }`}
                    >
                      <RadioGroupItem 
                        value="zh" 
                        id="language-zh"
                        className="text-[#56b374] border-[#56b374]"
                      />
                      <div className="flex-1">
                        <Label htmlFor="language-zh" className="text-base font-medium cursor-pointer text-[#333c4d] dark:text-white">中文 (Chinese)</Label>
                        <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mt-0.5">Simplified Chinese</p>
                      </div>
                      <Badge variant="outline" className="bg-[#e9f5ec] dark:bg-[#263c2d] text-[#56b374] border-[#d8e8dc] dark:border-[#3b5741] rounded-md">中文</Badge>
                    </div>
                  </RadioGroup>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings; 