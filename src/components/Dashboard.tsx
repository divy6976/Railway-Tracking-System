import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Activity, Clock, TrendingUp, Users } from "lucide-react";

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
    <div className="space-y-6">
      <div>
        <h2>System Overview</h2>
        <p className="text-muted-foreground">Real-time monitoring of railway section performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              {kpi.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
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
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
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
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Operations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Trains in Motion</span>
              <span>18</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Trains at Stations</span>
              <span>9</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Maintenance Windows</span>
              <span>2</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Emergency Holds</span>
              <span>0</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}