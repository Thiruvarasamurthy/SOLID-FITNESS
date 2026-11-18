import { gymConfig } from '@/content/gym-config';
import { approvedTestimonials, showTestimonials } from '@/lib/testimonials';

export function Testimonials() {
  if (!showTestimonials) return null;

  return (
    <section
      id="testimonials"
      className="training testimonials"
      aria-labelledby="testimonials-title"
      tabIndex={-1}
    >
      <h2 id="testimonials-title">{gymConfig.testimonialsSection.heading}</h2>
      {approvedTestimonials.length === 0 ? (
        <div className="training-placeholder">
          <p className="eyebrow">Content placeholder</p>
          <p>{gymConfig.testimonialsSection.placeholder}</p>
        </div>
      ) : (
        <div className="testimonials-list">
          {approvedTestimonials.map((story) => (
            <figure className="testimonial" key={story.id}>
              <blockquote>
                <p>{story.quote}</p>
              </blockquote>
              <figcaption>
                <strong>{story.displayName}</strong>
                <span>{story.source}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
