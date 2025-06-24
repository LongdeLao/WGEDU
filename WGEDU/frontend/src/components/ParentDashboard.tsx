import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Student, AttendedClass, Message } from '@/types';
import { useTranslation } from 'react-i18next';
import { 
  CurrencyDollar, 
  Users, 
  Warning,
  ChatCircleText, 
  Calendar, 
  ArrowDown 
} from '@phosphor-icons/react';

const ParentDashboard = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const children: Student[] = [
    {
      id: '1',
      name: 'Alex Johnson',
      classes: [
        { id: '1', subject: 'Mathematics', time: '9:00 AM - 10:30 AM', teacher: 'Dr. Michael Chen', day: 'Mon, Wed' },
        { id: '2', subject: 'Physics', time: '11:00 AM - 12:30 PM', teacher: 'Ms. Emily Davis', day: 'Tue, Thu' },
      ],
      assignments: [
        { id: '1', title: 'Calculus Problem Set 5', dueDate: '2024-06-25', subject: 'Mathematics', status: 'pending' },
        { id: '2', title: 'Physics Lab Report', dueDate: '2024-06-23', subject: 'Physics', status: 'submitted' },
      ],
    },
  ];

  const attendedClasses: AttendedClass[] = [
    { id: '1', subject: 'Mathematics', date: '2024-06-10', amount: 50 },
    { id: '2', subject: 'Physics', date: '2024-06-11', amount: 50 },
    { id: '3', subject: 'Mathematics', date: '2024-06-12', amount: 50 },
    { id: '4', subject: 'Physics', date: '2024-06-13', amount: 50 },
    { id: '5', subject: 'Mathematics', date: '2024-06-17', amount: 50 },
    { id: '6', subject: 'Physics', date: '2024-06-18', amount: 50 },
  ];

  const startingBalance = 2000;
  const totalDeducted = attendedClasses.reduce((sum, cls) => sum + cls.amount, 0);
  const currentBalance = startingBalance - totalDeducted;

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        from: 'Sarah Wilson',
        to: 'Teacher/Admin',
        subject: 'Parent Inquiry',
        content: newMessage,
        timestamp: new Date().toLocaleString(),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const pendingAssignments = children.reduce((sum, child) => sum + child.assignments.filter(a => a.status === 'pending').length, 0);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Welcome Header */}
      <header className="flex-shrink-0 mb-3">
        <h1 className="text-2xl font-bold tracking-tight">{t('common.welcome')}</h1>
        <p className="text-sm text-muted-foreground">{t('parent.welcome')}</p>
      </header>

      <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 flex-shrink-0">
          <Card className="border-l-4 border-l-pastel-green shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">{t('parent.currentBalance')}</p>
                  <p className="text-lg font-bold text-black">${currentBalance}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-pastel-green/20 flex items-center justify-center">
                  <CurrencyDollar weight="fill" className="h-4 w-4 text-pastel-green" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-pastel-blue shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">{t('parent.children')}</p>
                  <p className="text-lg font-bold text-black">{children.length}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-pastel-blue/20 flex items-center justify-center">
                  <Users weight="fill" className="h-4 w-4 text-pastel-blue" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-pastel-orange shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">{t('parent.pendingTasks')}</p>
                  <p className="text-lg font-bold text-black">{pendingAssignments}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-pastel-orange/20 flex items-center justify-center">
                  <Warning weight="fill" className="h-4 w-4 text-pastel-orange" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-pastel-red shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">{t('parent.thisMonth')}</p>
                  <p className="text-lg font-bold text-black">${totalDeducted}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-pastel-red/20 flex items-center justify-center">
                  <ArrowDown weight="fill" className="h-4 w-4 text-pastel-red" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-3 overflow-hidden">
          {/* Left Column */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-3 h-full overflow-hidden">
            {/* Child Progress */}
            <Card className="shadow-sm flex flex-col overflow-hidden">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-pastel-blue/20 flex items-center justify-center">
                    <Users weight="fill" className="h-3 w-3 text-pastel-blue" />
                  </div>
                  {t('parent.childProgress')}
                </CardTitle>
                <CardDescription className="text-xs">{t('parent.academicStatus')}</CardDescription>
              </CardHeader>
              <CardContent className="py-2 px-4 flex-1 overflow-auto">
                {children.map((child) => (
                  <div key={child.id} className="space-y-3">
                    <div className="border-b pb-2">
                      <h3 className="text-sm font-semibold text-black mb-2">{child.name}</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <h4 className="font-medium text-xs text-gray-900">{t('parent.currentClasses')}</h4>
                          {child.classes.map((cls) => (
                            <div key={cls.id} className="p-2 bg-pastel-blue/10 rounded-lg">
                              <p className="font-medium text-black text-xs">{cls.subject}</p>
                              <p className="text-[10px] text-gray-600">{cls.teacher}</p>
                              <p className="text-[10px] text-gray-500">{cls.day} • {cls.time}</p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="space-y-1">
                          <h4 className="font-medium text-xs text-gray-900">{t('parent.assignmentStatus')}</h4>
                          {child.assignments.map((assignment) => (
                            <div key={assignment.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium text-black text-xs">{assignment.title}</p>
                                <p className="text-[10px] text-gray-500">{t('parent.due')}: {assignment.dueDate}</p>
                              </div>
                              <Badge variant={assignment.status === 'submitted' ? 'default' : 'secondary'} className="rounded-lg text-[10px] py-0 h-4">
                                {assignment.status === 'submitted' ? t('parent.submitted') : t('parent.pending')}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="shadow-sm flex flex-col overflow-hidden">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-pastel-green/20 flex items-center justify-center">
                    <Calendar weight="fill" className="h-3 w-3 text-pastel-green" />
                  </div>
                  {t('parent.recentAttendance')}
                </CardTitle>
                <CardDescription className="text-xs">{t('parent.classesAttended')}</CardDescription>
              </CardHeader>
              <CardContent className="py-2 px-4 flex-1 overflow-auto">
                <div className="space-y-1">
                  {attendedClasses.slice(-6).map((cls) => (
                    <div key={cls.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-black text-xs">{cls.subject}</p>
                        <p className="text-[10px] text-gray-500">{cls.date}</p>
                      </div>
                      <p className="font-medium text-xs text-pastel-red">-${cls.amount}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="grid grid-cols-1 gap-3 h-full overflow-hidden">
            {/* Balance Overview */}
            <Card className="shadow-sm flex flex-col overflow-hidden">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-pastel-green/20 flex items-center justify-center">
                    <CurrencyDollar weight="fill" className="h-3 w-3 text-pastel-green" />
                  </div>
                  {t('parent.balanceOverview')}
                </CardTitle>
                <CardDescription className="text-xs">{t('parent.financialSummary')}</CardDescription>
              </CardHeader>
              <CardContent className="py-2 px-4 flex-1 overflow-auto">
                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">{t('parent.startingBalance')}</span>
                      <span className="font-medium text-xs">${startingBalance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">{t('parent.totalDeducted')}</span>
                      <span className="font-medium text-xs text-pastel-red">-${totalDeducted}</span>
                    </div>
                    <div className="border-t pt-1">
                      <div className="flex justify-between">
                        <span className="font-semibold text-xs">{t('parent.currentBalance')}</span>
                        <span className="font-bold text-xs text-pastel-green">${currentBalance}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-500">
                    {t('parent.classesAttendedCount', { count: attendedClasses.length })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Message */}
            <Card className="shadow-sm flex flex-col">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-pastel-purple/20 flex items-center justify-center">
                    <ChatCircleText weight="fill" className="h-3 w-3 text-pastel-purple" />
                  </div>
                  {t('parent.contactTeachers')}
                </CardTitle>
                <CardDescription className="text-xs">{t('parent.sendMessage')}</CardDescription>
              </CardHeader>
              <CardContent className="py-2 px-4 flex-1 flex flex-col gap-2">
                <Textarea
                  placeholder={t('parent.messageHere')}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 min-h-[80px] text-sm"
                />
                <Button 
                  onClick={handleSendMessage} 
                  className="w-full h-8 text-xs bg-pastel-purple hover:bg-pastel-purple/90"
                >
                  {t('common.send')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
