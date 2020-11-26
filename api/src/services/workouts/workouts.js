import { db } from 'src/lib/db'

export const workouts = () => {
  return db.workout.findMany()
}

export const userWorkouts = ({ input }) => {
  return db.workout.findMany({
    where: {
      UserRelationship: {
        traineeId: input.traineeId,
        trainerId: input.trainerId,
      },
      date: {
        gte: new Date(new Date(input.date)).toISOString(),
        lt: new Date(+new Date(input.date) + 86400000).toISOString(),
      },
    },
  })
}

export const createWorkout = ({ input }) => {
  return db.workout.create({
    data: {
      userRelationship: {
        connect: {
          userRelationship: input.userRelationshipId,
        },
      },
      date: input.date,
      exercises: {
        create: input.exercises.map((exercise) => ({
          weight: parseInt(exercise.weight),
          reps: parseInt(exercise.reps),
          numberOfSets: parseInt(exercise.numberOfSets),
          exerciseType: {
            connect: {
              id: parseInt(exercise.exerciseType.id),
            },
          },
        })),
      },
    },
  })
}

export const updateWorkout = ({ id, input }) => {
  return db.workout.update({
    where: { id },
    data: {
      exercises: {
        update: input.exercises.map((exercise) => ({
          where: {
            id: parseInt(exercise.id),
          },
          data: {
            weight: parseInt(exercise.weight),
            repsAssigned: parseInt(exercise.repsAssigned),
            setsAssigned: parseInt(exercise.setsAssigned),
            exerciseType: {
              connect: {
                id: parseInt(exercise.exerciseType.id),
              },
            },
          },
        })),
      },
    },
  })
}

export const Workout = {
  exercises: (_obj, { root }) =>
    db.workout
      .findOne({ where: { id: root.id } })
      .Exercise({ include: { ExerciseType: true } }),
}
