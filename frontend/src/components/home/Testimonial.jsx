import { TestimonialCard, AuthorCard } from '../TestimonialCard';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      rating: 5,
      testimonial: "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.",
      author: "Leslie Alexander",
      role: "Freelance React Developer",
      avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png"
    },
    {
      id: 2,
      rating: 5,
      testimonial: "Simply the best. Better than all the rest. I'd recommend this product to beginners and advanced users.",
      author: "Jacob Jones",
      role: "Digital Marketer",
      avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png"
    },
    {
      id: 3,
      rating: 5,
      testimonial: "I cannot believe that I have got a brand new landing page after getting Omega. It was super easy to edit and publish.",
      author: "Jenny Wilson",
      role: "Graphic Designer",
      avatar: "https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png"
    }
  ];

  return (
    <section id='review' className="py-12  sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <p className="text-lg font-medium text-textSecondary font-poppins">
              2,157 people have said how good Rareblocks
            </p>
            <h2 className="mt-4 text-3xl font-bold text-textPrimary sm:text-4xl xl:text-5xl font-poppins">
              Our happy clients say about us
            </h2>
          </div>

          <div className="mt-8 text-center md:mt-16 md:order-3">
            <a
              href="#"
              className="pb-2 text-base font-bold leading-7 text-textPrimary transition-all duration-200 border-b-2 border-textPrimary hover:border-textSecondary font-poppins focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2 hover:text-textSecondary"
            >
              Check all 2,157 reviews
            </a>
          </div>

          <div className="relative mt-10 md:mt-24 md:order-2">
            <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
              <div
                className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
                style={{
                  background: "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
                }}
              />
            </div>

            <div className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  rating={testimonial.rating}
                  testimonial={testimonial.testimonial}
                  author={testimonial.author}
                  role={testimonial.role}
                  avatar={testimonial.avatar}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 mt-8 md:mt-12 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-textPrimary tracking-tight leading-snug">
            Founder
          </h1>
          <p className="mt-4 text-lg md:text-xl text-textSecondary max-w-2xl mx-auto">
            Meet the visionary behind our company, leading innovation and building products that make a real impact.
          </p>
        </div>
        <AuthorCard />
      </div>

    </section>
  );
};

export default TestimonialSection;