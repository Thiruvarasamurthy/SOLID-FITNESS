import Image from 'next/image';
import { gymConfig } from '@/content/gym-config';
import { galleryImages, showGallery } from '@/lib/gallery';

export function Gallery() {
  if (!showGallery) return null;
  return (
    <section
      id="gallery"
      className="training gallery"
      aria-labelledby="gallery-title"
      tabIndex={-1}
    >
      <h2 id="gallery-title">{gymConfig.gallerySection.heading}</h2>
      <div className="gallery-grid">
        {galleryImages.map((image) => (
          <figure key={image.id} className="gallery-item">
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              sizes="(min-width: 1380px) 416px, (min-width: 1100px) 33vw, (min-width: 768px) 50vw, 100vw"
              loading="lazy"
            />
            <figcaption>{image.caption}</figcaption>
          </figure>
        ))}
      </div>
      <a className="button gallery-visit" href="#location">
        {gymConfig.gallerySection.visitLabel}
      </a>
    </section>
  );
}
