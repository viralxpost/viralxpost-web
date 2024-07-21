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
                    placeholder="coding languages..."
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
                  <Label htmlFor="role">Idea Type</Label>
                  <Select onValueChange={handleFormat} defaultValue={format}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tweet">Tweet</SelectItem>
                      <SelectItem value="thread">Thread</SelectItem>
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
