import { db } from 'src/lib/db'

export const workouts = () => {
  return db.workout.findMany()
}

export const traineeWorkouts = ({ input }) => {
  return db.workout.findMany({
    where: {
      UserRelationship: {
        traineeId: input.traineeId,
      },
      date: {
        gte: new Date(new Date(input.date)).toISOString(),
        lt: new Date(+new Date(input.date) + 86400000).toISOString(),
      },
    },
  })
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
      UserRelationship: {
        connect: {
          id: input.userRelationshipId,
        },
      },
      date: input.date,
      exercises: {
        create: input.exercises.map((exercises) => ({
          weight: parseInt(exercises.weight),
          reps: parseInt(exercises.reps),
          numberOfSets: parseInt(exercises.numberOfSets),
          ExerciseType: {
            connect: {
              id: parseInt(exercises.ExerciseType.id),
            },
          },
        })),
      },
    },
  })
}

export const updateWorkout = ({ id, deletions, input }) => {
  return db.workout.update({
    where: { id },
    data: {
      exercises: {
        upsert: input.exercises.map((exercise) => ({
          where: { id: parseInt(exercise.id) || undefined || null },
          create: {
            weight: parseInt(exercise.weight),
            reps: parseInt(exercise.reps),
            numberOfSets: parseInt(exercise.numberOfSets),
            ExerciseType: {
              connect: {
                id: parseInt(exercise.ExerciseType.id),
              },
            },
          },
          update: {
            weight: parseInt(exercise.weight),
            reps: parseInt(exercise.reps),
            numberOfSets: parseInt(exercise.numberOfSets),
            ExerciseType: {
              connect: {
                id: parseInt(exercise.ExerciseType.id),
              },
            },
          },
        })),
        delete: deletions,
      },
    },
  })
}

export const logWorkout = ({ id, input }) => {
  return db.workout.update({
    where: { id },
    data: {
      exercises: {
        update: input.exercises.map((exercise) => ({
          data: {
            actualReps: parseInt(exercise.repsComplete),
            actualSets: parseInt(exercise.setsComplete),
          },
          where: { id: parseInt(exercise.id) },
        })),
      },
    },
  })
}

export const Workout = {
  exercises: (_obj, { root }) =>
    db.workout
      .findOne({ where: { id: root.id } })
      .exercises({ include: { ExerciseType: true } }),
}
