import { gql } from '@apollo/client';

export default gql`
  query getDemoData {
    someData {
      someField
    }
  }
`;
