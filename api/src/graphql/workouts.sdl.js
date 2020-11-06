export const schema = gql`
  type Workout {
    id: Int!
    userId: Int!
    date: DateTime
    user: User!
    exercises: [Exercise]
  }

  type Query {
    workouts: [Workout!]!
    userWorkouts(userNum: Int!): [Workout!]!
  }

  input CreateWorkoutInput {
    userId: Int!
    date: DateTime
  }

  input UpdateWorkoutInput {
    userId: Int
    date: DateTime
  }

  type Mutation {
    createWorkout(input: CreateWorkoutInput!): Workout
  }
`
