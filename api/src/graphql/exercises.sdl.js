export const schema = gql`
  type Exercise {
    id: Int!
    workoutId: Int!
    reps: Int!
    actualReps: Int
    numberOfSets: Int!
    actualSets: Int
    weight: Int
    trainerComments: String!
    exerciseTypeId: Int!
    workout: Workout!
    ExerciseType: ExerciseType
  }

  input SearchProgressInput {
    traineeId: Int!
    exerciseTypeId: Int!
  }

  type Query {
    exercises: [Exercise!]!
    exerciseProgress(input: SearchProgressInput!): [Exercise!]!
  }

  input CreateExerciseInput {
    workoutId: String!
    weight: String!
    reps: String!
    numberOfSets: String!
    exerciseTypeId: String!
  }

  input CreateExerciseTypeIdInput {
    id: String!
  }

  input CreateNewExerciseInput {
    id: String!
    weight: String!
    reps: String!
    numberOfSets: String!
    ExerciseType: CreateExerciseTypeIdInput!
  }

  input UpdateExerciseTypeInput {
    id: String!
  }

  input UpdateAssignedExerciseInput {
    id: String!
    weight: String
    reps: String
    numberOfSets: String
    ExerciseType: UpdateExerciseTypeInput
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
