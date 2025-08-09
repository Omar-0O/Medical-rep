import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { 
  Calendar, 
  Edit,
  Trash2,
  Plus,
  User
} from 'lucide-react';
import * as api from '../api/mockApi.js';

const ManageTasksPage: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const data = await api.getAllTasks();
        setTasks(data);
        
        console.log('✅ Tasks loaded successfully');
      } catch (error) {
        console.error('❌ Error loading tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleEdit = (taskId: number) => {
    console.log('Edit task:', taskId);
    alert('Edit functionality would be implemented here');
  };

  const handleDelete = (taskId: number) => {
    console.log('Delete task:', taskId);
    if (confirm('Are you sure you want to delete this task?')) {
      alert('Delete functionality would be implemented here');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return { variant: 'success' as const, text: 'Completed' };
      case 'in_progress':
        return { variant: 'accent' as const, text: 'In Progress' };
      case 'pending':
        return { variant: 'warning' as const, text: 'Pending' };
      default:
        return { variant: 'secondary' as const, text: status };
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return { variant: 'destructive' as const, text: 'High' };
      case 'medium':
        return { variant: 'warning' as const, text: 'Medium' };
      case 'low':
        return { variant: 'secondary' as const, text: 'Low' };
      default:
        return { variant: 'secondary' as const, text: priority };
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Tasks</h1>
          <p className="text-muted-foreground">View and manage rep tasks</p>
        </div>
        
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Create Task</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Task Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No tasks found</h3>
              <p className="text-muted-foreground">No tasks have been created yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task: any) => {
                    const statusBadge = getStatusBadge(task.status);
                    const priorityBadge = getPriorityBadge(task.priority);
                    return (
                      <TableRow key={task.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{task.title}</div>
                            <div className="text-sm text-muted-foreground">{task.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>Rep #{task.assignedRepId}</span>
                          </div>
                        </TableCell>
                        <TableCell>{task.clientName}</TableCell>
                        <TableCell>
                          <Badge variant={priorityBadge.variant}>
                            {priorityBadge.text}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusBadge.variant}>
                            {statusBadge.text}
                          </Badge>
                        </TableCell>
                        <TableCell>{task.dueDate}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(task.id)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(task.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageTasksPage;