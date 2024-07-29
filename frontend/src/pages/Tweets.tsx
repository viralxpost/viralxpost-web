import { TweetCard } from "@/components/TweetCard";
import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
// } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import config from "@/config/config";
import { deleteTweet, getAllTweets, Tweet } from "@/http/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Tweets = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<{ tweets: Tweet[] }, Error>({
    queryKey: ["tweets"],
    queryFn: getAllTweets,
  });
  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteTweet,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tweets"],
      });
    },
  });

  const handleDelete = async (id: string) => {
    if (config.isDevelopment) {
      console.log("Deleting tweet with id:", id);
    }

    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error("Failed to delete tweet:", error);
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
              <div className="flex items-center justify-end">
                <div className="">
                  <Link to="/dashboard/tweet">
                    <Button size="sm" className="h-8 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Create Tweet
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <TabsContent value="all"></TabsContent>
          </Tabs>

          <div className="grid lg:grid-cols-3 gap-4">
            {data?.tweets && data.tweets.length > 0
              ? [...data.tweets].reverse().map((tweet, index) => {
                  const key = tweet._id || index;
                  if (config.isDevelopment) {
                    console.log(`Tweet Key: ${key}`);
                  }
                  return (
                    <TweetCard
                      key={key}
                      onDelete={handleDelete}
                      tweet={tweet}
                    />
                  );
                })
              : error && <div>{error.message}</div>}
          </div>
        </main>
      </div>
    </>
  );
};

export default Tweets;
