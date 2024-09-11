import { Button } from "@/components/ui/button";
import { FaXTwitter } from "react-icons/fa6";

const TweetButton = ({ tweetContent }: { tweetContent: string }) => {
  const handleTweet = () => {
    const tweetText = encodeURIComponent(tweetContent);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(tweetUrl, "_blank");
  };

  return (
    <Button onClick={handleTweet} className="flex items-center gap-2">
      <FaXTwitter className="h-6 w-6" />
    </Button>
  );
};

export default TweetButton;
