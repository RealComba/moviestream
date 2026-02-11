import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import MediaCard from "./MediaCard";
import "../css/embla.css";

export function EmblaCarousel({ movies = [] }) {
  const slides = Array.isArray(movies) ? movies : [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, containScroll: 'trimSnaps' });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onFocusCapture = useCallback((e) => {
    if (!emblaApi) return;
    const target = e.target;
    const slideNode = target.closest('.embla__slide');
    if (slideNode) {
      const index = Array.from(slideNode.parentNode.children).indexOf(slideNode);
      if (index !== -1) {
        emblaApi.scrollTo(index);
      }
    }
  }, [emblaApi]);

  if (!slides.length) return null;

  return (
    <section className="embla" onFocusCapture={onFocusCapture}>
      <button className="embla__button embla__button--prev" onClick={scrollPrev}>‹</button>

      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((movie) => (
            <div className="embla__slide" key={movie.id}>
              <MediaCard media={movie} />
            </div>
          ))}
        </div>
      </div>

      <button className="embla__button embla__button--next" onClick={scrollNext}>›</button>
    </section>
  );
}

export default EmblaCarousel;
