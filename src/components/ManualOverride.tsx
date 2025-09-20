import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Settings, Play, Pause, RotateCw, AlertCircle, Shield } from "lucide-react";
import { useState } from "react";

export function ManualOverride() {
  const [selectedTrain, setSelectedTrain] = useState<string>("");
  const [speedOverride, setSpeedOverride] = useState([65]);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [autoMode, setAutoMode] = useState(true);

  const activeTrains = [
    { id: "T001", name: "Express A", currentSpeed: 65, maxSpeed: 80 },
    { id: "T002", name: "Local B", currentSpeed: 0, maxSpeed: 60 },
    { id: "T003", name: "Freight C", currentSpeed: 25, maxSpeed: 50 },
    { id: "T004", name: "Express D", currentSpeed: 0, maxSpeed: 80 },
    { id: "T005", name: "Regional E", currentSpeed: 45, maxSpeed: 70 }
  ];

  const pendingActions = [
    { id: "A001", action: "Priority for Express A", train: "T001", status: "pending" },
    { id: "A002", action: "Hold Local B", train: "T002", status: "approved" },
    { id: "A003", action: "Speed reduction for Freight C", train: "T003", status: "pending" }
  ];

  const signalStates = [
    { id: "SIG001", name: "Junction A", state: "green", canOverride: true },
    { id: "SIG002", name: "Platform 2", state: "red", canOverride: true },
    { id: "SIG003", name: "Maintenance Zone", state: "yellow", canOverride: false },
    { id: "SIG004", name: "South Exit", state: "green", canOverride: true }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSignalColor = (state: string) => {
    switch (state) {
      case "green": return "bg-green-500";
      case "yellow": return "bg-yellow-500";
      case "red": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Manual Override Panel
          </h2>
          <p className="text-muted-foreground">Direct control and intervention capabilities</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch checked={autoMode} onCheckedChange={setAutoMode} />
            <Label>Auto Mode</Label>
          </div>
          <Badge variant={emergencyMode ? "destructive" : "secondary"}>
            {emergencyMode ? "Emergency Mode" : "Normal Mode"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Train Control */}
        <Card>
          <CardHeader>
            <CardTitle>Train Control</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Select Train</Label>
              <Select value={selectedTrain} onValueChange={setSelectedTrain}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a train" />
                </SelectTrigger>
                <SelectContent>
                  {activeTrains.map((train) => (
                    <SelectItem key={train.id} value={train.id}>
                      {train.name} - {train.currentSpeed} km/h
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedTrain && (
              <>
                <div>
                  <Label>Speed Override (km/h)</Label>
                  <div className="pt-2">
                    <Slider
                      value={speedOverride}
                      onValueChange={setSpeedOverride}
                      max={80}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>0</span>
                      <span>{speedOverride[0]} km/h</span>
                      <span>80</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <Play className="h-4 w-4 mr-1" />
                    Start
                  </Button>
                  <Button variant="outline" size="sm">
                    <Pause className="h-4 w-4 mr-1" />
                    Stop
                  </Button>
                </div>

                <Button variant="destructive" size="sm" className="w-full">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Emergency Stop
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Signal Control */}
        <Card>
          <CardHeader>
            <CardTitle>Signal Override</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {signalStates.map((signal) => (
              <div key={signal.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getSignalColor(signal.state)}`}></div>
                  <div>
                    <div className="font-medium">{signal.name}</div>
                    <div className="text-sm text-muted-foreground capitalize">{signal.state} Signal</div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={!signal.canOverride}
                >
                  Override
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingActions.map((action) => (
              <div key={action.id} className="p-3 rounded-lg border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{action.action}</span>
                  <Badge className={getStatusColor(action.status)}>
                    {action.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Train: {activeTrains.find(t => t.id === action.train)?.name}
                </div>
                {action.status === "pending" && (
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">Approve</Button>
                    <Button size="sm" variant="outline" className="flex-1">Reject</Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Emergency Controls */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Shield className="h-5 w-5" />
            Emergency Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="destructive" size="lg" className="h-16">
              <AlertCircle className="h-6 w-6 mr-2" />
              System Emergency Stop
            </Button>
            <Button variant="outline" size="lg" className="h-16 border-red-200 text-red-600 hover:bg-red-50">
              <RotateCw className="h-6 w-6 mr-2" />
              Reset All Signals
            </Button>
            <Button variant="outline" size="lg" className="h-16 border-orange-200 text-orange-600 hover:bg-orange-50">
              Enable Emergency Mode
            </Button>
          </div>

          <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm text-red-800">
              <strong>Warning:</strong> Emergency controls will override all AI recommendations and automated systems. 
              Use only in critical situations. All actions are logged and require supervisor approval.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}