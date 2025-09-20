import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Brain, CheckCircle, XCircle, Clock, AlertTriangle, TrendingUp, Sparkles, Zap } from "lucide-react";

interface Recommendation {
  id: string;
  type: "priority" | "hold" | "reroute" | "speed_adjustment";
  title: string;
  description: string;
  train: string;
  reasoning: string;
  confidence: number;
  impact: "high" | "medium" | "low";
  timeToExecute: string;
  benefits: string[];
}

export function AIRecommendations() {
  const recommendations: Recommendation[] = [
    {
      id: "R001",
      type: "priority",
      title: "Prioritize Express A",
      description: "Give priority to Express A at Junction 2 to maintain schedule",
      train: "Express A (T001)",
      reasoning: "Express A is carrying 340 passengers and has a tight connection at Central Station. Delaying it would cascade to 3 other services.",
      confidence: 92,
      impact: "high",
      timeToExecute: "Immediate",
      benefits: ["Maintains on-time performance", "Prevents passenger delays", "Optimizes network flow"]
    },
    {
      id: "R002",
      type: "hold",
      title: "Hold Local B at North Station",
      description: "Keep Local B at platform for 3 minutes to optimize traffic flow",
      train: "Local B (T002)",
      reasoning: "Freight C is approaching from the opposite direction. A brief hold will prevent conflicts and reduce overall delay.",
      confidence: 87,
      impact: "medium",
      timeToExecute: "3 minutes",
      benefits: ["Prevents track conflicts", "Reduces system-wide delays"]
    },
    {
      id: "R003",
      type: "reroute",
      title: "Reroute Regional E via Track 4",
      description: "Redirect Regional E to Track 4 due to maintenance on Track 2",
      train: "Regional E (T005)",
      reasoning: "Track 2 maintenance window starting in 15 minutes. Rerouting now prevents service disruption.",
      confidence: 95,
      impact: "low",
      timeToExecute: "Next signal",
      benefits: ["Avoids maintenance conflicts", "Maintains service continuity"]
    },
    {
      id: "R004",
      type: "speed_adjustment",
      title: "Reduce Speed for Freight C",
      description: "Decrease speed to 40 km/h to improve following distance",
      train: "Freight C (T003)",
      reasoning: "Current speed profile is creating bunching effect. Speed reduction will improve traffic flow and safety margins.",
      confidence: 78,
      impact: "low",
      timeToExecute: "Next kilometer",
      benefits: ["Improves safety margins", "Reduces energy consumption", "Smooths traffic flow"]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "priority": return <TrendingUp className="h-4 w-4" />;
      case "hold": return <Clock className="h-4 w-4" />;
      case "reroute": return <AlertTriangle className="h-4 w-4" />;
      case "speed_adjustment": return <Brain className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "priority": return "bg-blue-100 text-blue-800";
      case "hold": return "bg-yellow-100 text-yellow-800";
      case "reroute": return "bg-orange-100 text-orange-800";
      case "speed_adjustment": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const [approved, setApproved] = useState<string[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);

  const toggleApprove = (id: string) => {
    setApproved((prev) => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
    setRejected((prev) => prev.filter(x => x !== id));
  };

  const toggleReject = (id: string) => {
    setRejected((prev) => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
    setApproved((prev) => prev.filter(x => x !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            AI Decision Recommendations
          </h2>
          <p className="text-muted-foreground">Intelligent suggestions to optimize railway operations</p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          AI System Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {recommendations.map((rec) => (
          <Card key={rec.id} className={`relative hover:shadow-lg transition-all duration-300 hover:scale-102 border-0 bg-gradient-to-br from-card to-card/80 ${approved.includes(rec.id) ? 'ring-2 ring-green-500/40' : rejected.includes(rec.id) ? 'ring-2 ring-red-500/40' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(rec.type)}
                  <CardTitle className="text-base">{rec.title}</CardTitle>
                </div>
                <Badge className={`${getTypeColor(rec.type)} shadow-sm`}>
                  {rec.type.replace('_', ' ')}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{rec.description}</p>
              {(approved.includes(rec.id) || rejected.includes(rec.id)) && (
                <div className={`mt-2 text-xs font-medium ${approved.includes(rec.id) ? 'text-green-600' : 'text-red-600'}`}>
                  {approved.includes(rec.id) ? 'Approved' : 'Rejected'}
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Affected Train:</span>
                  <span className="font-medium">{rec.train}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Confidence:</span>
                  <span className="font-medium">{rec.confidence}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Impact Level:</span>
                  <span className={`font-medium ${getImpactColor(rec.impact)}`}>
                    {rec.impact.charAt(0).toUpperCase() + rec.impact.slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Execute:</span>
                  <span className="font-medium">{rec.timeToExecute}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-gradient-to-r from-muted/50 to-muted/30 border border-border/50">
                <h4 className="text-sm font-medium mb-2">AI Reasoning:</h4>
                <p className="text-sm text-muted-foreground">{rec.reasoning}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Expected Benefits:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {rec.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1 hover:scale-105 transition-transform" variant={approved.includes(rec.id) ? 'secondary' : 'default'} onClick={() => toggleApprove(rec.id)}>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {approved.includes(rec.id) ? 'Undo' : 'Approve'}
                </Button>
                <Button size="sm" variant={rejected.includes(rec.id) ? 'secondary' : 'outline'} className="flex-1 hover:scale-105 transition-transform" onClick={() => toggleReject(rec.id)}>
                  <XCircle className="h-4 w-4 mr-1" />
                  {rejected.includes(rec.id) ? 'Undo' : 'Reject'}
                </Button>
                <Button size="sm" variant="secondary">
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Performance Stats */}
      <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            AI Performance Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 hover:scale-105 transition-transform">
              <div className="text-2xl font-bold text-green-600 flex items-center justify-center gap-1">
                <Zap className="h-5 w-5" />
                127
              </div>
              <div className="text-sm text-muted-foreground">Recommendations</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 hover:scale-105 transition-transform">
              <div className="text-2xl font-bold text-blue-600">89%</div>
              <div className="text-sm text-muted-foreground">Acceptance Rate</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 hover:scale-105 transition-transform">
              <div className="text-2xl font-bold text-purple-600">12.3%</div>
              <div className="text-sm text-muted-foreground">Delay Reduction</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 hover:scale-105 transition-transform">
              <div className="text-2xl font-bold text-orange-600">€1,240</div>
              <div className="text-sm text-muted-foreground">Cost Savings</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}