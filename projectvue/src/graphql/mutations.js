import gql from 'graphql-tag';

// Registration Mutation
export const REGISTER_USER_MUTATION = gql`
  mutation registerUser($input: UserRegistrationInputObject!) {
    registerUser(input: $input) {
      success
      message
      user {
        id
        email
        username
      }
    }
  }
`;
