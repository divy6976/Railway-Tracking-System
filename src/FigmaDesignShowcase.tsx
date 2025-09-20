import { 
  LayoutDashboard, 
  MapPin, 
  Brain, 
  Settings as SettingsIcon, 
  Play, 
  AlertCircle, 
  BarChart3,
  User,
  Shield,
  Bell,
  Moon,
  Sun,
  TrendingUp,
  TrendingDown,
  Zap,
  Clock,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Progress } from "./components/ui/progress";

export default function FigmaDesignShowcase() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b bg-gradient-to-br from-card to-card/80 p-6">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Railway Control System - Design Showcase</h1>
          
          {/* Header Components */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Light Mode Header */}
            <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
              <CardHeader>
                <CardTitle>Header - Light Mode</CardTitle>
              </CardHeader>
              <CardContent className="bg-white p-4 rounded border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">Railway Control Center</div>
                        <div className="text-xs text-gray-600">Section A - Central District</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className="bg-gray-100 text-gray-800">NORMAL OPERATION</Badge>
                      <Badge className="bg-green-50 text-green-700 border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        System Operational
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right text-sm">
                      <div className="font-medium">Controller A</div>
                      <div className="text-gray-600">Day Shift</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Moon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Shield className="h-4 w-4 mr-2" />
                      Supervisor
                    </Button>
                    <Button variant="destructive" size="sm" className="relative">
                      <Bell className="h-4 w-4" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                        2
                      </span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dark Mode Header */}
            <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
              <CardHeader>
                <CardTitle>Header - Dark Mode</CardTitle>
              </CardHeader>
              <CardContent className="bg-gray-900 text-white p-4 rounded border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f1b3a, #3354c5)' }}>
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">Railway Control Center</div>
                        <div className="text-xs text-gray-300">Section A - Central District</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className="bg-gray-800 text-gray-200">NORMAL OPERATION</Badge>
                      <Badge className="bg-green-900 text-green-200 border-green-800">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        System Operational
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right text-sm">
                      <div className="font-medium text-white">Controller A</div>
                      <div className="text-gray-300">Day Shift</div>
                    </div>
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-200 bg-gray-800">
                      <Sun className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-200 bg-gray-800">
                      <Shield className="h-4 w-4 mr-2" />
                      Supervisor
                    </Button>
                    <Button variant="destructive" size="sm" className="relative">
                      <Bell className="h-4 w-4" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                        2
                      </span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Navigation Showcase */}
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Navigation Tabs</h2>
        <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
          <CardContent className="p-4">
            <div className="grid grid-cols-4 lg:grid-cols-8 gap-2">
              {[
                { label: "Dashboard", icon: LayoutDashboard, active: true },
                { label: "Live Tracking", icon: MapPin },
                { label: "AI Recommendations", icon: Brain },
                { label: "Manual Override", icon: SettingsIcon },
                { label: "Simulation", icon: Play },
                { label: "Alerts", icon: AlertCircle, badge: 2 },
                { label: "Analytics", icon: BarChart3 },
                { label: "Settings", icon: User }
              ].map((item, index) => (
                <div key={index} className={`flex flex-col items-center gap-1 p-3 rounded-lg border relative ${
                  item.active ? 'bg-primary text-primary-foreground' : 'bg-card border-border'
                }`}>
                  <item.icon className="h-4 w-4" />
                  <span className="text-xs">{item.label}</span>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Components Grid */}
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Key Dashboard Components</h2>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Active Trains</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <div className="flex items-center text-sm text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5%
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">On-Time Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <div className="flex items-center text-sm text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.1%
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Average Delay</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3 min</div>
              <div className="flex items-center text-sm text-red-600 mt-1">
                <TrendingDown className="h-3 w-3 mr-1" />
                +0.8 min
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">System Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <div className="flex items-center text-sm text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5.2%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Train Status */}
          <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Active Trains
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { id: "EXP-001", status: "On Time", delay: null, color: "green" },
                { id: "REG-245", status: "Delayed", delay: "3 min", color: "yellow" },
                { id: "FRT-089", status: "Critical", delay: "12 min", color: "red" },
                { id: "EXP-034", status: "On Time", delay: null, color: "green" }
              ].map((train, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      train.color === 'green' ? 'bg-green-500' :
                      train.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="font-medium">{train.id}</span>
                  </div>
                  <div className="text-right text-sm">
                    <div className={`font-medium ${
                      train.color === 'green' ? 'text-green-600' :
                      train.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {train.status}
                    </div>
                    {train.delay && <div className="text-muted-foreground">{train.delay}</div>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-blue-900">Priority Rerouting</div>
                    <div className="text-sm text-blue-700">Reroute EXP-001 via Track 2</div>
                    <div className="text-xs text-blue-600 mt-1">Confidence: 94%</div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">High</Badge>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-yellow-900">Speed Adjustment</div>
                    <div className="text-sm text-yellow-700">Reduce speed for REG-245</div>
                    <div className="text-xs text-yellow-600 mt-1">Confidence: 87%</div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                </div>
              </div>

              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-green-900">Schedule Optimization</div>
                    <div className="text-sm text-green-700">Optimize departure times</div>
                    <div className="text-xs text-green-600 mt-1">Confidence: 91%</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Low</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <div>
                    <div className="font-medium text-red-900">Signal Malfunction</div>
                    <div className="text-sm text-red-700">Junction A7 - Track 3</div>
                    <div className="text-xs text-red-600 mt-1">14:23 - 2 min ago</div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <div>
                    <div className="font-medium text-yellow-900">Scheduled Maintenance</div>
                    <div className="text-sm text-yellow-700">Track 4 - Platform B</div>
                    <div className="text-xs text-yellow-600 mt-1">15:00 - In 37 min</div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-900">Power Optimization</div>
                    <div className="text-sm text-blue-700">Energy saving mode active</div>
                    <div className="text-xs text-blue-600 mt-1">14:20 - 5 min ago</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Color Palette & Typography */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-3">
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-primary rounded"></div>
                  <div className="text-xs">Primary</div>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-green-500 rounded"></div>
                  <div className="text-xs">Success</div>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-yellow-500 rounded"></div>
                  <div className="text-xs">Warning</div>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-red-500 rounded"></div>
                  <div className="text-xs">Error</div>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-blue-500 rounded"></div>
                  <div className="text-xs">Info</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
            <CardHeader>
              <CardTitle>Typography Scale</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-bold">Heading 1 - 2xl Bold</div>
              <div className="text-xl font-semibold">Heading 2 - xl Semibold</div>
              <div className="text-lg font-medium">Heading 3 - lg Medium</div>
              <div className="text-base">Body Text - base Regular</div>
              <div className="text-sm text-muted-foreground">Caption - sm Muted</div>
              <div className="text-xs text-muted-foreground">Small Text - xs Muted</div>
            </CardContent>
          </Card>
        </div>

        {/* Button Variations */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
          <CardHeader>
            <CardTitle>Button Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button>Primary Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
            </div>
          </CardContent>
        </Card>

        {/* Badge Variations */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-card to-card/80">
          <CardHeader>
            <CardTitle>Badge Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge className="bg-green-100 text-green-800">Success</Badge>
              <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
              <Badge className="bg-blue-100 text-blue-800">Info</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card p-4 mt-8">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Last Update: 14:25:33</span>
            <span>Active Trains: 18</span>
            <span>System Load: 78%</span>
          </div>
          <div className="flex items-center gap-4">
            <span>AI Confidence: 94%</span>
            <span>Network Latency: 12ms</span>
            <span>Version 2.4.1</span>
          </div>
        </div>
      </footer>
    </div>
  );
}