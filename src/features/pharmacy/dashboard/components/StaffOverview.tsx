import { Check, User, UserPlus, X } from "lucide-react";
import { Button } from "../../../../components/ui/button";

export default function StaffOverview() {
  const staffMembers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Head Pharmacist',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      lastActive: '2 minutes ago',
      permissions: ['inventory', 'staff', 'reports']
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Pharmacy Technician',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      lastActive: '15 minutes ago',
      permissions: ['inventory']
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Pharmacy Assistant',
      status: 'offline',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      lastActive: '2 hours ago',
      permissions: ['inventory']
    }
  ];

  const pendingRequests = [
    {
      id: 1,
      name: 'David Wilson',
      role: 'Pharmacy Technician',
      appliedDate: '2025-10-07',
      experience: '3 years'
    },
    {
      id: 2,
      name: 'Lisa Thompson',
      role: 'Pharmacy Assistant',
      appliedDate: '2025-10-06',
      experience: '1 year'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-teal-600';
      case 'offline': return 'text-gray-600';
      default: return 'text-text-secondary';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'active': return 'bg-teal-600';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-text-secondary';
    }
  };
  return (
   <div className="bg-white border border-border rounded-lg p-6 healthcare-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Staff Overview</h3>
        <Button variant="outline" size="sm">
          <UserPlus/>
          Add Staff
        </Button>
      </div>
      {/* Active Staff */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-500 mb-3">Active Staff ({staffMembers?.length})</h4>
        <div className="space-y-3">
          {staffMembers?.map((staff) => (
            <div key={staff?.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted healthcare-transition">
              <div className="relative">
                <img
                  src={staff?.avatar}
                  alt={staff?.name}
                  className="w-10 h-10 rounded-full object-cover"
                  // onError={(e) => {
                  //   e.target.src = '/assets/images/no_image.png';
                  // }}
                />
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-surface ${getStatusBg(staff?.status)}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">{staff?.name}</p>
                <p className="text-xs text-gray-500 ">{staff?.role}</p>
              </div>
              <div className="text-right">
                <p className={`text-xs ${getStatusColor(staff?.status)}`}>
                  {staff?.status === 'active' ? 'Online' : 'Offline'}
                </p>
                <p className="text-xs text-gray-400">{staff?.lastActive}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Pending Requests */}
      {pendingRequests?.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-500 mb-3">
            Pending Requests ({pendingRequests?.length})
          </h4>
          <div className="space-y-3">
            {pendingRequests?.map((request) => (
              <div key={request?.id} className="flex items-center justify-between p-3 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <User size={20} className="text-text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{request?.name}</p>
                    <p className="text-xs text-gray-500">{request?.role} • {request?.experience} experience</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-500/90">
                    <X size={16}/>
                    Reject
                  </Button>
                  <Button variant="default" size="sm">
                    <Check size={16}/>
                    Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
