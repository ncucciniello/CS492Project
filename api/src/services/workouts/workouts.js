import { db } from 'src/lib/db'

export const workouts = () => {
  return db.workout.findMany()
}

export const createWorkout = ({ input }) => {
  return db.workout.create({ data: input })
}
