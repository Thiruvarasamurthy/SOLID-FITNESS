import { GalleryTabs } from '@/components/ui/gallery-tabs';
import { CardIcon } from '@/components/ui/card-icon';
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
      <GalleryTabs
        label={gymConfig.gallerySection.heading}
        items={galleryImages.map((image, index) => ({
          id: image.id,
          label: `${gymConfig.gallerySection.photoLabel} ${index + 1}`,
          content: (
            <figure key={image.id} className="gallery-item">
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                sizes="(min-width: 1380px) 1280px, calc(100vw - 40px)"
                loading="lazy"
              />
              <figcaption>
                <CardIcon />
                <h3>{image.caption}</h3>
              </figcaption>
            </figure>
          ),
        }))}
      />
      <a className="button gallery-visit" href="#location">
        {gymConfig.gallerySection.visitLabel}
      </a>
    </section>
  );
}
