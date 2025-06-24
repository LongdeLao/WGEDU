import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import { 
  CurrencyDollar, 
  ArrowDown, 
  ArrowUp, 
  Receipt, 
  CreditCard, 
  Bank, 
  Clock, 
  FileText,
  Money,
  Calculator,
  CaretRight,
  CalendarBlank,
  Star,
  Download
} from '@phosphor-icons/react';

// Types
interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'charge' | 'payment';
  status: 'completed' | 'pending';
  method?: string;
}

interface BalanceDetails {
  currentBalance: number;
  startingBalance: number;
  totalCharged: number;
  totalPaid: number;
  nextPaymentDue: string;
  paymentPlan: string;
}

export const ParentBalanceUI = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Sample data - in a real app this would come from an API
  const balanceDetails: BalanceDetails = {
    currentBalance: 720,
    startingBalance: 2000,
    totalCharged: 1580,
    totalPaid: 300,
    nextPaymentDue: '2024-07-15',
    paymentPlan: 'Monthly'
  };

  const transactions: Transaction[] = [
    { id: 't1', date: '2024-06-20', description: 'Payment - Credit Card', amount: 300, type: 'payment', status: 'completed', method: 'Visa ending in 4242' },
    { id: 't2', date: '2024-06-18', description: 'Class: Mathematics - Advanced', amount: 70, type: 'charge', status: 'completed' },
    { id: 't3', date: '2024-06-15', description: 'Class: Physics - Regular', amount: 60, type: 'charge', status: 'completed' },
    { id: 't4', date: '2024-06-12', description: 'Class: Mathematics - Advanced', amount: 70, type: 'charge', status: 'completed' },
    { id: 't5', date: '2024-06-10', description: 'Class: Physics - Regular', amount: 60, type: 'charge', status: 'completed' },
    { id: 't6', date: '2024-06-05', description: 'Class: Mathematics - Advanced', amount: 70, type: 'charge', status: 'completed' },
    { id: 't7', date: '2024-06-02', description: 'Class: Physics - Regular', amount: 60, type: 'charge', status: 'completed' },
    { id: 't8', date: '2024-05-30', description: 'Registration Fee - 2024 Summer', amount: 250, type: 'charge', status: 'completed' },
    { id: 't9', date: '2024-05-25', description: 'Book Fee - Mathematics Package', amount: 120, type: 'charge', status: 'completed' },
    { id: 't10', date: '2024-05-20', description: 'Materials Fee - Science Lab Kit', amount: 80, type: 'charge', status: 'completed' },
  ];

  // Filter transactions by type
  const chargeTransactions = transactions.filter(t => t.type === 'charge');
  const paymentTransactions = transactions.filter(t => t.type === 'payment');

  // Calculate some derived values
  const classesAttended = chargeTransactions.filter(t => t.description.includes('Class:')).length;
  const remainingPayment = balanceDetails.currentBalance;
  const formattedNextPaymentDate = new Date(balanceDetails.nextPaymentDue).toLocaleDateString();

  const handleMakePayment = () => {
    const amount = Number(paymentAmount);
    if (!amount || amount <= 0) {
      toast({
        title: t('parent.balance.invalidAmount'),
        description: t('parent.balance.enterValidAmount'),
        variant: "destructive"
      });
      return;
    }
    
    if (amount > balanceDetails.currentBalance) {
      toast({
        title: t('parent.balance.excessAmount'),
        description: t('parent.balance.amountExceedsBalance'),
        variant: "destructive"
      });
      return;
    }

    // Here you would integrate with a payment processor
    toast({
      title: t('parent.balance.paymentSuccessful'),
      description: t('parent.balance.paymentProcessed', { amount: amount }),
    });

    setPaymentAmount('');
  };

  const handleDownloadStatement = () => {
    toast({
      title: t('parent.balance.statementDownloaded'),
      description: t('parent.balance.checkDownloadsFolder')
    });
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <header className="flex-shrink-0 mb-6">
        <h1 className="text-2xl font-bold tracking-tight">{t('parent.balance.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('parent.balance.subtitle')}</p>
      </header>

      <div className="flex-1 min-h-0 flex flex-col gap-6 overflow-auto pb-6">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-sm border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('parent.balance.currentBalance')}</p>
                  <p className="text-xl font-bold">${balanceDetails.currentBalance}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <CurrencyDollar weight="fill" className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-destructive">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('parent.balance.totalCharged')}</p>
                  <p className="text-xl font-bold">${balanceDetails.totalCharged}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-destructive/20 flex items-center justify-center">
                  <ArrowDown weight="fill" className="h-5 w-5 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-green-600">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('parent.balance.totalPaid')}</p>
                  <p className="text-xl font-bold">${balanceDetails.totalPaid}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-green-600/20 flex items-center justify-center">
                  <ArrowUp weight="fill" className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-amber-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('parent.balance.nextPaymentDue')}</p>
                  <p className="text-xl font-bold">{formattedNextPaymentDate}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Clock weight="fill" className="h-5 w-5 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 min-h-0 flex flex-col">
          <div className="border-b">
            <TabsList className="h-12">
              <TabsTrigger value="overview" className="data-[state=active]:bg-background rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary h-full px-4">
                <Calculator className="h-4 w-4 mr-2" />
                {t('parent.balance.overview')}
              </TabsTrigger>
              <TabsTrigger value="transactions" className="data-[state=active]:bg-background rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary h-full px-4">
                <Receipt className="h-4 w-4 mr-2" />
                {t('parent.balance.transactions')}
              </TabsTrigger>
              <TabsTrigger value="payments" className="data-[state=active]:bg-background rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary h-full px-4">
                <Money className="h-4 w-4 mr-2" />
                {t('parent.balance.makePayment')}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="flex-1 data-[state=active]:flex flex-col gap-6 overflow-auto p-1">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Balance Summary */}
              <Card className="shadow-sm lg:col-span-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-primary" />
                      {t('parent.balance.balanceSummary')}
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={handleDownloadStatement} className="gap-2">
                      <Download className="h-4 w-4" />
                      {t('parent.balance.downloadStatement')}
                    </Button>
                  </div>
                  <CardDescription>{t('parent.balance.accountOverview')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Account Balance */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm text-muted-foreground">
                      {t('parent.balance.accountBalance')}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">{t('parent.balance.startingBalance')}</p>
                        <p className="text-xl font-semibold">${balanceDetails.startingBalance}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">{t('parent.balance.currentBalance')}</p>
                        <p className="text-xl font-semibold">${balanceDetails.currentBalance}</p>
                      </div>
                    </div>
                  </div>

                  {/* Account Activity */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm text-muted-foreground">
                      {t('parent.balance.accountActivity')}
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-destructive/20 flex items-center justify-center">
                            <ArrowDown className="h-4 w-4 text-destructive" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{t('parent.balance.totalCharged')}</p>
                            <p className="text-xs text-muted-foreground">{classesAttended} {t('parent.balance.classesAttended')}</p>
                          </div>
                        </div>
                        <p className="font-semibold text-destructive">${balanceDetails.totalCharged}</p>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-green-600/20 flex items-center justify-center">
                            <ArrowUp className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{t('parent.balance.totalPaid')}</p>
                            <p className="text-xs text-muted-foreground">{paymentTransactions.length} {t('parent.balance.paymentsProcessed')}</p>
                          </div>
                        </div>
                        <p className="font-semibold text-green-600">${balanceDetails.totalPaid}</p>
                      </div>

                      <div className="flex items-center justify-between p-3 border border-primary/30 rounded-lg bg-primary/5">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <CurrencyDollar className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{t('parent.balance.remainingBalance')}</p>
                            <p className="text-xs text-muted-foreground">{t('parent.balance.toBeSettled')}</p>
                          </div>
                        </div>
                        <p className="font-semibold text-primary">${remainingPayment}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    {t('parent.balance.paymentInfo')}
                  </CardTitle>
                  <CardDescription>{t('parent.balance.billingDetails')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-amber-500" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{t('parent.balance.nextPayment')}</p>
                          <p className="text-xs text-muted-foreground">{t('parent.balance.due')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formattedNextPaymentDate}</p>
                        <p className="text-xs text-muted-foreground">${balanceDetails.currentBalance}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <CalendarBlank className="h-4 w-4 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{t('parent.balance.paymentPlan')}</p>
                          <p className="text-xs text-muted-foreground">{t('parent.balance.recurringSchedule')}</p>
                        </div>
                      </div>
                      <p className="font-semibold">{balanceDetails.paymentPlan}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button onClick={() => setActiveTab('payments')} className="w-full">
                        {t('parent.balance.makePayment')}
                      </Button>
                      <Button variant="outline" className="w-full">
                        {t('parent.balance.viewPaymentHistory')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-primary" />
                  {t('parent.balance.recentTransactions')}
                </CardTitle>
                <CardDescription>{t('parent.balance.last5Transactions')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {transactions.slice(0, 5).map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full ${
                          transaction.type === 'charge' 
                            ? 'bg-destructive/20' 
                            : 'bg-green-600/20'
                          } flex items-center justify-center`}>
                          {transaction.type === 'charge' 
                            ? <ArrowDown className="h-4 w-4 text-destructive" />
                            : <ArrowUp className="h-4 w-4 text-green-600" />
                          }
                        </div>
                        <div>
                          <p className="font-medium text-sm">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.type === 'charge' 
                            ? 'text-destructive' 
                            : 'text-green-600'
                          }`}>
                          {transaction.type === 'charge' ? '-' : '+'} ${transaction.amount}
                        </p>
                        <Badge variant={transaction.status === 'completed' ? 'outline' : 'secondary'} className="text-xs">
                          {transaction.status === 'completed' 
                            ? t('parent.balance.completed') 
                            : t('parent.balance.pending')}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center">
                  <Button variant="link" onClick={() => setActiveTab('transactions')} className="gap-1">
                    {t('parent.balance.viewAllTransactions')}
                    <CaretRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="flex-1 data-[state=active]:flex flex-col gap-6 overflow-auto p-1">
            <Card className="shadow-sm flex-1 flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-primary" />
                  {t('parent.balance.transactionHistory')}
                </CardTitle>
                <CardDescription>{t('parent.balance.allTransactions')}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto">
                <div className="space-y-3">
                  {transactions.map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full ${
                          transaction.type === 'charge' 
                            ? 'bg-destructive/20' 
                            : 'bg-green-600/20'
                          } flex items-center justify-center`}>
                          {transaction.type === 'charge' 
                            ? <ArrowDown className="h-4 w-4 text-destructive" />
                            : <ArrowUp className="h-4 w-4 text-green-600" />
                          }
                        </div>
                        <div>
                          <p className="font-medium text-sm">{transaction.description}</p>
                          <div className="flex items-center text-xs text-muted-foreground gap-2">
                            <span>{new Date(transaction.date).toLocaleDateString()}</span>
                            {transaction.method && (
                              <span className="flex items-center gap-1">
                                <span>•</span>
                                <span>{transaction.method}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.type === 'charge' 
                            ? 'text-destructive' 
                            : 'text-green-600'
                          }`}>
                          {transaction.type === 'charge' ? '-' : '+'} ${transaction.amount}
                        </p>
                        <Badge variant={transaction.status === 'completed' ? 'outline' : 'secondary'} className="text-xs">
                          {transaction.status === 'completed' 
                            ? t('parent.balance.completed') 
                            : t('parent.balance.pending')}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="flex-1 data-[state=active]:flex flex-col gap-6 overflow-auto p-1">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Make a Payment */}
              <Card className="shadow-sm lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Money className="h-5 w-5 text-primary" />
                    {t('parent.balance.makePayment')}
                  </CardTitle>
                  <CardDescription>{t('parent.balance.settleBalance')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">{t('parent.balance.paymentAmount')}</p>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input 
                          type="number"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                          className="pl-7"
                          placeholder={t('parent.balance.enterAmount')}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">{t('parent.balance.quickAmounts')}</p>
                      <div className="flex flex-wrap gap-2">
                        {[100, 200, 500, balanceDetails.currentBalance].map((amount, index) => (
                          <Button 
                            key={index} 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setPaymentAmount(amount.toString())}
                          >
                            ${amount}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">{t('parent.balance.paymentMethod')}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="flex items-center p-3 border rounded-lg bg-muted/30">
                        <CreditCard className="h-5 w-5 mr-2 text-primary" />
                        <span className="text-sm">Visa •••• 4242</span>
                        <Badge className="ml-auto bg-primary/20 text-primary border-primary" variant="outline">
                          {t('parent.balance.default')}
                        </Badge>
                      </div>
                      <div className="flex items-center p-3 border rounded-lg">
                        <Bank className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span className="text-sm">{t('parent.balance.bankTransfer')}</span>
                      </div>
                      <div className="flex items-center p-3 border rounded-lg">
                        <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span className="text-sm">{t('parent.balance.addNew')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-medium">{t('parent.balance.paymentSummary')}</p>
                      <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">{t('parent.balance.currentBalance')}</p>
                        <p className="text-sm font-medium">${balanceDetails.currentBalance}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">{t('parent.balance.paymentAmount')}</p>
                        <p className="text-sm font-medium">${paymentAmount || '0'}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <p className="font-medium">{t('parent.balance.remainingAfter')}</p>
                        <p className="font-bold">
                          ${paymentAmount ? (balanceDetails.currentBalance - Number(paymentAmount)).toFixed(2) : balanceDetails.currentBalance}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleMakePayment} 
                    disabled={!paymentAmount || Number(paymentAmount) <= 0} 
                    className="w-full"
                  >
                    {t('parent.balance.processPayment')}
                  </Button>
                </CardContent>
              </Card>

              {/* Payment History */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-primary" />
                    {t('parent.balance.paymentHistory')}
                  </CardTitle>
                  <CardDescription>{t('parent.balance.previousPayments')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {paymentTransactions.length > 0 ? (
                      paymentTransactions.map(payment => (
                        <div key={payment.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{payment.description}</p>
                            <p className="text-xs text-muted-foreground">{new Date(payment.date).toLocaleDateString()}</p>
                          </div>
                          <p className="font-semibold text-green-600">+${payment.amount}</p>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-3">
                          <Receipt className="h-7 w-7 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground text-center">
                          {t('parent.balance.noPaymentsYet')}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ParentBalanceUI; 