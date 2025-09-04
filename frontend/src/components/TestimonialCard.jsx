const StarIcon = ({ className = "w-5 h-5 text-[#FDB241]" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const StarRating = ({ rating = 5 }) => (
  <div className="flex items-center">
    {[...Array(rating)].map((_, index) => (
      <StarIcon key={index} />
    ))}
  </div>
);

import { useInView } from "react-intersection-observer";

export const TestimonialCard = ({
  rating = 5,
  testimonial,
  author,
  role,
  avatar,
  className = ""
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={`flex flex-col overflow-hidden shadow-xl rounded-md transition-all duration-700
        ${className} ${inView ? "fade-in" : "opacity-0 translate-y-8"}`}
    >
      <div className="flex flex-col justify-between flex-1 p-6 bg-bgPrimary lg:py-8 lg:px-7">
        <div className="flex-1">
          <StarRating rating={rating} />

          <blockquote className="flex-1 mt-8">
            <p className="text-lg leading-relaxed text-textPrimary font-poppins">
              "{testimonial}"
            </p>
          </blockquote>
        </div>

        <div className="flex items-center mt-8">
          <img
            className="flex-shrink-0 object-cover rounded-full w-11 h-11"
            src={avatar}
            alt={`${author}'s avatar`}
          />
          <div className="ml-4">
            <p className="text-base font-bold text-textPrimary font-poppins">{author}</p>
            <p className="mt-0.5 text-sm font-poppins text-textSecondary">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};



export const AuthorCard = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  return (
    <div ref={ref} className={`bg-bgPrimary rounded-3xl p-4 border-border shadow-md relative overflow-hidden max-w-4xl mx-auto w-full ${inView ? "fade-in" : "opacity-0 translate-y-8"}`}>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <div className="flex justify-center md:justify-start rounded-2xl md:col-span-1 overflow-hidden">
          <img
            src="https://i.pinimg.com/736x/d9/21/4a/d9214ad661353dffe8846da342e1a004.jpg"
            alt="Sarah Johnson"
            className="w-70 h-70 rounded-2xl object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="text-center md:text-left md:col-span-2">
          <div className="mb-4 md:mb-8">
            <h2 className="text-textPrimary font-bold text-2xl mb-2 font-poppins">
              Sarah Johnson
            </h2>
            <p className="text-primary font-semibold text-[1rem] font-poppins">
              CEO & Founder
            </p>
          </div>

          <p className="text-textSecondary text-base md:text-lg leading-relaxed font-poppins text-justify">
            With over 15 years in technology and business strategy, Sarah leads the vision and growth of our company. She's passionate about innovation and building products that make a difference in people's lives.
          </p>
        </div>
      </div>
    </div>
  )
};
