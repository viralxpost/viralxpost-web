import { Button } from "@/components/ui/button"
import { MagicWandIcon } from "@radix-ui/react-icons"


const Home = () => {
  return (
    <>
      <div className="flex items-center">
          </div>
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
              Generate Your First Post
              </h3>
              <p className="text-sm text-muted-foreground">
                You can generate your first X post using ai.
              </p>
              <Button className="mt-4 flex gap-3"><MagicWandIcon/> Generate</Button>
            </div>
          </div>
    </>
  )
}

export default Home
