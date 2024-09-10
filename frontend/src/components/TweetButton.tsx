import { Button } from "@/components/ui/button";
import { TwitterLogoIcon } from "@radix-ui/react-icons";

const TweetButton = ({ tweetContent }: { tweetContent: string }) => {
  const handleTweet = () => {
    const tweetText = encodeURIComponent(tweetContent);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(tweetUrl, "_blank");
  };

  return (
    <Button onClick={handleTweet} className="flex items-center gap-2">
      <TwitterLogoIcon fontSize={24} />
    </Button>
  );
};

export default TweetButton;
