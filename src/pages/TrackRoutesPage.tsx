import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  MapPin, 
  Clock,
  Route,
  Navigation,
  Calendar
} from 'lucide-react';

const TrackRoutesPage: React.FC = () => {
  // Mock route data for demonstration
  const todayRoute = [
    {
      id: 1,
      client: 'Dr. Emily Rodriguez',
      hospital: 'City General Hospital',
      address: '123 Medical Plaza, Suite 400',
      time: '09:00 AM',
      status: 'upcoming',
      estimatedDuration: '45 min'
    },
    {
      id: 2,
      client: 'Dr. James Wilson',
      hospital: 'Metro Medical Center',
      address: '456 Healthcare Ave, Floor 3',
      time: '11:00 AM',
      status: 'current',
      estimatedDuration: '30 min'
    },
    {
      id: 3,
      client: 'Dr. Lisa Thompson',
      hospital: 'Cancer Treatment Center',
      address: '789 Wellness Blvd',
      time: '02:00 PM',
      status: 'upcoming',
      estimatedDuration: '60 min'
    },
    {
      id: 4,
      client: 'Dr. Maria Gonzalez',
      hospital: 'Family Health Clinic',
      address: '654 Community Drive',
      time: '04:00 PM',
      status: 'upcoming',
      estimatedDuration: '30 min'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'current':
        return 'warning';
      case 'upcoming':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'current':
        return '→';
      case 'upcoming':
        return '○';
      default:
        return '○';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Track Routes</h1>
        <p className="text-muted-foreground">View your daily route and client visits</p>
      </div>

      {/* Route Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <CardTitle className="text-sm">Today's Visits</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayRoute.length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-warning to-warning/80 text-warning-foreground">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <CardTitle className="text-sm">Total Time</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.5h</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-success to-success/80 text-success-foreground">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <Route className="h-4 w-4" />
              <CardTitle className="text-sm">Distance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35 km</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <Navigation className="h-4 w-4" />
              <CardTitle className="text-sm">Current Stop</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Stop 2/4</div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Map Placeholder */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Route Map</span>
          </CardTitle>
          <CardDescription>Interactive map showing your daily route</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-br from-secondary to-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <h3 className="font-medium text-lg mb-1">Interactive Map</h3>
              <p className="text-muted-foreground">
                Map integration would show real-time route with GPS tracking
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Features: Turn-by-turn navigation, real-time traffic, ETA updates
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Route Timeline */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Route className="h-5 w-5" />
            <span>Today's Route</span>
          </CardTitle>
          <CardDescription>Your scheduled client visits for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayRoute.map((visit, index) => (
              <div key={visit.id} className="flex items-start space-x-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <div className="flex-shrink-0 mt-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    visit.status === 'current' 
                      ? 'bg-warning text-warning-foreground' 
                      : visit.status === 'completed'
                      ? 'bg-success text-success-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {getStatusIcon(visit.status)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">{visit.client}</h3>
                      <p className="text-sm text-muted-foreground">{visit.hospital}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{visit.address}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <Badge variant={getStatusColor(visit.status) as any}>
                        {visit.status}
                      </Badge>
                      <div className="text-right">
                        <p className="text-sm font-medium">{visit.time}</p>
                        <p className="text-xs text-muted-foreground">{visit.estimatedDuration}</p>
                      </div>
                    </div>
                  </div>
                  
                  {visit.status === 'current' && (
                    <div className="mt-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                      <div className="flex items-center space-x-2">
                        <Navigation className="h-4 w-4 text-warning" />
                        <span className="text-sm font-medium text-warning">Currently visiting</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Expected to complete by 11:30 AM
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackRoutesPage;