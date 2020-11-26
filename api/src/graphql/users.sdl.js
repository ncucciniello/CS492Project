export const schema = gql`
  type AppUser {
    id: Int!
    email: String!
    userName: String
    type: String!
    trainerRelationship: [UserRelationship]
    traineeRelationship: [UserRelationship]
  }

  type Query {
    users: [AppUser!]!
    trainees: [AppUser]
    unassignedTrainees: [AppUser]
  }

  input CreateUserInput {
    email: String!
    userName: String
    type: String!
  }

  input UpdateUserInput {
    trainer: Int
  }

  type Mutation {
    createUser(input: CreateUserInput!): AppUser
    updateUser(id: Int, input: UpdateUserInput): AppUser!
  }
`
