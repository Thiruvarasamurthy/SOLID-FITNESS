import { gymConfig } from '@/content/gym-config';
import { LocationMap } from '@/components/ui/location-map';

function httpsUrl(value: string | null) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password
      ? value
      : null;
  } catch {
    return null;
  }
}

export function Location() {
  const location = gymConfig.location;
  const directions = httpsUrl(location.directionsUrl);
  const business = httpsUrl(location.googleBusinessUrl);
  const candidate = httpsUrl(location.embedUrl);
  const embed = candidate ? new URL(candidate) : null;
  const verifiedEmbed =
    location.embedVerified &&
    embed &&
    ['www.google.com', 'maps.google.com'].includes(embed.hostname) &&
    embed.pathname.startsWith('/maps/embed')
      ? candidate
      : null;
  return (
    <section
      id="location" data-bg-section="location"
      className="training location"
      aria-labelledby="location-title"
      tabIndex={-1}
    >
      <h2 id="location-title">{location.heading}</h2>
      <div className="location-grid">
        <div>
          <address>{gymConfig.address}</address>
          <p className="location-hours">Opening hours: {location.hours}</p>
          <div className="contact-actions">
            {directions && (
              <a className="button" href={directions}>
                Get Directions
              </a>
            )}
            {business && (
              <a className="button button-secondary" href={business}>
                View on Google Business
              </a>
            )}
          </div>
        </div>
        <LocationMap
          embedUrl={verifiedEmbed}
          title={`${gymConfig.identity.name} ${gymConfig.identity.branch} location map`}
          placeholder={location.mapPlaceholder}
        />
      </div>
    </section>
  );
}
