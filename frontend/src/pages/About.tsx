const About = () => {
  return (
    <section className="py-20 md:mt-10">
      <div className="max-w-[1200px] mx-auto px-8">

      <h1 className="md:text-5xl lg:text-6xl text-3xl md:text-[54px] md:leading-[60px] font-black tracking-tighter bg-gradient-to-b from-black to-zinc-700 text-transparent bg-clip-text mt-5">About Us</h1>
      <div className="lg:max-w-[1150px] mx-auto py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="mt-4 text-lg">
            At ViralXPost, our mission is to help individuals and businesses
            create engaging and impactful content on Twitter. We believe that
            everyone has a story to tell, and our tool is designed to help you
            share yours with the world in a way that resonates and drives
            engagement.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Who We Are</h2>
          <p className="mt-4 text-lg">
            We are a team of passionate content creators, social media
            enthusiasts, and technology experts dedicated to making social media
            content creation easy and effective. With years of experience in the
            industry, we understand the challenges of maintaining a consistent
            and engaging social media presence.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">What We Do</h2>
          <p className="mt-4 text-lg">
            Our tool leverages insights from successful tweets and user
            engagement patterns to help you craft tweets that capture attention.
            Whether you're looking to increase your followers, boost engagement,
            or simply share your message, ViralXPost provides the resources and
            support you need.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Why Choose Us</h2>
          <p className="mt-4 text-lg">
            We are committed to providing a user-friendly platform that delivers
            real results. Our focus on simplicity, effectiveness, and customer
            support sets us apart. Join our community of satisfied users who
            have transformed their Twitter presence with ViralXPost.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          <p className="mt-4 text-lg">
            Have questions or need support? Reach out to us at {" "}
            <a href="mailto:viralxpost.xyz@gmail.com" className="text-blue-600 hover:underline">
              viralxpost.xyz@gmail.com
            </a>
            . We're here to help you succeed on Twitter.
          </p>
        </div>
      </div>
      </div>
    </section>
  );
};

export default About;

