import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { AlertTriangle, Bell, Eye, Info, Settings, UserPlus } from "lucide-react";

export default function NotificationPanel() {
    const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'Low Stock Alert',
      message: 'Metformin 500mg has only 8 units remaining. Reorder recommended.',
      timestamp: new Date(Date.now() - 300000),
      priority: 'high',
      read: false
    },
    {
      id: 2,
      type: 'staff',
      title: 'Staff Request Pending',
      message: 'John Smith has requested access to inventory management system.',
      timestamp: new Date(Date.now() - 1800000),
      priority: 'medium',
      read: false
    },
    {
      id: 3,
      type: 'system',
      title: 'System Update',
      message: 'New features available in inventory management. Check changelog for details.',
      timestamp: new Date(Date.now() - 3600000),
      priority: 'low',
      read: true
    },
    {
      id: 4,
      type: 'alert',
      title: 'Expiry Warning',
      message: '12 medications will expire within the next 30 days.',
      timestamp: new Date(Date.now() - 7200000),
      priority: 'high',
      read: false
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle size={16} />;
      case 'staff': return <UserPlus size={16}  />;
      case 'system': return <Info size={16} />;
      default: return <Bell size={16} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-700';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-gray-500';
      default: return 'text-text-secondary';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime(); // ✅ use getTime()

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return timestamp.toLocaleDateString();
};

  const markAsRead = (id: string | number) => {
    setNotifications(prev => 
      prev?.map(notif => 
        notif?.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadCount = notifications?.filter(n => !n?.read)?.length;
  return (
    <div className="bg-white border border-border rounded-lg p-6 healthcare-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-gray-700">Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-error text-white bg-red-400 text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <Button variant="ghost" size="sm">
            <Settings size={16}/>
          Settings
        </Button>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto text-gray-700">
        {notifications?.map((notification) => (
          <div
            key={notification?.id}
            className={`p-4 rounded-lg border healthcare-transition cursor-pointer ${
              notification?.read 
                ? 'bg-muted/50 border-border' :'bg-white border-primary/20 hover:border-primary/40'
            }`}
            onClick={() => markAsRead(notification?.id)}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0`}>
                {/* <Icon 
                  name={getNotificationIcon(notification?.type)} 
                  
                  className={getPriorityColor(notification?.priority)}
                /> */}
                {React.cloneElement(getNotificationIcon(notification.type), {
                    className: getPriorityColor(notification?.priority)
                })}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-medium ${notification?.read ? 'text-text-secondary' : 'text-foreground'}`}>
                    {notification?.title}
                  </p>
                  <span className="text-xs text-text-secondary">
                    {formatTimestamp(notification?.timestamp)}
                  </span>
                </div>
                <p className={`text-sm mt-1 ${notification?.read ? 'text-text-secondary' : 'text-text-secondary'}`}>
                  {notification?.message}
                </p>
                {!notification?.read && (
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border flex justify-center">
        <Button className="bg-transparent text-gray-800 w-full hover:bg-primary hover:text-white" size="sm">
            <Eye />
          Mark All as Read
        </Button>
      </div>
    </div>
  )
}
