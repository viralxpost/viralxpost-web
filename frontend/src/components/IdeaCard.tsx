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
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface IdeaCardProps {
  idea: Idea;
  onDelete: (id: string) => void;
}

export function IdeaCard({ idea, onDelete }: IdeaCardProps) {
  const [copied, setCopied] = useState(false);
  const handleDelete = () => {
    if (idea._id) {
      onDelete(idea._id);
    } else {
      console.error("Idea id is missing.");
    }
  };

  const handleCopy = () => {
    if (idea.content) {
      navigator.clipboard.writeText(idea.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 10000);
    }
  };
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>{idea.title}</CardTitle>
      </CardHeader>
      <CardContent>{idea.content}</CardContent>
      <CardFooter className=" justify-end">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCopy}>
            {copied ? <Check className="w-4 h-4" /> : <Copy />}
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
