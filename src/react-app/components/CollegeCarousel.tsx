import { useEffect, useRef } from 'react';

const colleges = [
  { name: 'MIT', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/512px-MIT_logo.svg.png' },
  { name: 'Stanford', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Stanford_University.svg/512px-Seal_of_Stanford_University.svg.png' },
  { name: 'Berkeley', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/512px-Seal_of_University_of_California%2C_Berkeley.svg.png' },
  { name: 'Oxford', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Oxford-University-Circlet.svg/512px-Oxford-University-Circlet.svg.png' },
  { name: 'CMU', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Carnegie_Mellon_University_seal.svg/512px-Carnegie_Mellon_University_seal.svg.png' },
  { name: 'Harvard', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/512px-Harvard_University_coat_of_arms.svg.png' },
  { name: 'Yale', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/512px-Yale_University_Shield_1.svg.png' },
  { name: 'Princeton', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/512px-Princeton_seal.svg.png' },
];

export default function CollegeCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset position when we've scrolled past the first set of logos
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const doubledColleges = [...colleges, ...colleges];

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-12">
          Trusted by students applying to top universities
        </h2>
        
        <div 
          ref={scrollRef}
          className="overflow-hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex space-x-12 w-fit">
            {doubledColleges.map((college, index) => (
              <div
                key={`${college.name}-${index}`}
                className="flex-shrink-0 w-24 h-24 flex items-center justify-center p-4 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <img
                  src={college.logo}
                  alt={`${college.name} logo`}
                  className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
