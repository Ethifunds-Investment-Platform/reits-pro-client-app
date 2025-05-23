
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  completionPercentage: z.number().min(0).max(100),
  challenges: z.string().optional(),
  nextSteps: z.string().min(10, "Next steps must be at least 10 characters"),
});

type UpdateFormValues = z.infer<typeof updateSchema>;

const ProjectUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Find project - in production, this would be fetched from an API
  const projectName = id === "proj1" ? "Lagos Heights Residential" : 
                      id === "proj2" ? "Abuja Tech Park" : "Unknown Project";

  const form = useForm<UpdateFormValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      title: `${projectName} - 60 Day Update`,
      description: "",
      completionPercentage: 0,
      challenges: "",
      nextSteps: "",
    },
  });

  const onSubmit = async (data: UpdateFormValues) => {
    setIsSubmitting(true);
    
    try {
      // This would be an API call in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Update submitted successfully",
        description: "Your investors will be notified of the project update."
      });
      
      navigate("/developer/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error submitting update",
        description: "Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout requiredRole="developer">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-800">Project Update</h1>
        <p className="text-gray-600 mt-2">
          Provide a 60-day update for {projectName}
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>60-Day Project Update</CardTitle>
          <CardDescription>
            This update will be shared with all investors in this project.
            Regular updates help maintain investor confidence.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Update Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a title for this update" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Progress Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the progress made since the last update" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Include specific milestones achieved and any important developments.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="completionPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Completion Percentage</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0"
                        max="100"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Estimate the overall project completion percentage.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="challenges"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Challenges (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe any challenges or obstacles encountered" 
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Being transparent about challenges helps build trust with investors.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nextSteps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Next Steps</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="What are the next steps for the upcoming period?" 
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate("/developer/dashboard")}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-navy-800 hover:bg-navy-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Update"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ProjectUpdate;
