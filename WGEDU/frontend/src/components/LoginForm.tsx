import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { Checkbox } from '@/components/ui/checkbox';
import { Particles } from '@/components/magicui/particles';
import { useTheme } from '@/hooks/useTheme';
import { 
  GraduationCap, 
  User, 
  Lock, 
  SignIn, 
  Eye, 
  EyeSlash,
  ChartLineUp,
  ChatCircleText,
  Notebook
} from '@phosphor-icons/react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const success = login(username, password);
    
    if (!success) {
      setError(t('login.invalidCredentials'));
    }
    
    setIsLoading(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-900 p-4 relative overflow-hidden">
      {/* Add Particles background with enhanced settings */}
      <Particles 
        className="absolute inset-0 z-0"
        quantity={150}
        staticity={20}
        color={isDarkMode ? "#8b5cf6" : "#6366f1"}
        size={isDarkMode ? 0.7 : 0.6}
        vx={0.1}
        vy={0.1}
      />
      
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      
      <div className="w-full max-w-screen-xl flex flex-col lg:flex-row h-[80vh] max-h-[800px] overflow-hidden relative z-10">
        {/* Left Panel - Branding */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:flex flex-col justify-center items-center lg:w-1/2 bg-pastel-blue/10 dark:bg-pastel-blue/5 rounded-3xl p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5 bg-center bg-cover"></div>
          <Particles 
            className="absolute inset-0"
            quantity={80}
            staticity={30}
            color={isDarkMode ? "#a78bfa" : "#8b5cf6"}
            size={isDarkMode ? 1.2 : 1}
            ease={30}
          />
          <div className="relative z-10 text-center">
            <div className="flex justify-center mb-8">
              <div className="h-24 w-24 rounded-full bg-pastel-blue/30 flex items-center justify-center">
                <GraduationCap weight="fill" className="h-12 w-12 text-pastel-blue" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-pastel-blue">{t('common.welcome')}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              {t('login.tagline')}
            </p>
            
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="flex flex-col items-center p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-soft backdrop-blur-sm bg-white/80 dark:bg-neutral-800/80">
                <div className="h-12 w-12 rounded-full bg-pastel-purple/20 flex items-center justify-center mb-3">
                  <Notebook weight="fill" className="h-6 w-6 text-pastel-purple" />
                </div>
                <p className="text-sm font-medium">{t('login.features.personalizedLearning')}</p>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-soft backdrop-blur-sm bg-white/80 dark:bg-neutral-800/80">
                <div className="h-12 w-12 rounded-full bg-pastel-green/20 flex items-center justify-center mb-3">
                  <ChartLineUp weight="fill" className="h-6 w-6 text-pastel-green" />
                </div>
                <p className="text-sm font-medium">{t('login.features.progressTracking')}</p>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-soft backdrop-blur-sm bg-white/80 dark:bg-neutral-800/80">
                <div className="h-12 w-12 rounded-full bg-pastel-pink/20 flex items-center justify-center mb-3">
                  <ChatCircleText weight="fill" className="h-6 w-6 text-pastel-pink" />
                </div>
                <p className="text-sm font-medium">{t('login.features.communication')}</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Right Panel - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12"
        >
          <Card className="w-full max-w-md border-0 shadow-soft-lg rounded-3xl backdrop-blur-sm bg-white/90 dark:bg-neutral-900/90">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl lg:text-3xl font-bold text-center">{t('login.title')}</CardTitle>
              <CardDescription className="text-center text-base">{t('login.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="username" className="text-sm font-medium">
                    {t('login.username')}
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User weight="fill" className="h-5 w-5 text-pastel-blue" />
                    </div>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={t('login.enterUsername')}
                      className="pl-10 h-12 text-base rounded-xl"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-sm font-medium">
                      {t('login.password')}
                    </Label>
                    <button 
                      type="button" 
                      className="text-xs text-pastel-blue hover:underline"
                      onClick={() => alert('Forgot password functionality would be implemented here')}
                    >
                      {t('login.forgotPassword')}
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock weight="fill" className="h-5 w-5 text-pastel-blue" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('login.enterPassword')}
                      className="pl-10 pr-10 h-12 text-base rounded-xl"
                      required
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-pastel-purple hover:text-pastel-pink"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? (
                        <EyeSlash weight="fill" className="h-5 w-5" />
                      ) : (
                        <Eye weight="fill" className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="text-pastel-blue border-pastel-blue data-[state=checked]:bg-pastel-blue"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t('login.rememberMe')}
                  </label>
                </div>
                
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-pastel-red bg-pastel-red/10 p-4 rounded-xl"
                  >
                    {error}
                  </motion.p>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base rounded-xl bg-pastel-blue hover:bg-pastel-blue/90 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('login.signingIn')}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <SignIn weight="bold" className="mr-2 h-5 w-5" />
                      {t('login.signIn')}
                    </div>
                  )}
                </Button>

                {/* Demo accounts section */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-neutral-700">
                  <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-3">{t('login.demoAccounts')}</p>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="text-xs h-9"
                      onClick={() => {
                        setUsername('student');
                        setPassword('password');
                      }}
                    >
                      {t('login.student')}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="text-xs h-9"
                      onClick={() => {
                        setUsername('parent');
                        setPassword('password');
                      }}
                    >
                      {t('login.parent')}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="text-xs h-9"
                      onClick={() => {
                        setUsername('teacher');
                        setPassword('password');
                      }}
                    >
                      {t('login.teacher')}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginForm;
