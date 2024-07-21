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
import { generateIdea } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const formats = [
  {
    label: "Quick Tips",
    template: `Generate ideas for quick tech tips. Each idea should include:

1. Brief description of the tech tip
2. Steps to implement the tip
3. A takeaway message and call to action`,
  },
  {
    label: "Myth Busting",
    template: `Generate ideas for myth-busting tech misconceptions. Each idea should include:

1. A common tech myth
2. The reality of the myth
3. Three myths with their corresponding realities
4. A takeaway message and call to action`,
  },
  {
    label: "Trending Tech News",
    template: `Generate ideas for tweets about trending tech news. Each idea should include:

1. A tech news headline
2. A brief explanation of why it matters
3. Key points of the news
4. A takeaway message and call to action`,
  },
  {
    label: "Tech How-To",
    template: `Generate ideas for tech how-to guides. Each idea should include:

1. An action to be achieved
2. Steps to achieve the action
3. A call to action to follow for more tips`,
  },
  {
    label: "Best Tools",
    template: `Generate ideas for tweets about top tools for specific tasks. Each idea should include:

1. The task to be performed
2. A list of top tools for the task with brief descriptions
3. A takeaway message and call to action`,
  },
  {
    label: "Tech Challenges",
    template: `Generate ideas for solving common tech problems. Each idea should include:

1. A common tech problem
2. Three solutions to the problem
3. A takeaway message and call to action`,
  },
  {
    label: "Predictions",
    template: `Generate ideas for future tech predictions. Each idea should include:

1. A tech field
2. Three predictions for the future of the tech field
3. A call to action to share thoughts`,
  },
  {
    label: "Fun Facts",
    template: `Generate ideas for tech fun facts. Each idea should include:

1. A tech fun fact
2. Three supporting facts
3. A takeaway message and call to action`,
  },
  {
    label: "Tech Comparisons",
    template: `Generate ideas for tech comparisons. Each idea should include:

1. Two tech items to compare
2. Three comparison points
3. A takeaway message and call to action`,
  },
  {
    label: "Inspirational Tech Quotes",
    template: `Generate ideas for tweets featuring inspirational tech quotes. Each idea should include:

1. An inspirational tech quote
2. The author of the quote
3. A brief explanation of why it matters
4. A takeaway message and call to action`,
  },
];

const GenerateIdea = () => {
  const [description, setDescription] = useState("");
  const [format, setFormat] = useState("");
  const [tone, setTone] = useState("");
  const [domain, setDomain] = useState("");
  const [generatedIdeas, setGeneratedIdeas] = useState("");

  const { mutateAsync, error, data } = useMutation({
    mutationFn: generateIdea,
  });

  useEffect(() => {
    if (data) {
      const ideaContent = data.idea.content;
      setGeneratedIdeas(ideaContent);
    }
  }, [data]);

  useEffect(() => {
    if (config.isDevelopment && generatedIdeas.length > 0) {
      console.log("Generated idea:", generatedIdeas);
    }
  }, [generatedIdeas]);

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
      console.error("Error generating idea:", error);
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
                  <Label htmlFor="content">Idea Description</Label>
                  <Textarea
                    id="content"
                    placeholder="How to build a saas..."
                    className="min-h-[25.5rem]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="domain">Domain</Label>
                  <Select onValueChange={handleDomain} defaultValue={domain}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Tech</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="role">Idea Format</Label>
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
                      <SelectItem value="funny">Funny</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="encouraging">Encouraging</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="informative">Informative</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                      <SelectItem value="passionate">Passionate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </fieldset>
              <Button type="submit">Generate Idea</Button>
            </form>
          </div>
          <div className="relative md:flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <Badge variant="outline" className="absolute right-3 top-3">
              Generated Idea
            </Badge>
            <div>
              {generatedIdeas ? (
                <p className="mt-10 whitespace-pre-line">{generatedIdeas}</p>
              ) : (
                <p className="mt-10">
                  No idea generated yet. Please generate a idea by filling out
                  the form.
                </p>
              )}
            </div>
            {error && <div className="mt-4 text-red-500">{error.message}</div>}
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default GenerateIdea;
