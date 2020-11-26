export const schema = gql`
  type Exercise {
    id: Int!
    workoutId: Int!
    reps: Int!
    actualReps: Int
    numberOfSets: Int!
    actualSets: Int
    weight: Int!
    trainerComments: String!
    exerciseTypeId: Int!
    workout: Workout!
    ExerciseType: ExerciseType!
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
    reps: Int!
    sets: Int!
    exerciseTypeId: Int!
  }

  input CreateExerciseTypeIdInput {
    id: Int!
  }

  input CreateNewExerciseInput {
    weight: Int!
    reps: Int!
    sets: Int!
    exerciseType: CreateExerciseTypeIdInput!
  }

  input UpdateExerciseTypeInput {
    id: Int!
  }

  input UpdateAssignedExerciseInput {
    id: Int!
    weight: Int
    repsAssigned: Int
    setsAssigned: Int
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
