export const schema = gql`
  type Workout {
    id: Int!
    userId: Int!
    date: DateTime!
    User: User!
  }

  type Query {
    workouts: [Workout!]!
  }

  input CreateWorkoutInput {
    userId: Int!
    date: DateTime!
  }

  input UpdateWorkoutInput {
    userId: Int
    date: DateTime
  }

  type Mutation {
    createWorkout(input: CreateWorkoutInput!): Workout
  }
`
