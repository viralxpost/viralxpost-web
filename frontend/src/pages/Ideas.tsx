import { IdeaCard } from "@/components/IdeaCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import config from "@/config/config";
import { deleteIdea, getAllIdeas, Idea } from "@/http/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Ideas = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<{ ideas: Idea[] }, Error>({
    queryKey: ["ideas"],
    queryFn: getAllIdeas,
  });
  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteIdea,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ideas"],
      });
    },
  });

  const handleDelete = async (id: string) => {
    if (config.isDevelopment) {
      console.log("Deleting idea with id:", id);
    }

    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error("Failed to delete idea:", error);
    }
  };

  if (config.isDevelopment) {
    console.log(data);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="flex"></div>
      <div
        className="flex flex-1 flex-col rounded-lg py-8 border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <main className="grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="grid">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="draft">Draft</TabsTrigger>
                </TabsList>
                <div className="">
                  <DropdownMenu>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Active
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link to="/dashboard/idea">
                    <Button size="sm" className="h-8 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Create Idea
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <TabsContent value="all"></TabsContent>
          </Tabs>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data?.ideas && data.ideas.length > 0
              ? [...data.ideas].reverse().map((idea, index) => {
                  const key = idea._id || index;
                  if (config.isDevelopment) {
                    console.log(`Idea Key: ${key}`);
                  }
                  return (
                    <IdeaCard key={key} onDelete={handleDelete} idea={idea} />
                  );
                })
              : error && <div>{error.message}</div>}
          </div>
        </main>
      </div>
    </>
  );
};

export default Ideas;
