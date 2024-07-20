import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TooltipProvider } from "@/components/ui/tooltip";
import config from "@/config/config";
import { generateTweet } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const formats = [
  {
    label: "Quick Tips",
    template: `Tech tip: {Brief description of the tech tip}
Here's how to do it:

1. {Step 1}
2. {Step 2}
3. {Step 3}

{Takeaway Message} {Call to action}`
  },
  {
    label: "Myth Busting",
    template: `Everyone thinks {common tech myth}
    
But here's the truth: {reality}

1. Myth: {Myth 1} - Reality: {Reality 1}
2. Myth: {Myth 2} - Reality: {Reality 2}
3. Myth: {Myth 3} - Reality: {Reality 3}

{Takeaway Message} {Call to action}`
  },
  {
    label: "Trending Tech News",
    template: `Breaking: {Tech News Headline}

Why it matters: {Brief explanation}

Key points:

1. {Point 1}
2. {Point 2}
3. {Point 3}

{Takeaway Message} {Call to action}`
  },
  // Add other formats similarly
];

const GenerateTweet = () => {
  const [description, setDescription] = useState("");
  const [format, setFormat] = useState("default");
  const [tone, setTone] = useState("default");
  const [domain, setDomain] = useState("default");
  const [generatedTweets, setGeneratedTweets] = useState<string[]>([]);

  const { mutateAsync, error, data } = useMutation({
    mutationFn: generateTweet,
  });

  useEffect(() => {
    if (data) {
      const tweetContent = data.tweet.content;
      setGeneratedTweets((prevTweets) => [...prevTweets, tweetContent]);
    }
  }, [data]);

  useEffect(() => {
    if (config.isDevelopment && generatedTweets.length > 0) {
      console.log("Generated tweet:", generatedTweets);
    }
  }, [generatedTweets]);

  const handleFormat = (value: string) => {
    setFormat(value);
  };

  const handleTone = (value: string) => {
    setTone(value);
  };

  const handleDomain = (value: string) => {
    setDomain(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutateAsync({
        title: description,
        format,
        voice: tone,
        tags: domain,
      });
    } catch (error) {
      console.error("Error generating tweet:", error);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex flex-1 rounded-lg border border-dashed shadow-sm">
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            className="relative grid flex-col items-start gap-8 md:flex"
            x-chunk="dashboard-03-chunk-0"
          >
            <form
              className="grid w-full items-start gap-6"
              onSubmit={handleSubmit}
            >
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Messages
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="content">Tweet Description</Label>
                  <Textarea
                    id="content"
                    placeholder="How to build a saas..."
                    className="min-h-[25.5rem]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="role">Tweet Format</Label>
                  <Select onValueChange={handleFormat} defaultValue={format}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a format" />
                    </SelectTrigger>
                    <SelectContent>
                      {formats.map((format, index) => (
                        <SelectItem key={index} value={format.template}>
                          {format.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tone">Tone of Voice</Label>
                  <Select onValueChange={handleTone} defaultValue={tone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="domain">Domain</Label>
                  <Select onValueChange={handleDomain} defaultValue={domain}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="tech">Tech</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </fieldset>
              <Button type="submit">Generate Tweet</Button>
            </form>
          </div>
          <div className="relative md:flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <Badge variant="outline" className="absolute right-3 top-3">
              Generated Tweet
            </Badge>
            <div>
              {generatedTweets.length > 0 ? (
                generatedTweets.map((tweet, index) => (
                  <div key={index} className="mt-4">
                    <p>{tweet}</p>
                  </div>
                ))
              ) : (
                <div className="mt-4">
                  <p>No tweet generated yet.</p>
                </div>
              )}
            </div>
            {error && <div className="mt-4 text-red-500">{error.message}</div>}
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default GenerateTweet;
