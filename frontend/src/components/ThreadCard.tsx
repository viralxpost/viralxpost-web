// src/components/TweetCard.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Thread } from "@/http/api";

interface ThreadCardProps {
  thread: Thread;
}

export function ThreadCard({ thread }: ThreadCardProps) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{thread.title}</CardTitle>
      </CardHeader>
      <CardContent>{thread.content}</CardContent>
      <CardFooter className=" justify-end">
        <Button variant="destructive">Delete</Button>
      </CardFooter>
    </Card>
  );
}
