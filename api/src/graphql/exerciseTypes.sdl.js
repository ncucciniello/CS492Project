export const schema = gql`
  type ExerciseType {
    id: Int!
    exerciseName: String!
    exerciseDescription: String!
  }

  type Query {
    exerciseTypes: [ExerciseType!]!
  }

  input CreateExerciseTypeInput {
    exerciseName: String!
    exerciseDescription: String
  }

  input UpdateExerciseTypeInput {
    exerciseName: String
    exerciseDescription: String
  }

  type Mutation {
    createExerciseType(input: CreateExerciseTypeInput!): ExerciseType
  }
`
