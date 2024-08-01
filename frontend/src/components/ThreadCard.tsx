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
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface ThreadCardProps {
  thread: Thread;
  onDelete: (id: string) => void;
}

export function ThreadCard({ thread, onDelete }: ThreadCardProps) {
  const [copied, setCopied] = useState(false);
  const handleDelete = () => {
    if (thread._id) {
      onDelete(thread._id);
    } else {
      console.error("Thread id is missing.");
    }
  };

  const handleCopy = () => {
    if (thread.content) {
      navigator.clipboard.writeText(thread.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 10000);
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>{thread.title}</CardTitle>
      </CardHeader>
      <CardContent>{thread.content}</CardContent>
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
