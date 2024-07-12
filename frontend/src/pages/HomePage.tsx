import Container from "@/components/Container"
import { Hero, HeroSubtitle, HeroTitle } from "@/components/Hero"
import { Link } from "react-router-dom"


const HomePage = () => {
  return (
    <Container>
          <Hero
          >
            <HeroTitle>
            Start Generating Viral Tweets Today <br /> Let <Link  to="/" className="hover:bg-zinc-400 inline-block text-transparent bg-clip-text">viralxpost</Link> Be Your Guide.
            </HeroTitle>
            <HeroSubtitle>
              Meet the new standard for modern software development. <br/>
              Streamline issues, sprints, and product roadmaps.
            </HeroSubtitle>
            {/* <img src="/img/hero.webp" alt="Hero image"/> */}
          </Hero>
        </Container>
  )
}

export default HomePage
