import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react';
import * as api from '../api/mockApi.js';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    activeReps: 0,
    completedTasks: 0,
    totalTasks: 0,
    taskCompletionRate: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const summaryData = await api.getAdminSummary();
        const orders = await api.getOrders();
        
        setStats(summaryData);
        setRecentOrders(orders.slice(-5).reverse());
        
        console.log('✅ Admin dashboard data loaded successfully');
      } catch (error) {
        console.error('❌ Error loading admin dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'success';
      case 'pending':
        return 'warning';
      case 'processing':
        return 'accent';
      default:
        return 'secondary';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your medical portal management</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
            <p className="text-xs opacity-90">
              Registered clients
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs opacity-90">
              Available in catalog
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success to-success/80 text-success-foreground shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs opacity-90">
              This month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning to-warning/80 text-warning-foreground shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs opacity-90">
              Revenue generated
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Overview */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Task Overview</span>
            </CardTitle>
            <CardDescription>Current task status across all representatives</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-warning" />
                <span className="font-medium">Pending Tasks</span>
              </div>
              <Badge variant="outline" className="text-warning border-warning">
                {stats.totalTasks - stats.completedTasks}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="font-medium">Completed Tasks</span>
              </div>
              <Badge variant="outline" className="text-success border-success">
                {stats.completedTasks}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="font-medium">Completion Rate</span>
              </div>
              <Badge variant="outline" className="text-primary border-primary">
                {stats.taskCompletionRate}%
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Recent Orders</span>
            </CardTitle>
            <CardDescription>Latest order activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order: any) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Order #{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.clientName}</p>
                    <p className="text-xs text-muted-foreground">{order.orderDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">${order.totalAmount.toLocaleString()}</p>
                    <Badge variant={getStatusColor(order.status) as any} className="text-xs">
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
              {recentOrders.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No recent orders</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;