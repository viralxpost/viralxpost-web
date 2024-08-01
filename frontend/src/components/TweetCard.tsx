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
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface TweetCardProps {
  tweet: Tweet;
  onDelete: (id: string) => void;
}

export function TweetCard({ tweet, onDelete }: TweetCardProps) {
  const [copied, setCopied] = useState(false);
  const handleDelete = () => {
    if (tweet._id) {
      onDelete(tweet._id);
    } else {
      console.error("Tweet id is missing.");
    }
  };

  const handleCopy = () => {
    if (tweet.content) {
      navigator.clipboard.writeText(tweet.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 10000);
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>{tweet.title}</CardTitle>
      </CardHeader>
      <CardContent>{tweet.content}</CardContent>
      <CardFooter className="justify-end bottom-1">
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
