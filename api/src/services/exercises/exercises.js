import { db } from 'src/lib/db'

export const exercises = () => {
  return db.exercise.findMany({
    include: {
      exerciseType: true,
    },
  })
}

export const Exercise = {
  Workout: (_obj, { root }) =>
    db.exercise.findOne({ where: { id: root.id } }).Workout(),
  ExerciseType: (_obj, { root }) =>
    db.exercise.findOne({ where: { id: root.id } }).ExerciseType(),
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
