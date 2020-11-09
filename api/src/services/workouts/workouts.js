import { db } from 'src/lib/db'

export const workouts = () => {
  return db.workout.findMany()
}

export const userWorkouts = ({ input }) => {
  return db.workout.findMany({
    where: {
      userId: input.userId,
      date: {
        gt: new Date(new Date(input.date)).toISOString(),
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
    },
  })
}

export const Workout = {
  exercises: (_obj, { root }) =>
    db.workout
      .findOne({ where: { id: root.id } })
      .exercises({ include: { exerciseType: true } }),
}
