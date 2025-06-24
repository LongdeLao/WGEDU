import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Class, Assignment, Student } from '@/types';
import { BookOpen, Users, ClipboardList, MessageSquare, PlusCircle, Calendar, User, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

const classesData: Class[] = [
    { id: '1', subject: 'Mathematics', time: '9:00 AM', teacher: 'Dr. Chen', day: 'Mon, Wed' },
    { id: '2', subject: 'Adv. Mathematics', time: '2:00 PM', teacher: 'Dr. Chen', day: 'Tue, Thu' },
];

const studentsData: Student[] = [
    { id: '1', name: 'Alex Johnson', class: 'Mathematics' },
    { id: '2', name: 'Emma Davis', class: 'Mathematics' },
    { id: '3', name: 'Ryan Wilson', class: 'Adv. Mathematics' },
    { id: '4', name: 'Sophie Chen', class: 'Adv. Mathematics' },
];

const assignmentsData: Assignment[] = [
    { id: '1', title: 'Calculus Problem Set 5', dueDate: '2024-06-25', subject: 'Mathematics' },
    { id: '2', title: 'Physics Lab Report', dueDate: '2024-06-23', subject: 'Physics' },
];

const TeacherDashboard = () => {
  const { t } = useTranslation();
  const [assignments, setAssignments] = useState<Assignment[]>(assignmentsData);
  const [newAssignment, setNewAssignment] = useState({ title: '', dueDate: '', subject: 'Mathematics' });

  const handleCreateAssignment = () => {
    if (newAssignment.title && newAssignment.dueDate) {
      setAssignments([...assignments, { ...newAssignment, id: Date.now().toString() }]);
      setNewAssignment({ title: '', dueDate: '', subject: 'Mathematics' });
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <header className="flex-shrink-0 mb-3">
        <h1 className="text-2xl font-bold tracking-tight">{t('common.welcome')}</h1>
        <p className="text-sm text-muted-foreground">{t('teacher.welcome')}</p>
      </header>

      <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 flex-shrink-0">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between py-2 px-4">
              <CardTitle className="text-xs font-medium">{t('teacher.yourClasses')}</CardTitle>
              <BookOpen className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent className="py-2 px-4">
              <div className="text-xl font-bold">{classesData.length}</div>
              <p className="text-xs text-muted-foreground">{t('teacher.totalActiveClasses')}</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between py-2 px-4">
              <CardTitle className="text-xs font-medium">{t('teacher.totalStudents')}</CardTitle>
              <Users className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent className="py-2 px-4">
              <div className="text-xl font-bold">{studentsData.length}</div>
              <p className="text-xs text-muted-foreground">{t('teacher.acrossAllClasses')}</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between py-2 px-4">
              <CardTitle className="text-xs font-medium">{t('teacher.assignments')}</CardTitle>
              <ClipboardList className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent className="py-2 px-4">
              <div className="text-xl font-bold">{assignments.length}</div>
              <p className="text-xs text-muted-foreground">{t('teacher.activeAssignments')}</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between py-2 px-4">
              <CardTitle className="text-xs font-medium">{t('teacher.todaySchedule')}</CardTitle>
              <Calendar className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent className="py-2 px-4">
              <div className="text-xl font-bold">{classesData.length}</div>
              <p className="text-xs text-muted-foreground">{t('teacher.classesToTeach')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-3 overflow-hidden">
          {/* Left Column - Create Assignment and Student List */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-3 h-full overflow-hidden">
            <Card className="shadow-sm flex flex-col">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm">{t('teacher.createAssignment')}</CardTitle>
                <CardDescription className="text-xs">{t('teacher.postHomework')}</CardDescription>
              </CardHeader>
              <CardContent className="py-2 px-4 flex-1 flex flex-col gap-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="title" className="text-xs">{t('teacher.title')}</Label>
                    <Input 
                      id="title" 
                      placeholder="e.g., Calculus Homework" 
                      value={newAssignment.title} 
                      onChange={e => setNewAssignment({...newAssignment, title: e.target.value})} 
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="dueDate" className="text-xs">{t('teacher.dueDate')}</Label>
                    <Input 
                      id="dueDate" 
                      type="date" 
                      value={newAssignment.dueDate} 
                      onChange={e => setNewAssignment({...newAssignment, dueDate: e.target.value})} 
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="subject" className="text-xs">{t('teacher.class')}</Label>
                  <Select 
                    value={newAssignment.subject} 
                    onValueChange={subject => setNewAssignment({...newAssignment, subject})}
                  >
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classesData.map(c => <SelectItem key={c.id} value={c.subject}>{c.subject}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleCreateAssignment} className="w-full sm:w-auto h-8 text-xs mt-1">{t('common.create')}</Button>
              </CardContent>
            </Card>

            <Card className="shadow-sm flex flex-col overflow-hidden">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm">{t('teacher.yourStudents')}</CardTitle>
                <CardDescription className="text-xs">{t('teacher.studentsEnrolled')}</CardDescription>
              </CardHeader>
              <CardContent className="py-2 px-4 flex-1 overflow-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {classesData.map(c => (
                    <div key={c.id}>
                      <h3 className="font-semibold text-xs mb-1">{c.subject}</h3>
                      <div className="space-y-1">
                        {studentsData.filter(s => s.class === c.subject).map(student => (
                          <div key={student.id} className="flex items-center gap-2 p-1 rounded-md bg-muted/40">
                            <User className="h-3 w-3"/>
                            <span className="text-xs">{student.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Active Assignments and Announcements */}
          <div className="grid grid-cols-1 gap-3 h-full overflow-hidden">
            <Card className="shadow-sm flex flex-col overflow-hidden">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm">{t('teacher.assignments')}</CardTitle>
                <CardDescription className="text-xs">{t('teacher.postedAssignments')}</CardDescription>
              </CardHeader>
              <CardContent className="py-2 px-4 flex-1 overflow-auto">
                <div className="space-y-1">
                  {assignments.map(assignment => (
                    <div key={assignment.id} className="flex items-center justify-between p-2 rounded-md border">
                      <div>
                        <div className="font-medium text-xs">{assignment.title}</div>
                        <div className="text-xs text-muted-foreground">{assignment.subject}</div>
                      </div>
                      <div className="text-xs font-semibold">{assignment.dueDate}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm flex flex-col">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm">{t('teacher.sendAnnouncement')}</CardTitle>
                <CardDescription className="text-xs">{t('teacher.messageAll')}</CardDescription>
              </CardHeader>
              <CardContent className="py-2 px-4 flex-1 flex flex-col gap-2">
                <Textarea placeholder={t('teacher.announcementHere')} className="flex-1 min-h-[80px] text-sm" />
                <Button className="w-full h-8 text-xs">{t('common.send')}</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
