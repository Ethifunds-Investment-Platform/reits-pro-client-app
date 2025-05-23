
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Clock, Calendar, Users, MapPin, BarChart, FileText } from "lucide-react";

// Fix: Renamed duplicate properties
interface Investor {
  id: string;
  name: string;
  amount: number;
  date: string;
}

interface ProjectUpdate {
  id: number;
  date: string;
  title: string;
  content: string;
}

interface Project {
  id: string;
  name: string;
  location: string;
  fundingGoal: number;
  fundingRaised: number;
  investorCount: number;
  status: string;
  description: string;
  startDate: string;
  estimatedCompletion: string;
  lastUpdate: string;
  nextUpdateDue: string;
  updates: ProjectUpdate[];
  investors: Investor[];
}

// Mock data (would come from API in production)
const projects: Record<string, Project> = {
  "proj1": {
    id: "proj1",
    name: "Lagos Heights Residential",
    location: "Lagos, Nigeria",
    fundingGoal: 250000,
    fundingRaised: 175000,
    investorCount: 42,
    status: "active",
    description: "A modern residential development featuring 24 luxury apartments in the heart of Lagos. The property includes amenities such as a swimming pool, gym, and 24-hour security.",
    startDate: "2024-11-15",
    estimatedCompletion: "2026-03-30",
    lastUpdate: "2025-04-01",
    nextUpdateDue: "2025-06-01",
    updates: [
      { id: 1, date: "2025-04-01", title: "Foundation Completed", content: "The foundation work has been completed ahead of schedule. We are now moving forward with structural framing." },
      { id: 2, date: "2025-02-01", title: "Project Kickoff", content: "We have secured all necessary permits and broken ground on the Lagos Heights Residential project." }
    ],
    investors: [
      { id: "inv1", name: "John Doe", amount: 25000, date: "2024-12-10" },
      { id: "inv2", name: "Jane Smith", amount: 15000, date: "2024-12-15" },
      { id: "inv3", name: "Michael Johnson", amount: 30000, date: "2025-01-05" },
      { id: "inv4", name: "Sarah Williams", amount: 10000, date: "2025-01-20" },
      { id: "inv5", name: "Robert Brown", amount: 20000, date: "2025-02-02" },
    ]
  },
  "proj2": {
    id: "proj2",
    name: "Abuja Tech Park",
    location: "Abuja, Nigeria",
    fundingGoal: 500000,
    fundingRaised: 125000,
    investorCount: 18,
    status: "active",
    description: "A state-of-the-art technology park featuring office spaces designed for tech startups and established companies. The development includes high-speed internet infrastructure, meeting rooms, and collaborative spaces.",
    startDate: "2025-01-10",
    estimatedCompletion: "2026-05-15",
    lastUpdate: "2025-03-15",
    nextUpdateDue: "2025-05-15",
    updates: [
      { id: 1, date: "2025-03-15", title: "Land Preparation Complete", content: "The land preparation phase has been completed and we are ready to begin foundation work." },
      { id: 2, date: "2025-01-20", title: "Project Launch", content: "The Abuja Tech Park project has officially launched with a groundbreaking ceremony attended by local officials." }
    ],
    investors: [
      { id: "inv6", name: "David Wilson", amount: 50000, date: "2025-01-15" },
      { id: "inv7", name: "Elizabeth Taylor", amount: 25000, date: "2025-02-10" },
      { id: "inv8", name: "James Anderson", amount: 20000, date: "2025-02-25" },
    ]
  }
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? projects[id] : null;

  if (!project) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-navy-800">Project Not Found</h2>
          <p className="mt-4 text-gray-600">The project you're looking for doesn't exist or you don't have access.</p>
          <Button asChild className="mt-6 bg-navy-800 hover:bg-navy-700">
            <Link to="/developer/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Calculate days until next update is due
  const getDaysUntilNextUpdate = () => {
    const today = new Date();
    const nextUpdate = new Date(project.nextUpdateDue);
    const diffTime = nextUpdate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <DashboardLayout requiredRole="developer">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-navy-800">{project.name}</h1>
          <div className="flex items-center mt-2 text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            {project.location}
            <span className="mx-2">•</span>
            <Badge variant="outline" className="ml-1">
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Badge>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">Edit Project</Button>
          <Button asChild className="bg-navy-800 hover:bg-navy-700">
            <Link to={`/developer/project/${project.id}/update`}>Provide Update</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Funding Progress</span>
                <span>{Math.round((project.fundingRaised / project.fundingGoal) * 100)}%</span>
              </div>
              <Progress value={(project.fundingRaised / project.fundingGoal) * 100} />
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">${project.fundingRaised.toLocaleString()}</span>
                <span className="text-gray-500">of ${project.fundingGoal.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Investors</p>
                <p className="text-3xl font-bold text-navy-800">{project.investorCount}</p>
              </div>
              <Users className="h-8 w-8 text-navy-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Next Update Due</p>
                <p className="text-lg font-bold text-navy-800">
                  {formatDate(project.nextUpdateDue)}
                </p>
                <p className="text-sm text-gray-500">
                  {getDaysUntilNextUpdate() < 0 
                    ? "Overdue" 
                    : `${getDaysUntilNextUpdate()} days remaining`}
                </p>
              </div>
              <Clock className="h-8 w-8 text-navy-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{project.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-2 text-navy-600" />
                  <p>{formatDate(project.startDate)}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estimated Completion</p>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-2 text-navy-600" />
                  <p>{formatDate(project.estimatedCompletion)}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Update</p>
                <div className="flex items-center mt-1">
                  <FileText className="h-4 w-4 mr-2 text-navy-600" />
                  <p>{formatDate(project.lastUpdate)}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Next Update Due</p>
                <div className="flex items-center mt-1">
                  <Clock className="h-4 w-4 mr-2 text-navy-600" />
                  <p>{formatDate(project.nextUpdateDue)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
                <div>
                  <p className="font-medium">Project Start</p>
                  <p className="text-sm text-gray-500">{formatDate(project.startDate)}</p>
                </div>
              </div>
              
              {project.updates.map((update, index) => (
                <div key={update.id} className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-navy-600 mr-3"></div>
                  <div>
                    <p className="font-medium">{update.title}</p>
                    <p className="text-sm text-gray-500">{formatDate(update.date)}</p>
                  </div>
                </div>
              ))}
              
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <p className="font-medium">Estimated Completion</p>
                  <p className="text-sm text-gray-500">{formatDate(project.estimatedCompletion)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="updates" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="updates" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Update History
          </TabsTrigger>
          <TabsTrigger value="investors" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Investors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="updates">
          <Card>
            <CardHeader>
              <CardTitle>Project Updates</CardTitle>
              <CardDescription>
                History of all updates provided to investors
              </CardDescription>
            </CardHeader>
            <CardContent>
              {project.updates.length > 0 ? (
                <div className="space-y-6">
                  {project.updates.map((update) => (
                    <div key={update.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold text-lg">{update.title}</h3>
                        <p className="text-sm text-gray-500">{formatDate(update.date)}</p>
                      </div>
                      <p className="text-gray-700">{update.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No updates have been posted yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investors">
          <Card>
            <CardHeader>
              <CardTitle>Project Investors</CardTitle>
              <CardDescription>
                List of investors who have funded this project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Investor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.investors.map((investor) => (
                    <TableRow key={investor.id}>
                      <TableCell>{investor.name}</TableCell>
                      <TableCell>${investor.amount.toLocaleString()}</TableCell>
                      <TableCell>{formatDate(investor.date)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ProjectDetail;
