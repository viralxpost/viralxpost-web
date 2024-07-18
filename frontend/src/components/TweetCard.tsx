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
}

export function TweetCard({ tweet }: TweetCardProps) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{tweet.title}</CardTitle>
      </CardHeader>
      <CardContent>{tweet.content}</CardContent>
      <CardFooter className=" justify-end">
        <Button variant="destructive">Delete</Button>
      </CardFooter>
    </Card>
  );
}
