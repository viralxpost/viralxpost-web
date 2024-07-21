// src/components/TweetCard.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Idea } from "@/http/api";

interface TweetCardProps {
  idea: Idea;
  onDelete: (id: string) => void;
}

export function IdeaCard({ idea, onDelete }: TweetCardProps) {
  const handleDelete = () => {
    if (idea._id) {
      onDelete(idea._id);
    } else {
      console.error("Idea id is missing.");
    }
  };
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{idea.title}</CardTitle>
      </CardHeader>
      <CardContent>{idea.content}</CardContent>
      <CardFooter className=" justify-end">
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
