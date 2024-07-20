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
import { generateThread } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const threadFormats = [
  {
    label: "My Journey",
    template: `🧵 Thread: {My Journey in {Field}}

1/ {Starting Point} - {Brief background or origin}

2/ {First Major Milestone} - {What happened and its impact}

3/ {Overcoming Challenges} - {Describe challenges faced and solutions}

4/ {Recent Achievements} - {Recent successes or learnings}

5/ {Future Goals} - {What’s next?} {Call to action}`
  },
  {
    label: "FAQs",
    template: `🧵 Thread: {Frequently Asked Questions about {Topic}}

1/ {FAQ 1} - {Answer to FAQ 1}

2/ {FAQ 2} - {Answer to FAQ 2}

3/ {FAQ 3} - {Answer to FAQ 3}

4/ {FAQ 4} - {Answer to FAQ 4}

5/ {Additional Resources} - {Links or recommendations} {Call to action}`
  },
  {
    label: "Pro Tips",
    template: `🧵 Thread: {Pro Tips for {Topic}}

1/ {Pro Tip 1} - {Explanation or benefit}

2/ {Pro Tip 2} - {Explanation or benefit}

3/ {Pro Tip 3} - {Explanation or benefit}

4/ {Pro Tip 4} - {Explanation or benefit}

5/ {Bonus Tip} - {Extra advice or resource} {Call to action}`
  },
  {
    label: "In-Depth Analysis",
    template: `🧵 Thread: {In-Depth Analysis of {Topic}}

1/ {Introduction} - {Overview of the analysis}

2/ {Key Finding 1} - {Details and implications}

3/ {Key Finding 2} - {Details and implications}

4/ {Key Finding 3} - {Details and implications}

5/ {Summary and Conclusion} - {Final thoughts and insights} {Call to action}`
  },
  {
    label: "Comparison",
    template: `🧵 Thread: {Comparison of {Item 1} vs {Item 2}}

1/ {Introduction} - {Overview of the comparison}

2/ {Aspect 1} - {Item 1} vs {Item 2}

3/ {Aspect 2} - {Item 1} vs {Item 2}

4/ {Aspect 3} - {Item 1} vs {Item 2}

5/ {Final Verdict} - {Which one is better and why?} {Call to action}`
  },
  {
    label: "Behind the Scenes",
    template: `🧵 Thread: {Behind the Scenes of {Project/Event}}

1/ {Introduction} - {What is being shared}

2/ {Preparation} - {How it all started}

3/ {Challenges} - {What went wrong and how it was fixed}

4/ {Key Moments} - {Notable events or milestones}

5/ {Final Outcome} - {Results and reflections} {Call to action}`
  },
  {
    label: "Case Study",
    template: `🧵 Thread: {Case Study: {Project/Client}}

1/ {Introduction} - {Overview of the case study}

2/ {Problem Statement} - {What problem was addressed}

3/ {Solution} - {How the problem was solved}

4/ {Results} - {Outcomes and impact}

5/ {Key Takeaways} - {Lessons learned and advice} {Call to action}`
  },
  {
    label: "Trend Analysis",
    template: `🧵 Thread: {Trend Analysis of {Topic}}

1/ {Introduction} - {Overview of the trend}

2/ {Trend 1} - {Details and significance}

3/ {Trend 2} - {Details and significance}

4/ {Trend 3} - {Details and significance}

5/ {Future Outlook} - {What to expect next} {Call to action}`
  },
  {
    label: "Event Highlights",
    template: `🧵 Thread: {Highlights from {Event}}

1/ {Highlight 1} - {Key moment or insight}

2/ {Highlight 2} - {Key moment or insight}

3/ {Highlight 3} - {Key moment or insight}

4/ {Highlight 4} - {Key moment or insight}

5/ {Overall Impression} - {General thoughts and reflections} {Call to action}`
  }
];


const GenerateThread = () => {
  const [description, setDescription] = useState("");
  const [format, setFormat] = useState("");
  const [tone, setTone] = useState("");
  const [domain, setDomain] = useState("");
  const [generatedThreads, setGeneratedThreads] = useState("");

  const { mutateAsync, error, data } = useMutation({
    mutationFn: generateThread,
  });

  useEffect(() => {
    if (data) {
      setGeneratedThreads(data.thread.content);
    }
  }, [data]);

  useEffect(() => {
    if (config.isDevelopment && generatedThreads.length > 0) {
      console.log("Generated thread:", generatedThreads);
    }
  }, [generatedThreads]);

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
      console.error("Error generating thread:", error);
      // Add UI feedback for errors
    }
  };

  return (
    <TooltipProvider>
      <div className="flex flex-1 rounded-lg border border-dashed shadow-sm">
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative grid flex-col items-start gap-8 md:flex">
            <form className="grid w-full items-start gap-6" onSubmit={handleSubmit}>
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Generate Thread
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="content">Thread Description</Label>
                  <Textarea
                    id="content"
                    placeholder="Describe your thread topic..."
                    className="min-h-[20rem]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="format">Thread Format</Label>
                  <Select onValueChange={handleFormat} defaultValue={format}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a format" />
                    </SelectTrigger>
                    <SelectContent>
                      {threadFormats.map((format, index) => (
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
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="creative">Creative</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="domain">Domain</Label>
                  <Select onValueChange={handleDomain} defaultValue={domain}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select domain" />
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
              <Button type="submit">Generate Thread</Button>
            </form>
          </div>
          <div className="relative md:flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <Badge variant="outline" className="absolute right-3 top-3">
              Output
            </Badge>
            <div>
              {generatedThreads ? (
                <p className="mt-5 whitespace-pre-line">{generatedThreads}</p>
              ) : (
                <p className="mt-5">No thread generated yet. Please generate a thread by filling out the form above.</p>
              )}
            </div>
            {error && <div className="mt-4 text-red-500">{error.message}</div>}
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default GenerateThread;
