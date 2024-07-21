// src/components/TweetCard.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tweet } from "@/http/api";

interface TweetCardProps {
  tweet: Tweet;
  onDelete: (id: string) => void;
}

export function TweetCard({ tweet, onDelete }: TweetCardProps) {
  const handleDelete = () => {
    if (tweet._id) {
      onDelete(tweet._id);
    } else {
      console.error("Tweet id is missing.");
    }
  };
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>{tweet.title}</CardTitle>
      </CardHeader>
      <CardContent>{tweet.content}</CardContent>
      <CardFooter className="justify-end bottom-1">
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
