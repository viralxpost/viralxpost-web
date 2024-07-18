import { ThreadCard } from "@/components/ThreadCard";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllThreads, Thread } from "@/http/api";
import { useQuery } from "@tanstack/react-query";

import { PlusCircle } from "lucide-react";

const Threads = () => {
  const { data, error, isLoading } = useQuery<{ threads: Thread[] }, Error>({
    queryKey: ["threads"],
    queryFn: getAllThreads,
  });

  console.log(data);
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

                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Create Thread
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            <TabsContent value="all"></TabsContent>
          </Tabs>
          {isLoading && <div>Loading...</div>}
          {error && <div>Error loading tweets: {error.message}</div>}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data?.threads && data.threads.length > 0 ? (
              data.threads.map((tweet) => (
                <ThreadCard key={tweet.id} thread={tweet} />
              ))
            ) : (
              <div>No tweets available</div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Threads;
