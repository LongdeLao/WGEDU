import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { format, parseISO, isToday, isTomorrow, addDays, isSameDay, compareAsc, isThisWeek, 
  startOfMonth, endOfMonth, eachDayOfInterval, getDay, getDaysInMonth, addMonths, subMonths } from 'date-fns';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  User, 
  BookOpen,
  FileText,
  X
} from 'lucide-react';

// Define event types and colors
const EVENT_COLORS = {
  class: {
    bg: 'bg-pastel-blue/20 dark:bg-pastel-blue/30',
    text: 'text-pastel-blue dark:text-pastel-blue',
    border: 'border-pastel-blue dark:border-pastel-blue',
    dot: 'bg-pastel-blue'
  },
  exam: {
    bg: 'bg-pastel-red/20 dark:bg-pastel-red/30',
    text: 'text-pastel-red dark:text-pastel-red',
    border: 'border-pastel-red dark:border-pastel-red',
    dot: 'bg-pastel-red'
  },
  homework: {
    bg: 'bg-pastel-yellow/20 dark:bg-pastel-yellow/30',
    text: 'text-pastel-yellow dark:text-pastel-yellow',
    border: 'border-pastel-yellow dark:border-pastel-yellow',
    dot: 'bg-pastel-yellow'
  },
  meeting: {
    bg: 'bg-pastel-purple/20 dark:bg-pastel-purple/30',
    text: 'text-pastel-purple dark:text-pastel-purple',
    border: 'border-pastel-purple dark:border-pastel-purple',
    dot: 'bg-pastel-purple'
  }
};

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
  extendedProps: {
    type: 'class' | 'exam' | 'meeting' | 'homework';
    teacher?: string;
    subject?: string;
    description?: string;
  };
}

