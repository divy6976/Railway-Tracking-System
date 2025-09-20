import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Download, TrendingUp, TrendingDown, Calendar, Clock } from "lucide-react";

export function AnalyticsPanel() {
  const performanceData = [
    { time: "06:00", throughput: 45, delays: 2, punctuality: 98 },
    { time: "08:00", throughput: 142, delays: 8, punctuality: 94 },
    { time: "10:00", throughput: 89, delays: 3, punctuality: 97 },
    { time: "12:00", throughput: 67, delays: 1, punctuality: 99 },
    { time: "14:00", throughput: 98, delays: 5, punctuality: 95 },
    { time: "16:00", throughput: 156, delays: 12, punctuality: 92 },
    { time: "18:00", throughput: 178, delays: 15, punctuality: 89 },
    { time: "20:00", throughput: 123, delays: 7, punctuality: 94 },
    { time: "22:00", throughput: 67, delays: 2, punctuality: 98 }
  ];

  const weeklyTrends = [
    { day: "Mon", onTime: 94, delayed: 6, cancelled: 0 },
    { day: "Tue", onTime: 96, delayed: 4, cancelled: 0 },
    { day: "Wed", onTime: 92, delayed: 7, cancelled: 1 },
    { day: "Thu", onTime: 95, delayed: 5, cancelled: 0 },
    { day: "Fri", onTime: 89, delayed: 10, cancelled: 1 },
    { day: "Sat", onTime: 97, delayed: 3, cancelled: 0 },
    { day: "Sun", onTime: 98, delayed: 2, cancelled: 0 }
  ];

  const delayReasons = [
    { name: "Technical Issues", value: 35, color: "#ef4444" },
    { name: "Weather", value: 20, color: "#f59e0b" },
    { name: "Passenger Incidents", value: 18, color: "#3b82f6" },
    { name: "Track Maintenance", value: 15, color: "#8b5cf6" },
    { name: "Signal Problems", value: 12, color: "#10b981" }
  ];

  const kpiData = [
    { 
      title: "Average Delay", 
      current: "2.3 min", 
      previous: "2.7 min", 
      change: -14.8, 
      trend: "down",
      target: "< 3 min"
    },
    { 
      title: "On-Time Performance", 
      current: "94.2%", 
      previous: "91.5%", 
      change: +2.9, 
      trend: "up",
      target: "> 95%"
    },
    { 
      title: "Daily Throughput", 
      current: "1,247", 
      previous: "1,189", 
      change: +4.9, 
      trend: "up",
      target: "1,300"
    },
    { 
      title: "Customer Satisfaction", 
      current: "4.2/5", 
      previous: "4.0/5", 
      change: +5.0, 
      trend: "up",
      target: "4.5/5"
    }
  ];

  const auditLog = [
    { time: "14:25", user: "Controller A", action: "Approved priority for Express A", result: "Success" },
    { time: "14:20", user: "System", action: "Auto-rerouted Regional E", result: "Success" },
    { time: "14:18", user: "Controller B", action: "Manual speed reduction for Freight C", result: "Success" },
    { time: "14:15", user: "Supervisor", action: "Enabled emergency mode", result: "Success" },
    { time: "14:10", user: "System", action: "Generated delay notification", result: "Success" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Reports & Analytics
          </h2>
          <p className="text-muted-foreground">Performance metrics, trends, and operational insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="today">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.current}</div>
              <div className="flex items-center justify-between mt-2">
                <div className={`flex items-center text-sm ${
                  kpi.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}>
                  {kpi.trend === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {Math.abs(kpi.change)}%
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {kpi.target}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hourly Throughput & Delays</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="throughput" fill="#3b82f6" name="Throughput" />
                    <Bar yAxisId="right" dataKey="delays" fill="#ef4444" name="Delays" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Punctuality Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[85, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="punctuality" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="onTime" stackId="a" fill="#10b981" />
                    <Bar dataKey="delayed" stackId="a" fill="#f59e0b" />
                    <Bar dataKey="cancelled" stackId="a" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delay Reasons</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={delayReasons}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {delayReasons.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Peak Hours Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Morning Rush (07:00-09:00)</span>
                  <Badge className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">High Load</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Midday (11:00-13:00)</span>
                  <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Optimal</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Evening Rush (17:00-19:00)</span>
                  <Badge className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">Critical</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Night Hours (21:00-06:00)</span>
                  <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">Low Load</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Route Efficiency</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Track 1 (Express)</span>
                  <span className="font-medium">98% Utilization</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Track 2 (Local)</span>
                  <span className="font-medium">85% Utilization</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Track 3 (Freight)</span>
                  <span className="font-medium">67% Utilization</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Track 4 (Backup)</span>
                  <span className="font-medium">23% Utilization</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Delay Costs</span>
                  <span className="text-red-600 dark:text-red-400">€12,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Energy Savings</span>
                  <span className="text-green-600 dark:text-green-400">€3,240</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Maintenance</span>
                  <span className="text-blue-600 dark:text-blue-400">€8,900</span>
                </div>
                <div className="flex justify-between items-center font-medium border-t pt-2">
                  <span>Net Impact</span>
                  <span className="text-red-600 dark:text-red-400">-€17,110</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLog.map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {log.time}
                      </div>
                      <div>
                        <div className="font-medium">{log.action}</div>
                        <div className="text-sm text-muted-foreground">by {log.user}</div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                      {log.result}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}