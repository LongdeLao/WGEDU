import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTranslation } from 'react-i18next';
import { 
  Users,
  Book,
  CurrencyDollar,
  CalendarBlank,
  ChartBar,
  MagnifyingGlass,
  PlusCircle,
  Funnel,
  CaretRight,
  CaretLeft,
  CaretDown
} from '@phosphor-icons/react';
import { useToast } from '@/components/ui/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Student data types
interface StudentData {
  id: string;
  name: string;
  grade: string;
  enrollmentDate: string;
  classes: string[];
  balance: number;
  parentName: string;
  email: string;
  phone: string;
  attendance: number;
  performanceScore: number;
}

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterGrade, setFilterGrade] = useState<string | null>(null);
  const rowsPerPage = 10;

  // Mock student data
  const students: StudentData[] = [
    {
      id: 'S001',
      name: 'Alex Johnson',
      grade: 'Grade 10',
      enrollmentDate: '2023-09-01',
      classes: ['Mathematics', 'Physics'],
      balance: 250,
      parentName: 'Sarah Wilson',
      email: 'alex.j@example.com',
      phone: '123-456-7890',
      attendance: 95,
      performanceScore: 87
    },
    {
      id: 'S002',
      name: 'Emma Davis',
      grade: 'Grade 11',
      enrollmentDate: '2023-08-15',
      classes: ['Chemistry', 'Biology', 'English'],
      balance: 150,
      parentName: 'Robert Davis',
      email: 'emma.d@example.com',
      phone: '123-456-7891',
      attendance: 98,
      performanceScore: 92
    },
    {
      id: 'S003',
      name: 'Michael Chen',
      grade: 'Grade 9',
      enrollmentDate: '2023-09-05',
      classes: ['Mathematics', 'Computer Science'],
      balance: 0,
      parentName: 'Jennifer Chen',
      email: 'michael.c@example.com',
      phone: '123-456-7892',
      attendance: 92,
      performanceScore: 89
    },
    {
      id: 'S004',
      name: 'Sophia Kim',
      grade: 'Grade 10',
      enrollmentDate: '2023-08-20',
      classes: ['Literature', 'History', 'Art'],
      balance: 75,
      parentName: 'David Kim',
      email: 'sophia.k@example.com',
      phone: '123-456-7893',
      attendance: 90,
      performanceScore: 94
    },
    {
      id: 'S005',
      name: 'James Wilson',
      grade: 'Grade 12',
      enrollmentDate: '2023-07-30',
      classes: ['Physics', 'Calculus', 'Chemistry'],
      balance: 320,
      parentName: 'Laura Wilson',
      email: 'james.w@example.com',
      phone: '123-456-7894',
      attendance: 88,
      performanceScore: 83
    },
    {
      id: 'S006',
      name: 'Olivia Brown',
      grade: 'Grade 11',
      enrollmentDate: '2023-08-10',
      classes: ['Biology', 'Environmental Science'],
      balance: 180,
      parentName: 'Thomas Brown',
      email: 'olivia.b@example.com',
      phone: '123-456-7895',
      attendance: 96,
      performanceScore: 91
    },
    {
      id: 'S007',
      name: 'Ethan Taylor',
      grade: 'Grade 9',
      enrollmentDate: '2023-09-03',
      classes: ['Algebra', 'Geography'],
      balance: 40,
      parentName: 'Angela Taylor',
      email: 'ethan.t@example.com',
      phone: '123-456-7896',
      attendance: 93,
      performanceScore: 85
    },
    {
      id: 'S008',
      name: 'Ava Martinez',
      grade: 'Grade 10',
      enrollmentDate: '2023-08-25',
      classes: ['Spanish', 'History', 'Mathematics'],
      balance: 0,
      parentName: 'Carlos Martinez',
      email: 'ava.m@example.com',
      phone: '123-456-7897',
      attendance: 97,
      performanceScore: 90
    },
    {
      id: 'S009',
      name: 'Noah Garcia',
      grade: 'Grade 12',
      enrollmentDate: '2023-07-28',
      classes: ['Physics', 'Computer Science', 'English'],
      balance: 210,
      parentName: 'Maria Garcia',
      email: 'noah.g@example.com',
      phone: '123-456-7898',
      attendance: 94,
      performanceScore: 88
    },
    {
      id: 'S010',
      name: 'Isabella Rodriguez',
      grade: 'Grade 11',
      enrollmentDate: '2023-08-05',
      classes: ['Chemistry', 'Literature'],
      balance: 95,
      parentName: 'Jose Rodriguez',
      email: 'isabella.r@example.com',
      phone: '123-456-7899',
      attendance: 91,
      performanceScore: 93
    }
  ];

  // Overall statistics
  const totalStudents = students.length;
  const totalBalance = students.reduce((sum, student) => sum + student.balance, 0);
  const averageAttendance = students.reduce((sum, student) => sum + student.attendance, 0) / totalStudents;
  const averagePerformance = students.reduce((sum, student) => sum + student.performanceScore, 0) / totalStudents;
  
  // Get unique grade levels for filtering
  const gradeOptions = Array.from(new Set(students.map(student => student.grade)));

  // Filter students based on search query and grade filter
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         student.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = filterGrade ? student.grade === filterGrade : true;
    return matchesSearch && matchesGrade;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredStudents.length);
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  // Handler for adding a new student
  const handleAddStudent = () => {
    toast({
      title: t('admin.studentAdded') || 'New student added',
      description: t('admin.studentAddedDesc') || 'The student has been added successfully',
    });
  };

  // Formatting functions
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden p-6 bg-[#f8f9fa]">
      <header className="flex-shrink-0 mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-[#333c4d]">{t('admin.dashboard') || 'Admin Dashboard'}</h1>
        <p className="text-sm text-[#6b7280] mt-1">{t('admin.dashboardSubtitle') || 'Manage students, classes, and monitor performance'}</p>
      </header>

      <div className="flex-1 min-h-0 flex flex-col gap-8 overflow-auto pb-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-xl overflow-hidden transition-all hover:shadow-[0_4px_25px_rgba(0,0,0,0.08)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6b7280]">{t('admin.totalStudents') || 'Total Students'}</p>
                  <p className="text-2xl font-semibold mt-2 text-[#333c4d]">{totalStudents}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-[#e9ecf5] flex items-center justify-center">
                  <Users weight="fill" className="h-6 w-6 text-[#5661b3]" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-xl overflow-hidden transition-all hover:shadow-[0_4px_25px_rgba(0,0,0,0.08)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6b7280]">{t('admin.totalOutstandingBalance') || 'Outstanding Balance'}</p>
                  <p className="text-2xl font-semibold mt-2 text-[#333c4d]">{formatCurrency(totalBalance)}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-[#f5e9ec] flex items-center justify-center">
                  <CurrencyDollar weight="fill" className="h-6 w-6 text-[#b35661]" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-xl overflow-hidden transition-all hover:shadow-[0_4px_25px_rgba(0,0,0,0.08)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6b7280]">{t('admin.averageAttendance') || 'Average Attendance'}</p>
                  <p className="text-2xl font-semibold mt-2 text-[#333c4d]">{averageAttendance.toFixed(1)}%</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-[#e9f5ec] flex items-center justify-center">
                  <CalendarBlank weight="fill" className="h-6 w-6 text-[#56b374]" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-xl overflow-hidden transition-all hover:shadow-[0_4px_25px_rgba(0,0,0,0.08)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6b7280]">{t('admin.averagePerformance') || 'Average Performance'}</p>
                  <p className="text-2xl font-semibold mt-2 text-[#333c4d]">{averagePerformance.toFixed(1)}%</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-[#ece9f5] flex items-center justify-center">
                  <ChartBar weight="fill" className="h-6 w-6 text-[#8c56b3]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <Tabs defaultValue="students" className="flex-1 flex flex-col">
          <div className="mb-6">
            <TabsList className="h-12 p-1 bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <TabsTrigger value="students" className="rounded-lg data-[state=active]:bg-[#f1f3f9] data-[state=active]:text-[#333c4d] h-full px-5 transition-all">
                <Users className="h-4 w-4 mr-2" />
                {t('admin.students') || 'Students'}
              </TabsTrigger>
              <TabsTrigger value="classes" className="rounded-lg data-[state=active]:bg-[#f1f3f9] data-[state=active]:text-[#333c4d] h-full px-5 transition-all">
                <Book className="h-4 w-4 mr-2" />
                {t('admin.classesList') || 'Classes'}
              </TabsTrigger>
              <TabsTrigger value="finances" className="rounded-lg data-[state=active]:bg-[#f1f3f9] data-[state=active]:text-[#333c4d] h-full px-5 transition-all">
                <CurrencyDollar className="h-4 w-4 mr-2" />
                {t('admin.finances') || 'Finances'}
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Students Tab */}
          <TabsContent value="students" className="flex-1 data-[state=active]:flex flex-col gap-6 overflow-auto">
            <Card className="bg-white border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-xl overflow-hidden flex-1 flex flex-col">
              <CardHeader className="border-b border-[#eaeef3] px-6 py-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2 text-[#333c4d]">
                    <Users className="h-5 w-5 text-[#5661b3]" />
                    {t('admin.studentManagement') || 'Student Management'}
                  </CardTitle>
                  <Button onClick={handleAddStudent} className="gap-1 bg-[#5661b3] hover:bg-[#4a538f] text-white rounded-lg px-4 transition-colors">
                    <PlusCircle className="h-4 w-4" />
                    {t('admin.addStudent') || 'Add Student'}
                  </Button>
                </div>
                <CardDescription className="text-[#6b7280] mt-1">
                  {t('admin.studentManagementDesc') || 'View and manage all enrolled students'}
                </CardDescription>
                
                <div className="flex items-center gap-4 mt-5">
                  <div className="relative flex-1">
                    <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9ca3af]" />
                    <Input 
                      placeholder={t('admin.searchStudents') || 'Search by name or ID...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 border-[#eaeef3] rounded-lg focus-visible:ring-[#5661b3]"
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-1 border-[#eaeef3] text-[#6b7280] rounded-lg hover:bg-[#f1f3f9] hover:text-[#333c4d]">
                        <Funnel className="h-4 w-4" />
                        {filterGrade || (t('admin.filterByGrade') || 'Filter by Grade')}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl p-2 shadow-lg border-[#eaeef3]">
                      <DropdownMenuItem onClick={() => setFilterGrade(null)} className="rounded-lg">
                        {t('admin.allGrades') || 'All Grades'}
                      </DropdownMenuItem>
                      {gradeOptions.map((grade) => (
                        <DropdownMenuItem key={grade} onClick={() => setFilterGrade(grade)} className="rounded-lg">
                          {grade}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-auto p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-[#eaeef3] hover:bg-[#f9fafb]">
                      <TableHead className="text-[#6b7280] font-medium">{t('admin.studentID') || 'ID'}</TableHead>
                      <TableHead className="text-[#6b7280] font-medium">{t('admin.name') || 'Name'}</TableHead>
                      <TableHead className="text-[#6b7280] font-medium">{t('admin.grade') || 'Grade'}</TableHead>
                      <TableHead className="text-[#6b7280] font-medium">{t('admin.enrollmentDate') || 'Enrollment Date'}</TableHead>
                      <TableHead className="text-[#6b7280] font-medium">{t('admin.classesTaken') || 'Classes'}</TableHead>
                      <TableHead className="text-[#6b7280] font-medium">{t('admin.balanceAmount') || 'Balance'}</TableHead>
                      <TableHead className="text-[#6b7280] font-medium">{t('admin.performance') || 'Performance'}</TableHead>
                      <TableHead className="text-right text-[#6b7280] font-medium">{t('admin.actions') || 'Actions'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentStudents.length > 0 ? (
                      currentStudents.map((student) => (
                        <TableRow key={student.id} className="border-b border-[#eaeef3] hover:bg-[#f9fafb]">
                          <TableCell className="font-medium text-[#333c4d]">{student.id}</TableCell>
                          <TableCell className="text-[#4b5563]">{student.name}</TableCell>
                          <TableCell className="text-[#4b5563]">{student.grade}</TableCell>
                          <TableCell className="text-[#4b5563]">{formatDate(student.enrollmentDate)}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1.5">
                              {student.classes.map((cls, index) => (
                                <Badge key={index} variant="outline" className="bg-[#f1f3f9] text-[#5661b3] border-[#e2e5f0] px-2 py-0.5 rounded-md text-xs">
                                  {cls}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className={student.balance > 0 ? 'text-[#b35661]' : 'text-[#56b374]'}>
                            {formatCurrency(student.balance)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-20 bg-[#eaeef3] rounded-full overflow-hidden">
                                <div 
                                  className={`h-2 rounded-full ${
                                    student.performanceScore >= 90 ? 'bg-[#56b374]' : 
                                    student.performanceScore >= 80 ? 'bg-[#5661b3]' :
                                    student.performanceScore >= 70 ? 'bg-[#b3a956]' : 'bg-[#b35661]'
                                  }`} 
                                  style={{ width: `${student.performanceScore}%` }}
                                />
                              </div>
                              <span className="text-xs text-[#6b7280]">{student.performanceScore}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 px-3 rounded-lg text-[#5661b3] hover:bg-[#f1f3f9] hover:text-[#424a8c]">
                              {t('admin.view') || 'View'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-12 text-[#6b7280]">
                          {t('admin.noStudentsFound') || 'No students found'}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              
              {/* Pagination */}
              {filteredStudents.length > 0 && (
                <div className="border-t border-[#eaeef3] p-5 flex items-center justify-between">
                  <div className="text-sm text-[#6b7280]">
                    {t('admin.showingResults', { 
                      start: startIndex + 1, 
                      end: endIndex, 
                      total: filteredStudents.length 
                    }) || `Showing ${startIndex + 1} to ${endIndex} of ${filteredStudents.length} results`}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="rounded-lg border-[#eaeef3] h-9 w-9 text-[#6b7280] hover:bg-[#f1f3f9] hover:text-[#333c4d] disabled:opacity-50"
                    >
                      <CaretLeft className="h-4 w-4" />
                    </Button>
                    
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <Button 
                          key={page} 
                          variant={page === currentPage ? "default" : "outline"} 
                          size="sm"
                          className={`h-9 w-9 p-0 rounded-lg ${
                            page === currentPage ? 'bg-[#5661b3] hover:bg-[#4a538f] text-white' : 'border-[#eaeef3] text-[#6b7280] hover:bg-[#f1f3f9] hover:text-[#333c4d]'
                          }`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="rounded-lg border-[#eaeef3] h-9 w-9 text-[#6b7280] hover:bg-[#f1f3f9] hover:text-[#333c4d] disabled:opacity-50"
                    >
                      <CaretRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>
          
          {/* Classes Tab */}
          <TabsContent value="classes" className="flex-1 data-[state=active]:flex flex-col gap-6 overflow-auto">
            <Card className="bg-white border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-xl overflow-hidden flex-1 flex flex-col">
              <CardHeader className="border-b border-[#eaeef3] px-6 py-5">
                <CardTitle className="flex items-center gap-2 text-[#333c4d]">
                  <Book className="h-5 w-5 text-[#5661b3]" />
                  {t('admin.classManagement') || 'Class Management'}
                </CardTitle>
                <CardDescription className="text-[#6b7280] mt-1">
                  {t('admin.classManagementDesc') || 'View and manage all classes'}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center p-12">
                <div className="text-center text-[#6b7280]">
                  {t('admin.classesComingSoon') || 'Class management features coming soon'}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Finances Tab */}
          <TabsContent value="finances" className="flex-1 data-[state=active]:flex flex-col gap-6 overflow-auto">
            <Card className="bg-white border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-xl overflow-hidden flex-1 flex flex-col">
              <CardHeader className="border-b border-[#eaeef3] px-6 py-5">
                <CardTitle className="flex items-center gap-2 text-[#333c4d]">
                  <CurrencyDollar className="h-5 w-5 text-[#5661b3]" />
                  {t('admin.financialManagement') || 'Financial Management'}
                </CardTitle>
                <CardDescription className="text-[#6b7280] mt-1">
                  {t('admin.financialManagementDesc') || 'Manage finances and payments'}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center p-12">
                <div className="text-center text-[#6b7280]">
                  {t('admin.financesComingSoon') || 'Financial management features coming soon'}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard; 