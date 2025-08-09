import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Calendar,
  CheckCircle2,
  Clock,
  Users,
  MapPin,
  Target
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import * as api from '../api/mockApi.js';

const RepDashboard: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    todayTasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
    clientsToVisit: 0
  });

  useEffect(() => {
    const loadTasks = async () => {
      if (user) {
        console.log('🔄 Loading tasks for user:', user);
        setIsLoading(true);
        
        try {
          // Simulate API delay for better UX demonstration
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const userTasks = api.getTasksByRepId(user.id);
          setTasks(userTasks);

          const today = new Date().toISOString().split('T')[0];
          const todayTasks = userTasks.filter(t => t.dueDate === today);

          setStats({
            todayTasks: todayTasks.length,
            pendingTasks: userTasks.filter(t => t.status === 'pending' || t.status === 'in_progress').length,
            completedTasks: userTasks.filter(t => t.status === 'completed').length,
            clientsToVisit: new Set(userTasks.filter(t => t.status === 'pending' || t.status === 'in_progress').map(t => t.clientId)).size
          });
          
          console.log('✅ Tasks loaded successfully');
        } catch (error) {
          console.error('❌ Error loading tasks:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadTasks();
  }, [user]);

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task: any) => task.status === status);
  };

  const getPriorityColor = (priority: string): "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "accent" => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      case 'low':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getStatusColor = (status: string): "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "accent" => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
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
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">Here's your daily overview and upcoming tasks</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks for Today</CardTitle>
            <Target className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayTasks}</div>
            <p className="text-xs opacity-90">
              Due today
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning to-warning/80 text-warning-foreground shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Clock className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingTasks}</div>
            <p className="text-xs opacity-90">
              Need attention
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success to-success/80 text-success-foreground shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedTasks}</div>
            <p className="text-xs opacity-90">
              Tasks finished
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients to Visit</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.clientsToVisit}</div>
            <p className="text-xs opacity-90">
              Upcoming visits
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Overview */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Your Tasks</span>
          </CardTitle>
          <CardDescription>Manage your assigned tasks and track progress</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">To Do</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending" className="space-y-4 mt-6">
              {getTasksByStatus('pending').map((task: any) => (
                <div key={task.id} className="p-4 border border-border rounded-lg bg-card hover:bg-secondary/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {task.dueDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>Client: {task.clientName}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Badge variant={getPriorityColor(task.priority)}>
                        {task.priority} priority
                      </Badge>
                      <Badge variant={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
              {getTasksByStatus('pending').length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-2" />
                  <p className="text-muted-foreground">No pending tasks! Great job!</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="in_progress" className="space-y-4 mt-6">
              {getTasksByStatus('in_progress').map((task: any) => (
                <div key={task.id} className="p-4 border border-border rounded-lg bg-card hover:bg-secondary/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {task.dueDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>Client: {task.clientName}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Badge variant={getPriorityColor(task.priority)}>
                        {task.priority} priority
                      </Badge>
                      <Badge variant="accent">
                        In Progress
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
              {getTasksByStatus('in_progress').length === 0 && (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No tasks in progress</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4 mt-6">
              {getTasksByStatus('completed').map((task: any) => (
                <div key={task.id} className="p-4 border border-border rounded-lg bg-card opacity-75">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="font-medium line-through">{task.title}</h3>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Completed: {task.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="success">
                      Completed
                    </Badge>
                  </div>
                </div>
              ))}
              {getTasksByStatus('completed').length === 0 && (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No completed tasks yet</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RepDashboard;