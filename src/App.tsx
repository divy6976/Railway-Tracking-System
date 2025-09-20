import { useState, useEffect, createContext, useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./components/ui/sheet";
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
  Menu
} from "lucide-react";

import { Dashboard } from "./components/Dashboard";
import { TrainTracking } from "./components/TrainTracking";
import { AIRecommendations } from "./components/AIRecommendations";
import { ManualOverride } from "./components/ManualOverride";
import { ScenarioSimulation } from "./components/ScenarioSimulation";
import { AlertsPanel } from "./components/AlertsPanel";
import { AnalyticsPanel } from "./components/AnalyticsPanel";
import { SettingsPanel } from "./components/SettingsPanel";
import FigmaDesignShowcase from "./FigmaDesignShowcase";

// Theme Context
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [criticalAlerts] = useState(2);
  const [emergencyMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check if dark mode preference exists in localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved !== null ? JSON.parse(saved) : false;
    }
    return false;
  });

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "tracking", label: "Live Tracking", icon: MapPin },
    { id: "ai", label: "AI Recommendations", icon: Brain },
    { id: "override", label: "Manual Override", icon: SettingsIcon },
    { id: "simulation", label: "Simulation", icon: Play },
    { id: "alerts", label: "Alerts", icon: AlertCircle, badge: criticalAlerts },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: User },
    { id: "figma", label: "Figma Design", icon: LayoutDashboard }
  ];

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          {/* Desktop Header (>1030px) */}
          <div className="hidden xl:flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">Railway Control Center</h1>
                  <p className="text-xs text-muted-foreground">Section A - Central District</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant={emergencyMode ? "destructive" : "secondary"}>
                  {emergencyMode ? "EMERGENCY MODE" : "NORMAL OPERATION"}
                </Badge>
                <Badge variant="outline" className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  System Operational
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right text-sm">
                <div className="font-medium">Controller A</div>
                <div className="text-muted-foreground">Day Shift</div>
              </div>
              <Button variant="outline" size="sm" onClick={toggleDarkMode}>
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm">
                <Shield className="h-4 w-4 mr-2" />
                Supervisor
              </Button>
              {criticalAlerts > 0 && (
                <Button variant="destructive" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                    {criticalAlerts}
                  </span>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Header (≤1030px) */}
          <div className="xl:hidden">
            {/* Top Row - Main Navigation */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {/* Mobile Menu Button */}
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Navigation Menu
                      </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-2 mt-4">
                      {navItems.map((item) => (
                        <Button
                          key={item.id}
                          variant={activeTab === item.id ? "default" : "ghost"}
                          className="justify-start relative"
                          onClick={() => {
                            setActiveTab(item.id);
                            setMobileMenuOpen(false);
                          }}
                        >
                          <item.icon className="h-4 w-4 mr-2" />
                          {item.label}
                          {item.badge && item.badge > 0 && (
                            <span className="ml-auto w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                              {item.badge}
                            </span>
                          )}
                        </Button>
                      ))}
                    </div>
                    
                    {/* User Info in Mobile Menu */}
                    <div className="mt-6 pt-4 border-t">
                      <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                        <Shield className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium text-sm">Controller A</div>
                          <div className="text-xs text-muted-foreground">Day Shift • Supervisor</div>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Compact Logo */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-base font-semibold">Railway Control</h1>
                    <p className="text-xs text-muted-foreground hidden sm:block">Section A</p>
                  </div>
                </div>
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={toggleDarkMode}>
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                {criticalAlerts > 0 && (
                  <Button variant="destructive" size="sm" className="relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                      {criticalAlerts}
                    </span>
                  </Button>
                )}
              </div>
            </div>

            {/* Bottom Row - Status Badges */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge 
                  variant={emergencyMode ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  {emergencyMode ? "EMERGENCY" : "NORMAL"}
                </Badge>
                <Badge 
                  variant="outline" 
                  className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 text-xs"
                >
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                  Online
                </Badge>
              </div>
              
              {/* Mobile User Info */}
              <div className="text-right text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  <span>Controller A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Desktop Navigation - Hidden on mobile */}
          <div className="mb-6 hidden xl:block">
            <TabsList className="grid grid-cols-9 h-auto p-1">
              {navItems.map((item) => (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className="flex flex-col gap-1 p-3 relative"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-xs">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Mobile Navigation Indicator - Shows current tab */}
          <div className="mb-6 xl:hidden">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  {(() => {
                    const currentItem = navItems.find(item => item.id === activeTab);
                    return currentItem ? (
                      <>
                        <currentItem.icon className="h-5 w-5" />
                        <span className="font-medium">{currentItem.label}</span>
                        {currentItem.badge && currentItem.badge > 0 && (
                          <Badge variant="destructive" className="ml-auto">
                            {currentItem.badge}
                          </Badge>
                        )}
                      </>
                    ) : null;
                  })()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Panels */}
          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard />
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6">
            <TrainTracking />
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <AIRecommendations />
          </TabsContent>

          <TabsContent value="override" className="space-y-6">
            <ManualOverride />
          </TabsContent>

          <TabsContent value="simulation" className="space-y-6">
            <ScenarioSimulation />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <AlertsPanel />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsPanel />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <SettingsPanel />
          </TabsContent>

          <TabsContent value="figma" className="space-y-6">
            <FigmaDesignShowcase />
          </TabsContent>
        </Tabs>
      </div>

      {/* Status Bar */}
      <footer className="border-t bg-card mt-auto">
        <div className="container mx-auto px-4 py-2">
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
        </div>
      </footer>
      </div>
    </ThemeContext.Provider>
  );
}