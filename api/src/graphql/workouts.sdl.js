export const schema = gql`
  type Workout {
    id: Int!
    userId: Int!
    date: DateTime
    user: User!
    exercises: [Exercise]
  }

  input SearchWorkoutInput {
    userId: Int!
    date: String!
  }

  type Query {
    workouts: [Workout!]!
    userWorkouts(input: SearchWorkoutInput!): [Workout!]!
  }

  input CreateWorkoutInput {
    userId: Int!
    date: DateTime
    exercises: [CreateNewExerciseInput]
  }

  input UpdateWorkoutInput {
    exercises: [UpdateAssignedExerciseInput]
  }

  input LogWorkoutInput {
    exercises: [LogExerciseInput]
  }

  input DeleteExerciseInput {
    id: Int!
  }

  type Mutation {
    createWorkout(input: CreateWorkoutInput!): Workout
    updateWorkout(
      id: Int
      deletions: [DeleteExerciseInput]
      input: UpdateWorkoutInput!
    ): Workout
    logWorkout(id: Int, input: LogWorkoutInput!): Workout
  }
`
