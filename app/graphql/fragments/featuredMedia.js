export const FEATURED_MEDIA_FRAGMENT = `#graphql
  fragment featuredMedia on Media {
    alt
    id
    preview{
        image{
            altText
            url(transform: {maxHeight: 100, maxWidth: 100})
        }
    }
  }
`;
