import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Settings, User, Shield, Moon, Sun, Bell, Database, Wifi } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../App";

export function SettingsPanel() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [aiAssistance, setAiAssistance] = useState(true);

  const userProfile = {
    name: "Controller A",
    role: "Senior Train Controller",
    shift: "Day Shift (06:00 - 14:00)",
    certifications: ["Level 3 Controller", "Emergency Response", "Safety Systems"],
    lastLogin: "Today at 06:00"
  };

  const systemSettings = [
    { key: "refresh_interval", label: "Auto Refresh Interval", value: "5 seconds", options: ["1s", "5s", "10s", "30s"] },
    { key: "alert_threshold", label: "Delay Alert Threshold", value: "3 minutes", options: ["1min", "3min", "5min", "10min"] },
    { key: "map_update", label: "Map Update Rate", value: "Real-time", options: ["Real-time", "5s", "10s"] },
    { key: "ai_confidence", label: "AI Confidence Threshold", value: "80%", options: ["70%", "80%", "90%", "95%"] }
  ];

  const rolePermissions = {
    "Controller": ["View Dashboard", "Control Trains", "Override Signals", "View Reports"],
    "Supervisor": ["All Controller", "Emergency Controls", "User Management", "System Config"],
    "Administrator": ["All Supervisor", "Database Access", "Security Settings", "Audit Logs"]
  };

  const connectedSystems = [
    { name: "Central Traffic Control", status: "Connected", lastSync: "2 min ago" },
    { name: "Weather Service", status: "Connected", lastSync: "5 min ago" },
    { name: "Passenger Information", status: "Connected", lastSync: "1 min ago" },
    { name: "Maintenance System", status: "Offline", lastSync: "15 min ago" },
    { name: "Emergency Services", status: "Connected", lastSync: "3 min ago" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          System Settings & Security
        </h2>
        <p className="text-muted-foreground">Configure user preferences, permissions, and system settings</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  User Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="" />
                    <AvatarFallback>CA</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{userProfile.name}</h3>
                    <p className="text-sm text-muted-foreground">{userProfile.role}</p>
                    <p className="text-xs text-muted-foreground">{userProfile.shift}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label>Name</Label>
                    <Input value={userProfile.name} />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Select defaultValue="controller">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="controller">Train Controller</SelectItem>
                        <SelectItem value="supervisor">Supervisor</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Shift Pattern</Label>
                    <Select defaultValue="day">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Day Shift (06:00-14:00)</SelectItem>
                        <SelectItem value="evening">Evening Shift (14:00-22:00)</SelectItem>
                        <SelectItem value="night">Night Shift (22:00-06:00)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="w-full">Update Profile</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certifications & Training</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Active Certifications</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userProfile.certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Safety Training</span>
                    <Badge className="bg-green-100 text-green-800">Valid until Dec 2024</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Emergency Response</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Expires Jan 2024</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Technical Systems</span>
                    <Badge className="bg-green-100 text-green-800">Valid until Mar 2024</Badge>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  View Training Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Display & Interface</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <Label>Dark Mode</Label>
                </div>
                <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <Label>Sound Notifications</Label>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <Label>Auto Refresh Data</Label>
                </div>
                <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <Label>AI Assistance</Label>
                </div>
                <Switch checked={aiAssistance} onCheckedChange={setAiAssistance} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Time Zone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">EST</SelectItem>
                      <SelectItem value="pst">PST</SelectItem>
                      <SelectItem value="cet">CET</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Access Control
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Current Role: Controller</Label>
                  <div className="mt-2 space-y-2">
                    {rolePermissions.Controller.map((permission, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {permission}
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Request Additional Permissions
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Session Timeout</Label>
                  <Select defaultValue="8h">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">1 Hour</SelectItem>
                      <SelectItem value="4h">4 Hours</SelectItem>
                      <SelectItem value="8h">8 Hours</SelectItem>
                      <SelectItem value="12h">12 Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Two-Factor Authentication</Label>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground">Enabled</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full">
                    Download Recovery Codes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemSettings.map((setting, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Label>{setting.label}</Label>
                  <Select defaultValue={setting.value}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {setting.options.map((option, optIndex) => (
                        <SelectItem key={optIndex} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="h-5 w-5" />
                System Connections
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {connectedSystems.map((system, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium">{system.name}</div>
                    <div className="text-sm text-muted-foreground">Last sync: {system.lastSync}</div>
                  </div>
                  <Badge className={
                    system.status === "Connected" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }>
                    {system.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}