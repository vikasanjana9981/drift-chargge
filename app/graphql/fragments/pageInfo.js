export const PAGE_INFO_FRAGMENT = `#graphql
  fragment PageInfo on PageInfo {
    hasPreviousPage
    hasNextPage
    endCursor
    startCursor
  }
`;
