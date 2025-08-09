import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { 
  TrendingUp, 
  Download,
  Eye,
  Plus,
  BarChart3
} from 'lucide-react';
import * as api from '../api/mockApi.js';

const SalesReportsPage: React.FC = () => {
  const [salesReports, setSalesReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSalesReports = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const data = await api.getSalesReports();
        setSalesReports(data);
        
        console.log('✅ Sales reports loaded successfully');
      } catch (error) {
        console.error('❌ Error loading sales reports:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSalesReports();
  }, []);

  const handleView = (reportId: string) => {
    console.log('View report:', reportId);
    alert('View detailed report functionality would be implemented here');
  };

  const handleDownload = (reportId: string) => {
    console.log('Download report:', reportId);
    alert('Download report functionality would be implemented here');
  };

  const getPerformanceBadge = (achievement: number) => {
    if (achievement >= 90) return { variant: 'success' as const, text: 'Excellent' };
    if (achievement >= 70) return { variant: 'accent' as const, text: 'Good' };
    if (achievement >= 50) return { variant: 'warning' as const, text: 'Average' };
    return { variant: 'destructive' as const, text: 'Below Target' };
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading sales reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales Reports</h1>
          <p className="text-muted-foreground">View and analyze sales performance</p>
        </div>
        
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Generate Report</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Sales Performance Reports</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {salesReports.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No reports found</h3>
              <p className="text-muted-foreground">No sales reports have been generated yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Rep Name</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Total Sales</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Clients Visited</TableHead>
                    <TableHead>Target Achievement</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesReports.map((report: any) => {
                    const performanceBadge = getPerformanceBadge(report.targetAchievement);
                    return (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>{report.repName}</TableCell>
                        <TableCell>{report.month}</TableCell>
                        <TableCell>${report.totalSales.toLocaleString()}</TableCell>
                        <TableCell>{report.ordersCount}</TableCell>
                        <TableCell>{report.clientsVisited}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Badge variant={performanceBadge.variant}>
                              {report.targetAchievement.toFixed(1)}%
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {performanceBadge.text}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleView(report.id)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownload(report.id)}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
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

export default SalesReportsPage;