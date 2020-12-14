export const schema = gql`
  type UserRelationship {
    trainerName: String
    traineeName: String
    id: Int!
    traineeId: Int
    trainerId: Int
    trainerUser: AppUser
    traineeUser: AppUser
    Workout: [Workout]!
  }

  type Query {
    userRelationships: [UserRelationship!]!
    clients(trainerId: Int!): [UserRelationship!]!
  }

  input CreateUserRelationshipInput {
    trainerName: String
    traineeName: String
    trainerId: String
    traineeId: String
  }

  input UpdateUserRelationshipInput {
    traineeId: String
    trainerName: String
    traineeName: String
    trainerId: String
  }

  type Mutation {
    createUserRelation(input: CreateUserRelationshipInput!): UserRelationship
    deleteUserRelation(id: Int): UserRelationship!
  }
`
