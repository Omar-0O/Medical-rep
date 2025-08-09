import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  MapPin,
  Activity
} from 'lucide-react';

const RepNavbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/rep/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/rep/clients', label: 'View Clients', icon: Users },
    { path: '/rep/products', label: 'View Products', icon: Package },
    { path: '/rep/routes', label: 'Track Routes', icon: MapPin },
  ];

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-2">
            <Activity className="h-7 w-7 text-primary" />
            <span className="text-lg font-bold text-foreground">MedicalRep Portal</span>
            <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">Rep</span>
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

export default RepNavbar;