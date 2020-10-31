export const schema = gql`
  type User {
    id: Int!
    email: String!
    name: String
    type: String!
    trainer: Int
  }

  type Query {
    users: [User!]!
    clients(trainerId: Int!): [User!]!
    unassignedTrainees: [User!]!
    trainees: [User!]!
    trainers: [User!]!
  }

  input CreateUserInput {
    email: String!
    name: String
    type: String!
    trainer: Int
  }

  input UpdateUserInput {
    trainer: Int
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(id: Int, input: UpdateUserInput): User!
  }
`
