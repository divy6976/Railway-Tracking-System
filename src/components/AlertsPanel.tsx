import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { AlertCircle, AlertTriangle, Info, CheckCircle, X, Clock, MapPin, Shield, Zap } from "lucide-react";
import { useState } from "react";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info" | "success";
  title: string;
  description: string;
  location: string;
  timestamp: string;
  acknowledged: boolean;
  actionRequired: boolean;
  affectedTrains?: string[];
}

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "A001",
      type: "critical",
      title: "Signal System Failure",
      description: "Junction 2 signal system is not responding. Manual control activated.",
      location: "Junction 2",
      timestamp: "14:23",
      acknowledged: false,
      actionRequired: true,
      affectedTrains: ["Express A", "Local B"]
    },
    {
      id: "A002",
      type: "warning",
      title: "Track Maintenance Window",
      description: "Scheduled maintenance on Track 3 starting in 30 minutes.",
      location: "Track 3, Section B",
      timestamp: "14:15",
      acknowledged: true,
      actionRequired: false,
      affectedTrains: ["Freight C"]
    },
    {
      id: "A003",
      type: "critical",
      title: "Emergency Stop Activated",
      description: "Freight C has activated emergency stop due to obstacle detection.",
      location: "Mile 23.4",
      timestamp: "14:20",
      acknowledged: false,
      actionRequired: true,
      affectedTrains: ["Freight C"]
    },
    {
      id: "A004",
      type: "warning",
      title: "Passenger Delay Threshold",
      description: "Express A delay has exceeded 10 minutes. Passenger notifications sent.",
      location: "Central Station",
      timestamp: "14:18",
      acknowledged: true,
      actionRequired: false,
      affectedTrains: ["Express A"]
    },
    {
      id: "A005",
      type: "info",
      title: "Weather Advisory",
      description: "Light rain expected in next hour. Speed restrictions may apply.",
      location: "System Wide",
      timestamp: "14:10",
      acknowledged: true,
      actionRequired: false
    },
    {
      id: "A006",
      type: "success",
      title: "Delay Recovery",
      description: "Local B has recovered from previous delay and is back on schedule.",
      location: "North Station",
      timestamp: "14:05",
      acknowledged: true,
      actionRequired: false,
      affectedTrains: ["Local B"]
    }
  ]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical": return <AlertCircle className="h-4 w-4" />;
      case "warning": return <AlertTriangle className="h-4 w-4" />;
      case "info": return <Info className="h-4 w-4" />;
      case "success": return <CheckCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical": return "border-red-200 bg-red-50";
      case "warning": return "border-yellow-200 bg-yellow-50";
      case "info": return "border-blue-200 bg-blue-50";
      case "success": return "border-green-200 bg-green-50";
      default: return "border-gray-200 bg-gray-50";
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "critical": return "destructive";
      case "warning": return "secondary";
      case "info": return "secondary";
      case "success": return "secondary";
      default: return "secondary";
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "critical": return "bg-red-100 text-red-800";
      case "warning": return "bg-yellow-100 text-yellow-800";
      case "info": return "bg-blue-100 text-blue-800";
      case "success": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const criticalAlerts = alerts.filter(a => a.type === "critical" && !a.acknowledged);
  const warningAlerts = alerts.filter(a => a.type === "warning" && !a.acknowledged);
  const unacknowledgedCount = alerts.filter(a => !a.acknowledged).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 shadow-lg">
              <AlertCircle className="h-5 w-5 text-white" />
            </div>
            Alerts & Notifications
          </h2>
          <p className="text-muted-foreground">System alerts, warnings, and status updates</p>
        </div>
        <div className="flex items-center gap-2">
          {unacknowledgedCount > 0 && (
            <Badge variant="destructive">
              {unacknowledgedCount} Unacknowledged
            </Badge>
          )}
          <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
            Clear All
          </Button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-red-200 hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium">Critical</span>
            </div>
            <div className="text-2xl font-bold text-red-600 mt-1">{criticalAlerts.length}</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium">Warnings</span>
            </div>
            <div className="text-2xl font-bold text-yellow-600 mt-1">{warningAlerts.length}</div>
          </CardContent>
        </Card>
        <Card className="border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Info</span>
            </div>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {alerts.filter(a => a.type === "info").length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Resolved</span>
            </div>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {alerts.filter(a => a.type === "success").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            Active Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-96">
            <div className="space-y-2 p-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.type)} ${
                    alert.acknowledged ? "opacity-60" : "hover:shadow-md transition-all duration-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{alert.title}</h4>
                          <Badge className={getBadgeColor(alert.type)}>
                            {alert.type.toUpperCase()}
                          </Badge>
                          {alert.actionRequired && (
                            <Badge variant="outline" className="text-red-600 border-red-200">
                              Action Required
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {alert.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {alert.timestamp}
                          </div>
                          {alert.affectedTrains && (
                            <div>
                              Affects: {alert.affectedTrains.join(", ")}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {!alert.acknowledged && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="hover:scale-105 transition-transform"
                        >
                          Acknowledge
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => dismissAlert(alert.id)}
                        className="hover:scale-105 transition-transform"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}