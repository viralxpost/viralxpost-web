
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
export function TweetCard() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Common uses of web3 include:
        </CardTitle>
      </CardHeader>
      <CardContent>
      Selling goods and services online with near-zero fees.

Selling digital or physical items, ensuring that each item is genuine.

Instant global payment, without the time and expense of traditional money transfer companies
      </CardContent>
      <CardFooter className=" justify-end">
        <Button variant="destructive">Delete</Button>
      </CardFooter>
    </Card>
  )
}
