import { gymConfig, type GalleryImage } from '@/content/gym-config';

type GalleryDisplayImage = Omit<GalleryImage, 'rightsApproved'>;

const preview = process.env.NODE_ENV !== 'production';

function isApprovedLocalImage(image: GalleryImage) {
  return (
    image.rightsApproved === true &&
    image.src.startsWith('/images/') &&
    !image.src.includes('..') &&
    !/[?#\\]/.test(image.src) &&
    Number.isInteger(image.width) &&
    image.width > 0 &&
    Number.isInteger(image.height) &&
    image.height > 0 &&
    image.alt.trim().length > 0
  );
}

const placeholder = (id: string) => ({
  id,
  ...gymConfig.gallerySection.placeholder,
});

export const galleryImages =
  gymConfig.gallery.length > 0
    ? gymConfig.gallery.flatMap<GalleryDisplayImage>((image) =>
        isApprovedLocalImage(image)
          ? [image]
          : preview
            ? [placeholder(image.id)]
            : [],
      )
    : preview
      ? gymConfig.gallerySection.previewSlots.map(placeholder)
      : [];

export const showGallery = galleryImages.length > 0;
