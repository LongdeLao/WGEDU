import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Class, Assignment } from '@/types';
import { useTranslation } from 'react-i18next';
import { 
  BookOpen, 
  WarningCircle,
  CheckCircle,
  Clock,
  CalendarBlank,
  ChatCircleText
} from '@phosphor-icons/react';

const classesData: Class[] = [
    { id: '1', subject: 'Mathematics', time: '9:00 AM', teacher: 'Dr. Michael Chen', day: 'Mon, Wed' },
    { id: '2', subject: 'Physics', time: '11:00 AM', teacher: 'Ms. Emily Davis', day: 'Tue, Thu' },
    { id: '3', subject: 'Chemistry', time: '2:00 PM', teacher: 'Dr. Robert Kim', day: 'Mon, Fri' },
];

const assignmentsData: Assignment[] = [
    { id: '1', title: 'Calculus Problem Set 5', dueDate: 'Tomorrow', subject: 'Mathematics', status: 'pending' },
    { id: '2', title: 'Physics Lab Report', dueDate: 'Yesterday', subject: 'Physics', status: 'submitted' },
    { id: '3', title: 'Organic Chemistry Reactions', dueDate: 'Next Week', subject: 'Chemistry', status: 'pending' },
];

const StudentDashboard = () => {
  const { t } = useTranslation();
  const pendingAssignments = assignmentsData.filter(a => a.status === 'pending');
  const submittedAssignments = assignmentsData.filter(a => a.status === 'submitted');

  return (
    <div className="h-full flex flex-col overflow-hidden p-6 bg-[#f8f9fa] dark:bg-[#1a1d23]">
      <header className="flex-shrink-0 mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-[#333c4d] dark:text-[#e5e7eb]">{t('common.welcome')}</h1>
        <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] mt-1">{t('student.progress')}</p>
      </header>

      <div className="flex-1 min-h-0 flex flex-col gap-5 overflow-hidden">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-shrink-0">
          <Card className="bg-white dark:bg-[#252a34] border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] rounded-xl overflow-hidden relative pl-1">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#a3b4cc] dark:bg-[#5661b3]/70"></div>
            <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
              <CardTitle className="text-sm font-medium text-[#4b5563] dark:text-[#e5e7eb]">{t('student.enrolledClasses')}</CardTitle>
              <div className="h-8 w-8 rounded-lg bg-[#e9ecf5] dark:bg-[#343a46] flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-[#5661b3] dark:text-[#a5b4fc]" />
              </div>
            </CardHeader>
            <CardContent className="py-1 px-4">
              <div className="text-2xl font-semibold text-[#333c4d] dark:text-white">{classesData.length}</div>
              <p className="text-xs text-[#6b7280] dark:text-[#9ca3af] mt-1">{t('student.subjectsThisSemester')}</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#252a34] border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] rounded-xl overflow-hidden relative pl-1">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#c8b19a] dark:bg-[#b39256]/70"></div>
            <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
              <CardTitle className="text-sm font-medium text-[#4b5563] dark:text-[#e5e7eb]">{t('student.pendingAssignments')}</CardTitle>
              <div className="h-8 w-8 rounded-lg bg-[#f5efe9] dark:bg-[#363230] flex items-center justify-center">
                <WarningCircle className="h-4 w-4 text-[#b39256] dark:text-[#e9bb76]" />
              </div>
            </CardHeader>
            <CardContent className="py-1 px-4">
              <div className="text-2xl font-semibold text-[#333c4d] dark:text-white">{pendingAssignments.length}</div>
              <p className="text-xs text-[#6b7280] dark:text-[#9ca3af] mt-1">{t('student.itemsToBeCompleted')}</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#252a34] border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] rounded-xl overflow-hidden relative pl-1">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#a3c8b1] dark:bg-[#56b374]/70"></div>
            <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
              <CardTitle className="text-sm font-medium text-[#4b5563] dark:text-[#e5e7eb]">{t('student.submittedWork')}</CardTitle>
              <div className="h-8 w-8 rounded-lg bg-[#e9f5ec] dark:bg-[#2e3933] flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-[#56b374] dark:text-[#76e995]" />
              </div>
            </CardHeader>
            <CardContent className="py-1 px-4">
              <div className="text-2xl font-semibold text-[#333c4d] dark:text-white">{submittedAssignments.length}</div>
              <p className="text-xs text-[#6b7280] dark:text-[#9ca3af] mt-1">{t('student.assignmentsGraded')}</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#252a34] border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] rounded-xl overflow-hidden relative pl-1">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#b3a3c8] dark:bg-[#8c56b3]/70"></div>
            <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
              <CardTitle className="text-sm font-medium text-[#4b5563] dark:text-[#e5e7eb]">{t('student.upcomingClass')}</CardTitle>
              <div className="h-8 w-8 rounded-lg bg-[#eee9f5] dark:bg-[#362f3c] flex items-center justify-center">
                <Clock className="h-4 w-4 text-[#8c56b3] dark:text-[#ba76e9]" />
              </div>
            </CardHeader>
            <CardContent className="py-1 px-4">
              <div className="text-sm font-semibold text-[#333c4d] dark:text-white">Mathematics</div>
              <p className="text-xs text-[#6b7280] dark:text-[#9ca3af] mt-1">Today at 9:00 AM</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-5 overflow-hidden">
          {/* Left Column - Schedule and Assignments */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-5 h-full overflow-hidden">
            <Card className="bg-white dark:bg-[#252a34] border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] rounded-xl overflow-hidden flex flex-col">
              <CardHeader className="border-b border-[#eaeef3] dark:border-[#343a46] py-4 px-5">
                <CardTitle className="text-base flex items-center gap-2 text-[#333c4d] dark:text-white">
                  <div className="h-7 w-7 rounded-lg bg-[#e9ecf5] dark:bg-[#343a46] flex items-center justify-center">
                    <CalendarBlank className="h-3.5 w-3.5 text-[#5661b3] dark:text-[#a5b4fc]" />
                  </div>
                  {t('student.weeklySchedule')}
                </CardTitle>
                <CardDescription className="text-xs text-[#6b7280] dark:text-[#9ca3af] mt-1">{t('student.allClasses')}</CardDescription>
              </CardHeader>
              <CardContent className="py-4 px-5 flex-1 overflow-auto">
                <div className="space-y-3">
                  {classesData.map(cls => (
                    <div key={cls.id} className="flex items-center justify-between p-3 rounded-lg border border-[#eaeef3] dark:border-[#343a46] hover:bg-[#f9fafb] dark:hover:bg-[#343a46] transition-colors">
                      <div>
                        <h3 className="font-semibold text-sm text-[#333c4d] dark:text-white">{cls.subject}</h3>
                        <p className="text-xs text-[#6b7280] dark:text-[#9ca3af] mt-0.5">{cls.teacher}</p>
                      </div>
                      <div className="text-xs text-[#6b7280] dark:text-[#9ca3af] flex items-center gap-1.5 bg-[#f1f3f9] dark:bg-[#343a46] py-1.5 px-3 rounded-md">
                        <Clock className="h-3 w-3 text-[#8c56b3] dark:text-[#ba76e9]" />
                        {cls.day}, {cls.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-[#252a34] border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] rounded-xl overflow-hidden flex flex-col">
              <CardHeader className="border-b border-[#eaeef3] dark:border-[#343a46] py-4 px-5">
                <CardTitle className="text-base flex items-center gap-2 text-[#333c4d] dark:text-white">
                  <div className="h-7 w-7 rounded-lg bg-[#f5efe9] dark:bg-[#363230] flex items-center justify-center">
                    <WarningCircle className="h-3.5 w-3.5 text-[#b39256] dark:text-[#e9bb76]" />
                  </div>
                  {t('student.upcomingAssignments')}
                </CardTitle>
                <CardDescription className="text-xs text-[#6b7280] dark:text-[#9ca3af] mt-1">{t('student.homeworkAndProjects')}</CardDescription>
              </CardHeader>
              <CardContent className="py-4 px-5 flex-1 overflow-auto">
                <div className="space-y-3">
                  {pendingAssignments.map(assignment => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 rounded-lg bg-[#f9fafb] dark:bg-[#2d3138]">
                      <div>
                        <div className="font-medium text-sm text-[#333c4d] dark:text-white">{assignment.title}</div>
                        <div className="text-xs text-[#6b7280] dark:text-[#9ca3af] mt-0.5">{assignment.subject}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-semibold text-[#6b7280] dark:text-[#9ca3af] mb-1">{t('parent.due')}: {assignment.dueDate}</div>
                        <Badge variant="outline" className="bg-[#f5efe9] dark:bg-[#363230] text-[#b39256] dark:text-[#e9bb76] border-[#e8e0d5] dark:border-[#554a3d] rounded-md text-[10px] py-0.5 px-1.5">
                          {t('parent.pending')}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Submitted Work and Messages */}
          <div className="grid grid-cols-1 gap-5 h-full overflow-hidden">
            <Card className="bg-white dark:bg-[#252a34] border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] rounded-xl overflow-hidden flex flex-col">
              <CardHeader className="border-b border-[#eaeef3] dark:border-[#343a46] py-4 px-5">
                <CardTitle className="text-base flex items-center gap-2 text-[#333c4d] dark:text-white">
                  <div className="h-7 w-7 rounded-lg bg-[#e9f5ec] dark:bg-[#2e3933] flex items-center justify-center">
                    <CheckCircle className="h-3.5 w-3.5 text-[#56b374] dark:text-[#76e995]" />
                  </div>
                  {t('student.submittedAssignments')}
                </CardTitle>
                <CardDescription className="text-xs text-[#6b7280] dark:text-[#9ca3af] mt-1">
                  {submittedAssignments.length} {t('student.assignmentsHandedIn')}
                </CardDescription>
              </CardHeader>
              <CardContent className="py-4 px-5 flex-1 overflow-auto">
                <div className="space-y-3">
                  {submittedAssignments.map(assignment => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 rounded-lg bg-[#f9fafb] dark:bg-[#2d3138]">
                      <div>
                        <div className="font-medium text-sm text-[#333c4d] dark:text-white">{assignment.title}</div>
                        <div className="text-xs text-[#6b7280] dark:text-[#9ca3af] mt-0.5">{assignment.subject}</div>
                      </div>
                      <Badge variant="outline" className="bg-[#e9f5ec] dark:bg-[#2e3933] text-[#56b374] dark:text-[#76e995] border-[#d8e8dc] dark:border-[#3d554a] rounded-md text-[10px] py-0.5 px-1.5">
                        {t('parent.submitted')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-[#252a34] border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] rounded-xl overflow-hidden flex flex-col">
              <CardHeader className="border-b border-[#eaeef3] dark:border-[#343a46] py-4 px-5">
                <CardTitle className="text-base flex items-center gap-2 text-[#333c4d] dark:text-white">
                  <div className="h-7 w-7 rounded-lg bg-[#eee9f5] dark:bg-[#362f3c] flex items-center justify-center">
                    <ChatCircleText className="h-3.5 w-3.5 text-[#8c56b3] dark:text-[#ba76e9]" />
                  </div>
                  {t('student.contactTutor')}
                </CardTitle>
                <CardDescription className="text-xs text-[#6b7280] dark:text-[#9ca3af] mt-1">{t('student.messageToTutor')}</CardDescription>
              </CardHeader>
              <CardContent className="py-4 px-5 flex-1 flex flex-col gap-3">
                <Textarea 
                  placeholder={t('parent.messageHere')} 
                  className="flex-1 min-h-[100px] text-sm rounded-lg border-[#eaeef3] dark:border-[#343a46] dark:bg-[#1e2128] dark:text-white focus-visible:ring-[#8c56b3]" 
                />
                <Button 
                  className="w-full py-2 text-sm bg-[#8c56b3] hover:bg-[#7a4a9a] dark:bg-[#8c56b3] dark:hover:bg-[#9967c4] text-white rounded-lg transition-colors"
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

export default StudentDashboard;
