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

  input UpdateExerciseInput {
    workoutId: Int
    repsComplete: Int
    setsComplete: Int
    exerciseType: Int
  }

  type Mutation {
    createExercise(input: CreateExerciseInput!): Exercise
  }
`
