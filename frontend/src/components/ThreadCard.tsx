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
  onDelete: (id: string) => void;
}

export function ThreadCard({ thread, onDelete }: ThreadCardProps) {
  const handleDelete = () => {
    if (thread._id) {
      onDelete(thread._id);
    } else {
      console.error("Thread id is missing.");
    }
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{thread.title}</CardTitle>
      </CardHeader>
      <CardContent>{thread.content}</CardContent>
      <CardFooter className=" justify-end">
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
