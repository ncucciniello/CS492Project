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

  type Mutation {
    createWorkout(input: CreateWorkoutInput!): Workout
    updateWorkout(id: Int, input: UpdateWorkoutInput!): Workout
    logWorkout(id: Int, input: LogWorkoutInput!): Workout
  }
`
