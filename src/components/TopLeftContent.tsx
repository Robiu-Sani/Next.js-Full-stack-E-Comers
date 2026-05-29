import { 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator 
} from '@radix-ui/react-dropdown-menu'
import { 
  Package,
  Bell,
  Clock,
  Calendar as CalendarIcon,
  Gift,
  AlertTriangle,
  Timer,
  Trash2
} from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

interface TopLeftContentProps {
  isMobile: boolean;
  userRole?: 'admin' | 'manager' | 'staff' | 'customer';
  onAction?: (action: string) => void;
}

interface Alert {
  id: string;
  message: string;
  scheduledTime: string; // ISO string
  interval: number; // minutes
  repeat: boolean;
  isActive: boolean;
  createdAt: string;
}

export default function TopLeftContent({ isMobile,  onAction }: TopLeftContentProps) {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [newAlert, setNewAlert] = useState<Omit<Alert, 'id' | 'createdAt'>>({
    message: '',
    scheduledTime: new Date().toISOString(),
    interval: 1,
    repeat: false,
    isActive: true
  });

  // Load alerts from localStorage on component mount
  useEffect(() => {
    const savedAlerts = localStorage.getItem('ecommerce-alerts');
    if (savedAlerts) {
      try {
        setAlerts(JSON.parse(savedAlerts));
      } catch (error) {
        console.error('Error parsing alerts from localStorage:', error);
      }
    }
  }, []);

  // Save alerts to localStorage whenever alerts change
  useEffect(() => {
    localStorage.setItem('ecommerce-alerts', JSON.stringify(alerts));
  }, [alerts]);

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour12: true, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }));
      setCurrentDate(now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check for due alerts every minute
  useEffect(() => {
    const checkAlerts = () => {
      const now = new Date();
      const activeAlerts = alerts.filter(alert => alert.isActive);

      activeAlerts.forEach(alert => {
        const scheduledTime = new Date(alert.scheduledTime);
        const timeDiff = now.getTime() - scheduledTime.getTime();
        const minutesDiff = Math.floor(timeDiff / (1000 * 60));

        // Check if it's time to show the alert
        if (minutesDiff >= 0 && minutesDiff % alert.interval === 0) {
          // Show toast notification
          toast.info(`🔔 Alert: ${alert.message}`, {
            description: `Scheduled for ${scheduledTime.toLocaleTimeString()}`,
            duration: 5000,
            action: {
              label: 'Dismiss',
              onClick: () => console.log('Dismissed')
            },
          });

          // If not repeating, deactivate after 30 minutes
          if (!alert.repeat && minutesDiff >= 30) {
            setAlerts(prev => prev.map(a => 
              a.id === alert.id ? { ...a, isActive: false } : a
            ));
          }
        }
      });
    };

    checkAlerts();
    const interval = setInterval(checkAlerts, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [alerts]);

  const handleAction = (action: string) => {
    if (onAction) {
      onAction(action);
    }

    // Handle navigation actions
    switch (action) {
      case 'home':
        router.push('/');
        break;
      case 'products':
        router.push('/products');
        break;
      case 'offers':
        router.push('/offers');
        break;
      default:
        console.log(`Action: ${action}`);
    }
  };

  const createAlert = () => {
    if (!newAlert.message.trim()) {
      toast.error('Please enter an alert message');
      return;
    }

    const alert: Alert = {
      id: Date.now().toString(),
      ...newAlert,
      createdAt: new Date().toISOString()
    };

    setAlerts(prev => [...prev, alert]);
    setNewAlert({
      message: '',
      scheduledTime: new Date().toISOString(),
      interval: 1,
      repeat: false,
      isActive: true
    });
    setShowAlertDialog(false);
    
    toast.success('Alert created successfully!', {
      description: `Will trigger at ${new Date(alert.scheduledTime).toLocaleTimeString()}`
    });
  };

  const deleteAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    toast.success('Alert deleted successfully');
  };

  const toggleAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const activeAlertsCount = alerts.filter(alert => alert.isActive).length;

  const commonActions = [
    {
      icon: <Package className="size-4" />,
      label: "Products",
      action: "products",
      description: "Browse all products"
    },
    {
      icon: <Gift className="size-4" />,
      label: "Offers",
      action: "offers",
      description: "Special offers & deals"
    },
  ];


  return (
    <>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-64 sm:min-w-96 max-w-md z-[1000] rounded-lg bg-background border shadow-lg"
        align="start"
        side={isMobile ? "bottom" : "right"}
        sideOffset={4}
      >
        {/* Time & Date Header */}
        <div className="px-4 py-3 border-b bg-muted/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-muted-foreground" />
              <span className="font-mono text-sm font-medium">{currentTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="size-4 text-muted-foreground" />
              <span className="text-sm">{currentDate}</span>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <DropdownMenuLabel className="text-foreground font-semibold text-sm px-4 py-2">
          Quick Navigation
        </DropdownMenuLabel>
        
        {commonActions.map((action) => (
          <DropdownMenuItem 
            key={action.action}
            className="flex items-center gap-3 p-3 cursor-pointer hover:bg-accent transition-colors"
            onClick={() => handleAction(action.action)}
          >
            <div className="flex size-8 items-center justify-center rounded-md border bg-background">
              {action.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground">{action.label}</div>
              <div className="text-xs text-muted-foreground truncate">{action.description}</div>
            </div>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {/* Alert System */}
        <DropdownMenuLabel className="text-foreground font-semibold text-sm px-4 py-2 flex items-center justify-between">
          <span>Alert System</span>
          <Badge variant={activeAlertsCount > 0 ? "default" : "secondary"}>
            {activeAlertsCount} Active
          </Badge>
        </DropdownMenuLabel>

        <Dialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
          <DialogTrigger asChild>
            <DropdownMenuItem 
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-accent transition-colors"
              onSelect={(e) => e.preventDefault()}
            >
              <div className="flex size-8 items-center justify-center rounded-md border bg-background">
                <AlertTriangle className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">Create Alert</div>
                <div className="text-xs text-muted-foreground">Set timed notifications</div>
              </div>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Alert</DialogTitle>
              <DialogDescription>
                Set up automated alerts that will trigger at specified times.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="alert-message">Alert Message</Label>
                <Textarea
                  id="alert-message"
                  placeholder="Enter your alert message..."
                  value={newAlert.message}
                  onChange={(e) => setNewAlert(prev => ({ ...prev, message: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheduled-time">Scheduled Time</Label>
                <Input
                  type="datetime-local"
                  id="scheduled-time"
                  value={new Date(newAlert.scheduledTime).toISOString().slice(0, 16)}
                  onChange={(e) => setNewAlert(prev => ({ 
                    ...prev, 
                    scheduledTime: new Date(e.target.value).toISOString() 
                  }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="interval">Interval (minutes)</Label>
                  <Input
                    type="number"
                    id="interval"
                    min="1"
                    max="60"
                    value={newAlert.interval}
                    onChange={(e) => setNewAlert(prev => ({ 
                      ...prev, 
                      interval: parseInt(e.target.value) 
                    }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="repeat">Repeat</Label>
                  <Select
                    value={newAlert.repeat ? "true" : "false"}
                    onValueChange={(value) => setNewAlert(prev => ({ 
                      ...prev, 
                      repeat: value === "true" 
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">No Repeat</SelectItem>
                      <SelectItem value="true">Repeat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAlertDialog(false)}>
                Cancel
              </Button>
              <Button onClick={createAlert}>
                <Timer className="size-4 mr-2" />
                Create Alert
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Active Alerts List */}
        {alerts.slice(0, 3).map((alert) => (
          <DropdownMenuItem 
            key={alert.id}
            className="flex items-center gap-3 p-3 cursor-pointer hover:bg-accent transition-colors"
            onClick={() => toggleAlert(alert.id)}
          >
            <div className={`flex size-8 items-center justify-center rounded-md border ${
              alert.isActive ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'
            }`}>
              <Bell className={`size-4 ${alert.isActive ? 'text-green-600' : 'text-gray-400'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground flex items-center gap-2">
                {alert.message}
                {!alert.isActive && (
                  <Badge variant="outline" className="text-xs">Inactive</Badge>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(alert.scheduledTime).toLocaleString()} • Every {alert.interval}min
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                deleteAlert(alert.id);
              }}
            >
              <Trash2 className="size-3 text-red-500" />
            </Button>
          </DropdownMenuItem>
        ))}

        {alerts.length > 3 && (
          <DropdownMenuItem 
            className="flex items-center justify-center p-2 text-xs text-muted-foreground"
            onClick={() => handleAction('view-all-alerts')}
          >
            View all {alerts.length} alerts...
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />


        {/* Quick Stats */}
        <div className="px-4 py-3 border-t">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-xs text-muted-foreground">Active Alerts</div>
              <div className="text-sm font-bold text-blue-600">{activeAlertsCount}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Total Alerts</div>
              <div className="text-sm font-bold text-green-600">{alerts.length}</div>
            </div>
          </div>
        </div>
      </DropdownMenuContent>

      {/* Alert Management Dialog for viewing all alerts */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="hidden">
            {/* Hidden trigger for viewing all alerts */}
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manage Alerts</DialogTitle>
            <DialogDescription>
              View and manage all your scheduled alerts.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {alerts.map((alert) => (
              <Card key={alert.id} className={alert.isActive ? '' : 'opacity-60'}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{alert.message}</h4>
                        <Badge variant={alert.isActive ? "default" : "secondary"}>
                          {alert.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        {alert.repeat && (
                          <Badge variant="outline">Repeating</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>Schedule: {new Date(alert.scheduledTime).toLocaleString()}</div>
                        <div>Interval: Every {alert.interval} minute(s)</div>
                        <div>Created: {new Date(alert.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleAlert(alert.id)}
                      >
                        {alert.isActive ? 'Pause' : 'Activate'}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteAlert(alert.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {alerts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="size-12 mx-auto mb-4 opacity-50" />
                <p>No alerts created yet</p>
                <p className="text-sm">Create your first alert to get started</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}