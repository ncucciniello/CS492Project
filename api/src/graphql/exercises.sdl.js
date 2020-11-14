export const schema = gql`
  type Exercise {
    id: Int!
    workoutId: Int!
    weight: Int!
    repsAssigned: Int!
    repsComplete: Int
    setsAssigned: Int!
    setsComplete: Int
    exerciseTypeId: Int!
    workout: Workout!
    exerciseType: ExerciseType!
  }

  type Query {
    exercises: [Exercise!]!
  }

  input CreateExerciseInput {
    workoutId: Int!
    weight: Int!
    repsAssigned: Int!
    setsAssigned: Int!
    exerciseType: Int!
  }

  input CreateExerciseTypeIdInput {
    id: String!
  }

  input CreateNewExerciseInput {
    weight: String!
    repsAssigned: String!
    setsAssigned: String!
    exerciseType: CreateExerciseTypeIdInput!
  }

  input UpdateExerciseTypeInput {
    id: String!
  }

  input UpdateAssignedExerciseInput {
    id: String!
    weight: String
    repsAssigned: String
    setsAssigned: String
    exerciseType: UpdateExerciseTypeInput
  }

  type Mutation {
    createExercise(input: CreateExerciseInput!): Exercise
  }
`