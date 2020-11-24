import { db } from 'src/lib/db'

export const exercises = () => {
  return db.exercise.findMany()
}

export const exerciseProgress = ({ input }) => {
  return db.exercise.findMany({
    where: {
      exerciseType: {
        id: input.exerciseTypeId,
      },
      workout: {
        userId: input.userId,
      },
    },
  })
}

export const createExercise = ({ input }) => {
  return db.exercise.create({
    data: {
      workout: {
        connect: {
          id: input.workoutId,
        },
      },
      weight: input.weight,
      repsAssigned: input.repsAssigned,
      setsAssigned: input.setsAssigned,
      exerciseType: {
        connect: {
          id: input.exerciseType,
        },
      },
    },
  })
}

export const Exercise = {
  workout: (_obj, { root }) =>
    db.exercise.findOne({ where: { id: root.id } }).workout(),
  exerciseType: (_obj, { root }) =>
    db.exercise.findOne({ where: { id: root.id } }).exerciseType(),
}