const CalendarView = () => {
  const { t } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  // Mock events - in a real app these would come from an API
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(today.getDate() + 2);
    
    const mockEvents: CalendarEvent[] = [
      {
        id: '1',
        title: 'Math Class',
        start: `${format(today, 'yyyy-MM-dd')}T09:00:00`,
        end: `${format(today, 'yyyy-MM-dd')}T10:30:00`,
        extendedProps: {
          type: 'class',
          teacher: 'Mrs. Johnson',
          subject: 'Mathematics',
          description: 'Advanced calculus'
        }
      },
      {
        id: '2',
        title: 'Physics Homework Due',
        start: `${format(today, 'yyyy-MM-dd')}T23:59:00`,
        allDay: true,
        extendedProps: {
          type: 'homework',
          subject: 'Physics',
          description: 'Chapter 5 problems'
        }
      },
      {
        id: '3',
        title: 'Literature Class',
        start: `${format(tomorrow, 'yyyy-MM-dd')}T14:00:00`,
        end: `${format(tomorrow, 'yyyy-MM-dd')}T15:30:00`,
        extendedProps: {
          type: 'class',
          teacher: 'Mr. Smith',
          subject: 'English Literature',
          description: 'Shakespearean Sonnets'
        }
      },
      {
        id: '4',
        title: 'Chemistry Exam',
        start: `${format(dayAfterTomorrow, 'yyyy-MM-dd')}T10:00:00`,
        end: `${format(dayAfterTomorrow, 'yyyy-MM-dd')}T12:00:00`,
        extendedProps: {
          type: 'exam',
          teacher: 'Dr. White',
          subject: 'Chemistry',
          description: 'Final exam covering all material'
        }
      },
      {
        id: '5',
        title: 'Parent-Teacher Meeting',
        start: `${format(dayAfterTomorrow, 'yyyy-MM-dd')}T16:00:00`,
        end: `${format(dayAfterTomorrow, 'yyyy-MM-dd')}T16:30:00`,
        extendedProps: {
          type: 'meeting',
          teacher: 'Multiple Teachers',
          description: 'Discuss academic progress'
        }
      }
    ];
    
    setEvents(mockEvents);
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = parseISO(event.start);
      return isSameDay(eventDate, date);
    });
  };

  const getUpcomingEvents = () => {
    const now = new Date();
    return events
      .filter(event => {
        const eventDate = parseISO(event.start);
        return compareAsc(eventDate, now) >= 0;
      })
      .sort((a, b) => compareAsc(parseISO(a.start), parseISO(b.start)))
      .slice(0, 5);
  };

  const formatEventDay = (dateStr: string) => {
    const date = parseISO(dateStr);
    if (isToday(date)) return t('calendar.today');
    if (isTomorrow(date)) return t('calendar.tomorrow');
    if (isThisWeek(date)) return format(date, 'EEE');
    return format(date, 'MMM d');
  };

  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    
    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // Create an array for all days in the current month
    const daysInMonth = Array.from({ length: getDaysInMonth(currentMonth) }, 
      (_, i) => new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1));
    
    // Add empty spaces for days before the first day of the month
    const emptyDaysBefore = Array(firstDayOfWeek).fill(null);
    
    // Calculate days to show from the previous month
    const allDays = [...emptyDaysBefore, ...daysInMonth];
    
    // Fill up to complete 6 rows (42 days)
    while (allDays.length < 42) {
      allDays.push(null);
    }
    
    return allDays;
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <header className="flex-shrink-0 mb-3">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">{t('calendar.title')}</h1>
        <p className="text-sm text-muted-foreground dark:text-gray-400">{t('calendar.subtitle')}</p>
      </header>

      <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
        {/* Navigation Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-shrink-0">
          {/* Month Navigation */}
          <Card className="shadow-sm border-l-4 border-l-pastel-blue rounded-xl dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
              <CardTitle className="font-bold text-base flex items-center gap-2 dark:text-white">
                <CalendarIcon className="h-4 w-4 text-pastel-blue" />
                {format(currentMonth, 'MMMM yyyy')}
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 rounded-full dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={prevMonth}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-8 text-xs rounded-full dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                  onClick={goToToday}
                >
                  {t('calendar.today')}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 rounded-full dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={nextMonth}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
          </Card>
          
          {/* View Selector */}
          <Card className="shadow-sm border-l-4 border-l-pastel-purple rounded-xl dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
              <CardTitle className="font-bold text-base flex items-center gap-2 dark:text-white">
                <Clock className="h-4 w-4 text-pastel-purple" />
                {t('calendar.view')}
              </CardTitle>
              <Tabs 
                value={view} 
                onValueChange={(v) => setView(v as 'month' | 'week' | 'day')}
                className="h-8"
              >
                <TabsList className="bg-muted h-8 rounded-full p-0.5 dark:bg-gray-700">
                  <TabsTrigger 
                    value="month" 
                    className="text-xs h-7 rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 dark:text-gray-200 data-[state=active]:shadow-sm"
                  >
                    {t('calendar.month')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="week" 
                    className="text-xs h-7 rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 dark:text-gray-200 data-[state=active]:shadow-sm"
                  >
                    {t('calendar.week')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="day" 
                    className="text-xs h-7 rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 dark:text-gray-200 data-[state=active]:shadow-sm"
                  >
                    {t('calendar.day')}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-3 overflow-hidden">
          {/* Left Column - Calendar */}
          <Card className="lg:col-span-2 shadow-sm rounded-xl flex flex-col overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="py-3 px-4 border-b dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-pastel-blue/20 dark:bg-pastel-blue/30 flex items-center justify-center">
                    <CalendarIcon className="h-3 w-3 text-pastel-blue" />
                  </div>
                  <CardTitle className="text-sm dark:text-white">{t('calendar.yourCalendar')}</CardTitle>
                </div>
                <Badge 
                  variant="outline" 
                  className="bg-pastel-blue/10 text-pastel-blue border-pastel-blue rounded-full dark:bg-pastel-blue/20"
                >
                  {format(selectedDate, 'MMMM yyyy')}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="p-3 md:p-4 flex-1 overflow-y-auto">
              {/* Custom Calendar */}
              <div>
                {/* Day headers */}
                <div className="grid grid-cols-7 mb-2">
                  {dayNames.map((day, i) => (
                    <div 
                      key={i} 
                      className="text-center text-xs font-medium text-muted-foreground dark:text-gray-400 py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1.5">
                  {generateCalendarDays().map((day, i) => {
                    // For each day, get events
                    const dayEvents = day ? getEventsForDate(day) : [];
                    const isSelectedDate = day && isSameDay(day, selectedDate);
                    const isCurrentDay = day && isToday(day);
                    const isCurrentMonth = day && day.getMonth() === currentMonth.getMonth();
                    
                    return (
                      <div 
                        key={i}
                        className={cn(
                          "min-h-[80px] md:min-h-[100px] rounded-xl border p-1 relative",
                          !day ? "border-transparent" : "border-gray-100 dark:border-gray-700",
                          isSelectedDate ? "border-pastel-blue dark:border-pastel-blue" : "",
                          isCurrentMonth ? "bg-white dark:bg-gray-800" : "bg-gray-50/50 dark:bg-gray-900/50",
                          day && "hover:border-pastel-blue/60 dark:hover:border-pastel-blue/60 cursor-pointer transition-colors"
                        )}
                        onClick={() => day && handleDateClick(day)}
                      >
                        {day && (
                          <>
                            <div className="flex justify-between items-start p-1">
                              <span 
                                className={cn(
                                  "h-6 w-6 flex items-center justify-center text-xs rounded-full",
                                  isCurrentDay ? "bg-pastel-blue text-white font-medium" : "text-gray-700 dark:text-gray-300"
                                )}
                              >
                                {format(day, 'd')}
                              </span>
                              {dayEvents.length > 0 && (
                                <span className="text-[10px] text-muted-foreground dark:text-gray-400 font-medium">
                                  {dayEvents.length}
                                </span>
                              )}
                            </div>
                            
                            <div className="mt-1 space-y-1 max-h-[50px] md:max-h-[70px] overflow-hidden">
                              {dayEvents.slice(0, 2).map((event) => (
                                <div 
                                  key={event.id}
                                  className={cn(
                                    "px-2 py-0.5 rounded-lg text-xs truncate cursor-pointer",
                                    EVENT_COLORS[event.extendedProps.type].bg,
                                    EVENT_COLORS[event.extendedProps.type].text
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEventClick(event);
                                  }}
                                >
                                  {!event.allDay && format(parseISO(event.start), 'HH:mm')} {event.title}
                                </div>
                              ))}
                              {dayEvents.length > 2 && (
                                <div className="px-2 py-0.5 text-[10px] text-muted-foreground dark:text-gray-400">
                                  +{dayEvents.length - 2} more
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Right Column - Events */}
          <div className="grid grid-cols-1 gap-3 h-full overflow-hidden">
            {/* Selected Date Events */}
            <Card className="shadow-sm rounded-xl flex flex-col overflow-hidden dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="py-3 px-4 border-b dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-pastel-blue/20 dark:bg-pastel-blue/30 flex items-center justify-center">
                    <CalendarIcon className="h-3 w-3 text-pastel-blue" />
                  </div>
                  <div>
                    <CardTitle className="text-sm flex items-center gap-2 dark:text-white">
                      {format(selectedDate, 'MMMM d, yyyy')}
                      {isToday(selectedDate) && (
                        <Badge className="bg-pastel-blue text-white rounded-full ml-1 text-[10px] py-0 h-4">
                          {t('calendar.today')}
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-xs dark:text-gray-400">
                      {getEventsForDate(selectedDate).length} {t('calendar.eventsScheduled')}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-3 flex-1 overflow-y-auto">
                {getEventsForDate(selectedDate).length > 0 ? (
                  <div className="space-y-2">
                    {getEventsForDate(selectedDate).map((event) => (
                      <div 
                        key={event.id} 
                        className={cn(
                          "p-3 rounded-xl cursor-pointer",
                          EVENT_COLORS[event.extendedProps.type].bg
                        )}
                        onClick={() => handleEventClick(event)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={cn("font-medium text-sm", EVENT_COLORS[event.extendedProps.type].text)}>
                            {event.title}
                          </h4>
                          <Badge 
                            variant="outline"
                            className={cn(
                              "text-[10px] py-0 h-4 rounded-full",
                              EVENT_COLORS[event.extendedProps.type].text,
                              EVENT_COLORS[event.extendedProps.type].border
                            )}
                          >
                            {t(`calendar.types.${event.extendedProps.type}`)}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center text-xs text-muted-foreground dark:text-gray-400 gap-2">
                          <Clock className="h-3 w-3" />
                          <span>
                            {event.allDay ? 
                              t('calendar.allDay') : 
                              `${format(parseISO(event.start), 'HH:mm')} ${event.end ? `- ${format(parseISO(event.end), 'HH:mm')}` : ''}`
                            }
                          </span>
                        </div>
                        
                        {event.extendedProps.teacher && (
                          <div className="flex items-center text-xs text-muted-foreground dark:text-gray-400 mt-2 gap-2">
                            <User className="h-3 w-3" />
                            <span>{event.extendedProps.teacher}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center py-6 text-muted-foreground dark:text-gray-400 text-sm">
                    <p>{t('calendar.noEvents')}</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Upcoming Events */}
            <Card className="shadow-sm rounded-xl flex flex-col overflow-hidden dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="py-3 px-4 border-b dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-pastel-purple/20 dark:bg-pastel-purple/30 flex items-center justify-center">
                    <Clock className="h-3 w-3 text-pastel-purple" />
                  </div>
                  <div>
                    <CardTitle className="text-sm dark:text-white">{t('calendar.upcomingEvents')}</CardTitle>
                    <CardDescription className="text-xs dark:text-gray-400">
                      {getUpcomingEvents().length} {t('calendar.upcoming')}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-0 flex-1 overflow-y-auto">
                {getUpcomingEvents().length > 0 ? (
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {getUpcomingEvents().map((event) => (
                      <div 
                        key={event.id}
                        className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => {
                          const date = parseISO(event.start);
                          setSelectedDate(date);
                          handleEventClick(event);
                        }}
                      >
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-medium flex items-center gap-1 dark:text-gray-300">
                            <div className={cn("w-2 h-2 rounded-full", EVENT_COLORS[event.extendedProps.type].dot)} />
                            {formatEventDay(event.start)}
                          </span>
                          <Badge 
                            variant="outline"
                            className={cn(
                              "text-[10px] py-0 h-4 rounded-full",
                              EVENT_COLORS[event.extendedProps.type].text,
                              EVENT_COLORS[event.extendedProps.type].border
                            )}
                          >
                            {t(`calendar.types.${event.extendedProps.type}`)}
                          </Badge>
                        </div>
                        
                        <h4 className="font-medium text-sm mb-1 dark:text-white">{event.title}</h4>
                        
                        <div className="flex items-center text-xs text-muted-foreground dark:text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>
                            {event.allDay ? 
                              t('calendar.allDay') : 
                              `${format(parseISO(event.start), 'HH:mm')} ${event.end ? `- ${format(parseISO(event.end), 'HH:mm')}` : ''}`
                            }
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center py-6 text-muted-foreground dark:text-gray-400 text-sm">
                    <p>{t('calendar.noEvents')}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4 dark:bg-black/50">
          <Card className="max-w-md w-full rounded-2xl shadow-xl border-0 dark:bg-gray-800">
            <div 
              className={cn(
                "h-2 w-full rounded-t-2xl",
                EVENT_COLORS[selectedEvent.extendedProps.type].dot
              )} 
            />
            
            <CardHeader className="relative pb-2 pt-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-4 top-4 rounded-full h-7 w-7 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700" 
                onClick={closeEventDetails}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <CardTitle className="pr-8 text-lg dark:text-white">{selectedEvent.title}</CardTitle>
              <CardDescription className="flex items-center gap-1 dark:text-gray-300">
                <div className={cn("w-2 h-2 rounded-full", EVENT_COLORS[selectedEvent.extendedProps.type].dot)} />
                {t(`calendar.types.${selectedEvent.extendedProps.type}`)}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4 px-4">
              <div className="flex items-center gap-3 pb-2 border-b dark:border-gray-700">
                <div className={cn(
                  "p-2 rounded-full flex items-center justify-center", 
                  EVENT_COLORS[selectedEvent.extendedProps.type].bg
                )}>
                  <CalendarIcon className={cn("h-4 w-4", EVENT_COLORS[selectedEvent.extendedProps.type].text)} />
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-white">
                    {format(parseISO(selectedEvent.start), 'EEEE, MMMM d, yyyy')}
                  </p>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">
                    {selectedEvent.allDay ? 
                      t('calendar.allDay') : 
                      `${format(parseISO(selectedEvent.start), 'HH:mm')} ${selectedEvent.end ? `- ${format(parseISO(selectedEvent.end), 'HH:mm')}` : ''}`
                    }
                  </p>
                </div>
              </div>

              {selectedEvent.extendedProps.teacher && (
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-full flex items-center justify-center", 
                    EVENT_COLORS[selectedEvent.extendedProps.type].bg
                  )}>
                    <User className={cn("h-4 w-4", EVENT_COLORS[selectedEvent.extendedProps.type].text)} />
                  </div>
                  <div>
                    <p className="text-sm font-medium dark:text-white">{t('calendar.teacher')}</p>
                    <p className="text-xs text-muted-foreground dark:text-gray-400">{selectedEvent.extendedProps.teacher}</p>
                  </div>
                </div>
              )}

              {selectedEvent.extendedProps.subject && (
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-full flex items-center justify-center", 
                    EVENT_COLORS[selectedEvent.extendedProps.type].bg
                  )}>
                    <BookOpen className={cn("h-4 w-4", EVENT_COLORS[selectedEvent.extendedProps.type].text)} />
                  </div>
                  <div>
                    <p className="text-sm font-medium dark:text-white">{t('calendar.subject')}</p>
                    <p className="text-xs text-muted-foreground dark:text-gray-400">{selectedEvent.extendedProps.subject}</p>
                  </div>
                </div>
              )}

              {selectedEvent.extendedProps.description && (
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-full flex items-center justify-center", 
                    EVENT_COLORS[selectedEvent.extendedProps.type].bg
                  )}>
                    <FileText className={cn("h-4 w-4", EVENT_COLORS[selectedEvent.extendedProps.type].text)} />
                  </div>
                  <div>
                    <p className="text-sm font-medium dark:text-white">{t('calendar.description')}</p>
                    <p className="text-xs text-muted-foreground dark:text-gray-400">{selectedEvent.extendedProps.description}</p>
                  </div>
                </div>
              )}
            </CardContent>
            
            <div className="px-6 py-4 flex justify-end border-t dark:border-gray-700">
              <Button 
                onClick={closeEventDetails}
                className="rounded-full h-8 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                {t('common.close')}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CalendarView; 