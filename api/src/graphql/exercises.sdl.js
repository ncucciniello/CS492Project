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
    workout: Workout
    exerciseType: ExerciseType!
  }

  input SearchProgressInput {
    userId: Int!
    exerciseTypeId: Int!
  }

  type Query {
    exercises: [Exercise!]!
    exerciseProgress(input: SearchProgressInput!): [Exercise!]!
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
    id: String
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

  input LogExerciseInput {
    id: String!
    repsComplete: String
    setsComplete: String
  }

  type Mutation {
    createExercise(input: CreateExerciseInput!): Exercise
  }
`
