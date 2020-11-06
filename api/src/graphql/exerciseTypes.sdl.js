export const schema = gql`
  type ExerciseType {
    id: Int!
    name: String!
    description: String
  }

  type Query {
    exerciseTypes: [ExerciseType!]!
  }

  input CreateExerciseTypeInput {
    name: String!
    description: String
  }

  input UpdateExerciseTypeInput {
    name: String
    description: String
  }

  type Mutation {
    createExerciseType(input: CreateExerciseTypeInput!): ExerciseType
  }
`
