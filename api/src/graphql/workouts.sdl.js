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
    traineeWorkouts(input: SearchWorkoutInput2!): [Workout!]!
  }
  input SearchWorkoutInput2 {
    traineeId: Int!
    date: String!
  }
  input CreateWorkoutInput {
    userRelationshipId: Int!
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
