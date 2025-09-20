import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Play, RotateCw, Clock, AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";

interface SimulationResult {
  scenario: string;
  delayImpact: number;
  affectedTrains: number;
  alternativeRoutes: number;
  estimatedCost: number;
  recommendations: string[];
}

export function ScenarioSimulation() {
  const [selectedScenario, setSelectedScenario] = useState<string>("");
  const [delayTime, setDelayTime] = useState<string>("15");
  const [simulationResults, setSimulationResults] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const predefinedScenarios = [
    { id: "train_delay", name: "Train Delay", description: "Simulate delay for a specific train" },
    { id: "track_blockage", name: "Track Blockage", description: "Block a track section due to maintenance/incident" },
    { id: "signal_failure", name: "Signal Failure", description: "Simulate signal system failure" },
    { id: "weather_impact", name: "Weather Impact", description: "Reduced speeds due to weather conditions" },
    { id: "emergency_stop", name: "Emergency Stop", description: "Emergency stop scenario for safety" },
    { id: "peak_hour", name: "Peak Hour Load", description: "Increased traffic during rush hour" }
  ];

  const trains = [
    { id: "T001", name: "Express A" },
    { id: "T002", name: "Local B" },
    { id: "T003", name: "Freight C" },
    { id: "T004", name: "Express D" },
    { id: "T005", name: "Regional E" }
  ];

  const tracks = [
    { id: "TR001", name: "Track 1 - Main Line" },
    { id: "TR002", name: "Track 2 - Express Line" },
    { id: "TR003", name: "Track 3 - Freight Line" },
    { id: "TR004", name: "Track 4 - Local Line" }
  ];

  const runSimulation = () => {
    setIsSimulating(true);
    
    // Simulate processing time
    setTimeout(() => {
      const mockResults: SimulationResult = {
        scenario: selectedScenario,
        delayImpact: Math.floor(Math.random() * 30) + 5,
        affectedTrains: Math.floor(Math.random() * 8) + 2,
        alternativeRoutes: Math.floor(Math.random() * 3) + 1,
        estimatedCost: Math.floor(Math.random() * 5000) + 1000,
        recommendations: [
          "Reroute Express A via Track 4",
          "Increase frequency on Local services",
          "Deploy additional staff at Central Station",
          "Activate backup signaling system"
        ]
      };
      
      setSimulationResults(mockResults);
      setIsSimulating(false);
    }, 2000);
  };

  const resetSimulation = () => {
    setSimulationResults(null);
    setSelectedScenario("");
    setDelayTime("15");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="flex items-center gap-2">
          <Play className="h-5 w-5" />
          Scenario Simulation & What-If Analysis
        </h2>
        <p className="text-muted-foreground">Test different scenarios and analyze their impact on operations</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Simulation Setup */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Simulation Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="predefined" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="predefined">Predefined Scenarios</TabsTrigger>
                <TabsTrigger value="custom">Custom Scenario</TabsTrigger>
              </TabsList>
              
              <TabsContent value="predefined" className="space-y-4">
                <div>
                  <Label>Select Scenario</Label>
                  <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a scenario to simulate" />
                    </SelectTrigger>
                    <SelectContent>
                      {predefinedScenarios.map((scenario) => (
                        <SelectItem key={scenario.id} value={scenario.id}>
                          {scenario.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedScenario && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {predefinedScenarios.find(s => s.id === selectedScenario)?.description}
                    </p>
                  )}
                </div>

                {selectedScenario === "train_delay" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Select Train</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose train" />
                        </SelectTrigger>
                        <SelectContent>
                          {trains.map((train) => (
                            <SelectItem key={train.id} value={train.id}>
                              {train.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Delay Time (minutes)</Label>
                      <Input
                        type="number"
                        value={delayTime}
                        onChange={(e) => setDelayTime(e.target.value)}
                        placeholder="15"
                      />
                    </div>
                  </div>
                )}

                {selectedScenario === "track_blockage" && (
                  <div>
                    <Label>Select Track</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose track to block" />
                      </SelectTrigger>
                      <SelectContent>
                        {tracks.map((track) => (
                          <SelectItem key={track.id} value={track.id}>
                            {track.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="custom" className="space-y-4">
                <div>
                  <Label>Custom Scenario Description</Label>
                  <Input placeholder="Describe your custom scenario..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Duration (minutes)</Label>
                    <Input type="number" placeholder="30" />
                  </div>
                  <div>
                    <Label>Severity Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Impact</SelectItem>
                        <SelectItem value="medium">Medium Impact</SelectItem>
                        <SelectItem value="high">High Impact</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2 mt-6">
              <Button 
                onClick={runSimulation} 
                disabled={!selectedScenario || isSimulating}
                className="flex-1"
              >
                {isSimulating ? (
                  <>
                    <RotateCw className="h-4 w-4 mr-2 animate-spin" />
                    Simulating...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run Simulation
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={resetSimulation}>
                <RotateCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Scenarios */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Scenarios</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Clock className="h-4 w-4 mr-2" />
              +10 min delay on Express A
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Block Track 2 for 30 min
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingDown className="h-4 w-4 mr-2" />
              Reduce speeds by 20%
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="h-4 w-4 mr-2" />
              Peak hour simulation
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Simulation Results */}
      {simulationResults && (
        <Card>
          <CardHeader>
            <CardTitle>Simulation Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">+{simulationResults.delayImpact}min</div>
                <div className="text-sm text-muted-foreground">Average Delay Impact</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{simulationResults.affectedTrains}</div>
                <div className="text-sm text-muted-foreground">Affected Trains</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{simulationResults.alternativeRoutes}</div>
                <div className="text-sm text-muted-foreground">Alternative Routes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">€{simulationResults.estimatedCost.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Estimated Cost</div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">AI Recommendations:</h4>
              <div className="space-y-2">
                {simulationResults.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                    <Badge variant="secondary">{index + 1}</Badge>
                    <span className="text-sm">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Analysis Complete:</strong> The simulation shows moderate impact on operations. 
                Implementing the recommended mitigation strategies could reduce delay impact by up to 60%.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}