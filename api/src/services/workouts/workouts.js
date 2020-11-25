import { db } from 'src/lib/db'

export const workouts = () => {
  return db.workout.findMany()
}

export const userWorkouts = ({ input }) => {
  return db.workout.findMany({
    where: {
      userId: input.userId,
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
      user: {
        connect: {
          id: input.userId,
        },
      },
      date: input.date,
      exercises: {
        create: input.exercises.map((exercise) => ({
          weight: parseInt(exercise.weight),
          repsAssigned: parseInt(exercise.repsAssigned),
          setsAssigned: parseInt(exercise.setsAssigned),
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

export const updateWorkout = ({ id, deletions, input }) => {
  return db.workout.update({
    where: { id },
    data: {
      exercises: {
        upsert: input.exercises.map((exercise) => ({
          where: { id: parseInt(exercise.id) || undefined || null },
          create: {
            weight: parseInt(exercise.weight),
            repsAssigned: parseInt(exercise.repsAssigned),
            setsAssigned: parseInt(exercise.setsAssigned),
            exerciseType: {
              connect: {
                id: parseInt(exercise.exerciseType.id),
              },
            },
          },
          update: {
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
            repsComplete: parseInt(exercise.repsComplete),
            setsComplete: parseInt(exercise.setsComplete),
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
      .exercises({ include: { exerciseType: true } }),
}
