import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Activity, Clock, TrendingUp, Users, Zap, AlertTriangle } from "lucide-react";

interface KPI {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
  icon: React.ReactNode;
}

export function Dashboard() {
  const kpis: KPI[] = [
    {
      title: "Throughput",
      value: "142 trains/hr",
      change: "+12%",
      trend: "up",
      icon: <Activity className="h-4 w-4" />
    },
    {
      title: "Average Delay",
      value: "2.3 min",
      change: "-15%",
      trend: "down",
      icon: <Clock className="h-4 w-4" />
    },
    {
      title: "Punctuality",
      value: "94.2%",
      change: "+3%",
      trend: "up",
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      title: "Track Utilization",
      value: "78%",
      change: "+5%",
      trend: "up",
      icon: <Users className="h-4 w-4" />
    }
  ];

  const systemStatus = {
    operational: 23,
    warning: 3,
    critical: 1,
    total: 27
  };

  return (
    <div className="space-y-6 relative z-10">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-card to-card/80 shadow-sm">
        <div className="absolute inset-0 opacity-60 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 20% 10%, hsl(var(--primary)/0.08), transparent 40%), radial-gradient(circle at 80% 0%, hsl(var(--ring)/0.08), transparent 40%)'
        }} />
        <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Railway System Overview</h2>
            <p className="text-muted-foreground">Live health, performance and operations across the section</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Operational</Badge>
            <Badge variant="outline">Last sync 12s ago</Badge>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-xs">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <div className="p-2 rounded-lg bg-primary/10">
                {kpi.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                {kpi.value}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className={
                  kpi.trend === "up" ? "text-green-600" : kpi.trend === "down" ? "text-red-600" : "text-gray-600"
                }>
                  {kpi.change}
                </span>
                {" "}from last hour
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-xs">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-500" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Operational</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {systemStatus.operational}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Warning</span>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                {systemStatus.warning}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Critical</span>
              <Badge variant="destructive">
                {systemStatus.critical}
              </Badge>
            </div>
            <div className="pt-2">
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Health</span>
                <span className="font-medium text-green-600">85%</span>
              </div>
              <Progress value={85} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-xs">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Active Operations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <span>Trains in Motion</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">18</Badge>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <span>Trains at Stations</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">9</Badge>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <span>Maintenance Windows</span>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">2</Badge>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <span>Emergency Holds</span>
              <Badge variant="secondary" className="bg-gray-100 text-gray-800">0</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}