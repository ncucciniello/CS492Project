export const schema = gql`
  type Workout {
    id: Int!
    relationshipId: Int!
    date: DateTime
    userRelationship: UserRelationship!
    exercises: [Exercise]
  }

  input SearchWorkoutInput {
    traineeId: Int!
    trainerId: Int!
    date: String!
  }

  type Query {
    workouts: [Workout!]!
    userWorkouts(input: SearchWorkoutInput!): [Workout!]!
  }

  input CreateWorkoutInput {
    userRelationshipId: Int!
    date: DateTime
    exercises: [CreateNewExerciseInput]
  }

  input UpdateWorkoutInput {
    exercises: [UpdateAssignedExerciseInput]
  }

  type Mutation {
    createWorkout(input: CreateWorkoutInput!): Workout
    updateWorkout(id: Int, input: UpdateWorkoutInput!): Workout
  }
`
