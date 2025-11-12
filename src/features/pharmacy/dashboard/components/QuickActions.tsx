import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Building2, Plus, Upload, Users } from "lucide-react";
import React from "react";


export default function QuickActions() {
    const navigate = useNavigate();

  const actions = [
    {
      title: 'Add New Stock',
      description: 'Add medications to inventory',
      icon: <Plus size={20}/>,
      color: 'success',
      onClick: () => navigate('/pharmacy/inventory-management')
    },
    {
      title: 'Manage Staff',
      description: 'Add or manage staff accounts',
      icon: <Users size={20}/>,
      color: 'primary',
      onClick: () => console.log('Navigate to staff management')
    },
    {
      title: 'Update Profile',
      description: 'Edit pharmacy information',
      icon: <Building2 size={20}/>,
      color: 'secondary',
      onClick: () => navigate('/pharmacy/pharmacy-profile')
    },
    {
      title: 'Bulk Operations',
      description: 'Import/export inventory data',
      icon: <Upload size={20}/>,
      color: 'warning',
      onClick: () => navigate('/pharmacy/inventory-management')
    }
  ];
  return (
     <div className="bg-white border border-border rounded-lg p-6 healthcare-shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-auto p-4 flex flex-col items-start space-y-2 hover:border-primary/20 outline-none border-none shadow-xs"
            onClick={action?.onClick}
          >
            <div className="flex items-center space-x-3 w-full">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                action?.color === 'success' ? 'bg-green-600 text-white' :
                action?.color === 'primary' ? 'bg-primary text-white' :
                action?.color === 'secondary' ? 'bg-teal-600 text-white' :
                'bg-orange-400 text-warning-foreground'
              }`}>
                
                {React.cloneElement(action.icon, {
                    className: "text-inherit hover:bg-transparent",
                })}
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-800">{action?.title}</p>
                <p className="text-sm text-gray-400">{action?.description}</p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}
