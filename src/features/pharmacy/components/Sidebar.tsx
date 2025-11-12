import {
  AlertTriangle,
  Building2,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard,
  Menu,
  Package,
  Plus,
  User,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [onToggle, setOnToggle] = useState(true);

  const navigationItems = [
    {
      path: "/pharmacy/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      description: "Overview & Analytics",
    },
    {
      path: "/pharmacy/inventory-management",
      label: "Inventory",
      icon: <Package size={18} />,
      description: "Stock Management",
    },
    {
      path: "/pharmacy/pharmacy-profile",
      label: "Profile",
      icon: <Building2 size={18} />,
      description: "Pharmacy Settings",
    },
  ];

  const quickActions = [
    { label: "Add Stock", icon: <Plus className="group-hover:text-foreground" size={16}/>, action: "add-stock" },
    {
      label: "Low Stock Alert",
      icon: <AlertTriangle className="group-hover:text-foreground" size={16}/>,
      action: "low-stock",
      badge: 3,
    },
    { label: "Reports", icon: <FileText className="group-hover:text-foreground" size={16}/>, action: "reports" },
  ];

  const isActivePath = (path: string) => {
    return location?.pathname === path;
  };

  const handleQuickAction = (action: string) => {
    console.log("Quick action:", action);
  };

  // For active navigation
  const navigationWithActive = navigationItems.map((item) => ({
    ...item,
    active: isActivePath(item.path),
  }));

  // const toggleMobile = () => {
  //   setIsMobileOpen(!isMobileOpen);
  // };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-teal-600">
              <Building2 size={18} className="text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-sm font-semibold text-gray-800">
                  Admin Panel
                </h2>
                <p className="text-xs text-gray-500">
                  Pharmacy Management
                </p>
              </div>
            )}
          </div>
          {/* {onToggle && ( */}
            <>

            {/* <Button
              variant="ghost"
              size="icon"
              // onClick={onToggle}
              className="hidden lg:flex"
            >
              <span className="">Toggle sidebar</span>
            </Button> */}

            {isCollapsed && (
              <ChevronRight size={18} className="hidden lg:flex text-gray-800 hover:cursor-pointer" onClick={()=>{ setIsCollapsed(!isCollapsed); setOnToggle(!onToggle)}}/>
            )}
            {!isCollapsed && (
              <ChevronLeft size={18} className="hidden lg:flex text-gray-800 hover:cursor-pointer" onClick={()=>{setIsCollapsed(!isCollapsed); setOnToggle(!ontoggle)}}/>
            )}
            
          </>
          {/* )} */}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="space-y-1">
          {navigationWithActive?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium healthcare-transition group ${isCollapsed ? "w-10" : "w-full"} ${
                isActivePath(item?.path)
                  ? "bg-primary text-white healthcare-shadow"
                  : "text-gray-600 hover:text-gray-500/90"
              }`}
            >
              {React.cloneElement(item.icon, {
                className: item.active
                  ? "text-white"
                  : "text-text-secondary group-hover:text-gray-500/90",
              })}
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{item?.label}</div>
                  <div
                    className={`text-xs ${
                      isActivePath(item?.path)
                        ? "text-primary-foreground/80"
                        : "text-text-secondary"
                    }`}
                  >
                    {item?.description}
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="pt-6">
            <h3 className="px-3 text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="space-y-1">
              {quickActions?.map((action) => (
                <button
                  key={action?.action}
                  onClick={() => handleQuickAction(action?.action)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-text-secondary hover:text-foreground hover:bg-muted rounded-lg healthcare-transition group"
                >
                  <div className="flex items-center space-x-3">
                    {action.icon}
                    <span>{action?.label}</span>
                  </div>
                  {action?.badge && (
                    <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                      {action?.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <User size={16} className="text-text-secondary" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                Admin User
              </p>
              <p className="text-xs text-text-secondary truncate">
                admin@pharmacy.com
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex lg:inset-y-0 lg:left-0 lg:z-100 lg:flex-col bg-surface border-r border-border healthcare-shadow transition-all duration-300 ${
          isCollapsed ? "lg:w-24" : "lg:w-64"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden flex gap-5 p-4 left-4 z-200 ">
        {/* <Button
          variant="outline"
          size="icon"
          onClick={toggleMobile}
          iconName="Menu"
          iconSize={18}
          className="bg-surface healthcare-shadow"
        >
          <span className="sr-only">Open sidebar</span>
        </Button> */}

        <Menu className={`bg-surface healthcare-shadow my-1 ${isMobileOpen ? "hidden" : "block"}`} size={20} onClick={()=>{setIsMobileOpen(true)}}/>

        <p className="text-lg">My Med X</p>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-300 flex h-screen">
          <div
            className="fixed inset-0"
            onClick={()=>{setIsMobileOpen(false)}}
          />
          <aside className="relative flex w-64 flex-col bg-surface shadow-lg bg-white">
            <div className="absolute top-4 right-4">
              {/* <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobile}
                iconName="X"
                iconSize={18}
              >
                <span className="sr-only">Close sidebar</span>
              </Button> */}

              <X size={18} onClick={()=>{setIsMobileOpen(false)}}/>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
