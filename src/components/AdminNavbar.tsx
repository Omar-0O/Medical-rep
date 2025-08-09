import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ClipboardList, 
  ShoppingCart, 
  TrendingUp,
  Activity
} from 'lucide-react';

const AdminNavbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/clients', label: 'Manage Clients', icon: Users },
    { path: '/admin/products', label: 'Manage Products', icon: Package },
    { path: '/admin/tasks', label: 'Manage Tasks', icon: ClipboardList },
    { path: '/admin/orders', label: 'Manage Orders', icon: ShoppingCart },
    { path: '/admin/sales', label: 'Sales Reports', icon: TrendingUp },
  ];

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-2">
            <Activity className="h-7 w-7 text-primary" />
            <span className="text-lg font-bold text-foreground">MedicalRep Portal</span>
            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">Admin</span>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;