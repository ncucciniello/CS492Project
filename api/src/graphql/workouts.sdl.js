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
  }

  input UpdateWorkoutInput {
    userId: Int
    date: DateTime
  }

  type Mutation {
    createWorkout(input: CreateWorkoutInput!): Workout
  }
`
