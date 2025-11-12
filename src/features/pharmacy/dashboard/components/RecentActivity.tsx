import { AlertTriangle, Package, Settings, Upload, UserPlus } from 'lucide-react';
import React from 'react'

export default function RecentActivity() {
    const activities = [
    {
      id: 1,
      type: 'inventory',
      title: 'Stock Updated',
      description: 'Aspirin 500mg - Added 200 units',
      timestamp: '2 minutes ago',
      icon: <Package  size={16}/>,
      color: 'text-teal-600'
    },
    {
      id: 2,
      type: 'staff',
      title: 'New Staff Request',
      description: 'Sarah Johnson applied for Pharmacist position',
      timestamp: '15 minutes ago',
      icon: <UserPlus  size={16}/>,
      color: 'text-orange-400'
    },
    {
      id: 3,
      type: 'alert',
      title: 'Low Stock Alert',
      description: 'Insulin Pen - Only 5 units remaining',
      timestamp: '1 hour ago',
      icon: <AlertTriangle size={16}/>,
      color: 'text-red-500'
    },
    {
      id: 4,
      type: 'inventory',
      title: 'Bulk Import Completed',
      description: '150 medications updated successfully',
      timestamp: '2 hours ago',
      icon: <Upload  size={16}/>,
      color: 'text-primary'
    },
    {
      id: 5,
      type: 'system',
      title: 'Profile Updated',
      description: 'Pharmacy hours and contact information modified',
      timestamp: '3 hours ago',
      icon: <Settings  size={16}/>,
      color: 'text-gray-500'
    }
  ];
  return (
    <div className="bg-white border border-border rounded-lg p-6 healthcare-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-primary/80 healthcare-transition">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted hover:cursor-default">
            <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0`}>

              {React.cloneElement(activity.icon, {
                className: activity?.color
              })}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 font-medium text-foreground">{activity?.title}</p>
              <p className="text-sm text-gray-500 mt-1">{activity?.description}</p>
              <p className="text-xs text-gray-500 mt-2">{activity?.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
