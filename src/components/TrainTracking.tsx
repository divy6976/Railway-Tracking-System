import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Train, MapPin, AlertCircle, Clock, Navigation, Zap } from "lucide-react";

interface TrainPosition {
  id: string;
  name: string;
  status: "moving" | "waiting" | "delayed" | "at_station";
  position: { x: number; y: number };
  speed: number;
  destination: string;
  delay: number;
  track: string;
}

interface Station {
  id: string;
  name: string;
  position: { x: number; y: number };
}

interface Track {
  id: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
  status: "clear" | "occupied" | "maintenance";
}

export function TrainTracking() {
  const trains: TrainPosition[] = [
    { id: "T001", name: "Express A", status: "moving", position: { x: 150, y: 100 }, speed: 65, destination: "Central Station", delay: 0, track: "Track 1" },
    { id: "T002", name: "Local B", status: "at_station", position: { x: 300, y: 150 }, speed: 0, destination: "North Terminal", delay: 0, track: "Platform 2" },
    { id: "T003", name: "Freight C", status: "delayed", position: { x: 200, y: 200 }, speed: 25, destination: "Depot", delay: 8, track: "Track 3" },
    { id: "T004", name: "Express D", status: "waiting", position: { x: 100, y: 250 }, speed: 0, destination: "South Station", delay: 3, track: "Signal 4" },
    { id: "T005", name: "Regional E", status: "moving", position: { x: 350, y: 120 }, speed: 45, destination: "East Junction", delay: 0, track: "Track 2" }
  ];

  const stations: Station[] = [
    { id: "S001", name: "Central", position: { x: 200, y: 80 } },
    { id: "S002", name: "North", position: { x: 320, y: 140 } },
    { id: "S003", name: "South", position: { x: 120, y: 240 } },
    { id: "S004", name: "East", position: { x: 380, y: 200 } }
  ];

  const tracks: Track[] = [
    { id: "T1", start: { x: 50, y: 100 }, end: { x: 400, y: 100 }, status: "occupied" },
    { id: "T2", start: { x: 50, y: 150 }, end: { x: 400, y: 150 }, status: "clear" },
    { id: "T3", start: { x: 50, y: 200 }, end: { x: 400, y: 200 }, status: "maintenance" },
    { id: "T4", start: { x: 50, y: 250 }, end: { x: 400, y: 250 }, status: "clear" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "moving": return "text-green-600";
      case "waiting": return "text-yellow-600";
      case "delayed": return "text-red-600";
      case "at_station": return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "moving": return <Badge className="bg-green-100 text-green-800">Moving</Badge>;
      case "waiting": return <Badge className="bg-yellow-100 text-yellow-800">Waiting</Badge>;
      case "delayed": return <Badge variant="destructive">Delayed</Badge>;
      case "at_station": return <Badge className="bg-blue-100 text-blue-800">At Station</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTrackColor = (status: string) => {
    switch (status) {
      case "clear": return "#22c55e";
      case "occupied": return "#3b82f6";
      case "maintenance": return "#ef4444";
      default: return "#6b7280";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="flex items-center gap-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          <Navigation className="h-6 w-6" />
          Live Train Tracking
        </h2>
        <p className="text-muted-foreground">Real-time positions and status of all trains in the section</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Schematic Map */}
        <Card className="xl:col-span-2 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              Railway Section Schematic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-80 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg overflow-hidden shadow-inner">
              <svg width="100%" height="100%" viewBox="0 0 450 300" className="absolute inset-0">
                {/* Draw tracks */}
                {tracks.map((track) => (
                  <line
                    key={track.id}
                    x1={track.start.x}
                    y1={track.start.y}
                    x2={track.end.x}
                    y2={track.end.y}
                    stroke={getTrackColor(track.status)}
                    strokeWidth="6"
                    strokeLinecap="round"
                    className="drop-shadow-sm"
                  />
                ))}
                
                {/* Draw stations */}
                {stations.map((station) => (
                  <g key={station.id}>
                    <rect
                      x={station.position.x - 15}
                      y={station.position.y - 10}
                      width="30"
                      height="20"
                      fill="url(#stationGradient)"
                      rx="3"
                      className="drop-shadow-md"
                    />
                    <text
                      x={station.position.x}
                      y={station.position.y + 25}
                      textAnchor="middle"
                      className="text-xs fill-gray-600"
                    >
                      {station.name}
                    </text>
                  </g>
                ))}
                
                {/* Gradient definitions */}
                <defs>
                  <linearGradient id="stationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1f2937" />
                    <stop offset="100%" stopColor="#374151" />
                  </linearGradient>
                </defs>
                
                {/* Draw trains */}
                {trains.map((train) => (
                  <g key={train.id}>
                    <circle
                      cx={train.position.x}
                      cy={train.position.y}
                      r="10"
                      fill={train.status === "delayed" ? "#ef4444" : train.status === "moving" ? "#22c55e" : "#f59e0b"}
                      stroke="#fff"
                      strokeWidth="3"
                      className="drop-shadow-lg animate-pulse"
                    />
                    <text
                      x={train.position.x}
                      y={train.position.y - 15}
                      textAnchor="middle"
                      className="text-xs fill-gray-800"
                    >
                      {train.name}
                    </text>
                  </g>
                ))}
              </svg>
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-1 bg-green-500 rounded"></div>
                    <span>Clear Track</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-1 bg-blue-500 rounded"></div>
                    <span>Occupied</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-1 bg-red-500 rounded"></div>
                    <span>Maintenance</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Train List */}
        <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Train className="h-5 w-5 text-green-500" />
              Active Trains
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {trains.map((train) => (
              <div key={train.id} className="flex items-center justify-between p-3 rounded-lg border hover:shadow-md transition-all duration-200 hover:scale-102 bg-gradient-to-r from-background to-background/80">
                <div className="flex items-center gap-3">
                  <Train className={`h-4 w-4 ${getStatusColor(train.status)}`} />
                  <div>
                    <div className="font-medium">{train.name}</div>
                    <div className="text-sm text-muted-foreground">{train.destination}</div>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  {getStatusBadge(train.status)}
                  <div className="text-xs text-muted-foreground">
                    {train.speed > 0 ? (
                      <span className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        {train.speed} km/h
                      </span>
                    ) : 'Stopped'}
                  </div>
                  {train.delay > 0 && (
                    <div className="text-xs text-red-600 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      +{train.delay}min
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}