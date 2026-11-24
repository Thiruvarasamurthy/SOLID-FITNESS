import Image from 'next/image';
import { gymConfig } from '@/content/gym-config';

export function BrandLogo({
  eager = false,
  className = '',
}: {
  eager?: boolean;
  className?: string;
}) {
  const logo = gymConfig.identity.logo;
  return (
    <span className={`brand-logo ${className}`}>
      <Image
        className="brand-logo-dark"
        src={logo.src}
        width={logo.width}
        height={logo.height}
        alt={logo.alt}
        loading={eager ? 'eager' : 'lazy'}
        sizes="(min-width: 1280px) 136px, 113px"
      />
      <Image
        className="brand-logo-light"
        src={logo.lightSrc}
        width={logo.width}
        height={logo.height}
        alt={logo.alt}
        loading={eager ? 'eager' : 'lazy'}
        sizes="(min-width: 1280px) 136px, 113px"
      />
    </span>
  );
}
