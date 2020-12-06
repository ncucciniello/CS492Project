import { db } from 'src/lib/db'

export const exercises = () => {
  return db.exercise.findMany({
    include: {
      ExerciseType: true,
    },
  })
}

export const exerciseProgress = ({ input }) => {
  return db.exercise.findMany({
    where: {
      exerciseType: {
        id: input.exerciseTypeId,
      },
      workout: {
        userId: input.traineeId,
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
      reps: input.reps,
      numberOfSets: input.numberOfSets,
      exerciseType: {
        connect: {
          id: input.exerciseTypeId,
        },
      },
    },
  })
}

export const Exercise = {
  workout: (_obj, { root }) =>
    db.exercise.findOne({ where: { id: root.id } }).workout(),
  // exerciseType: (_obj, { root }) =>
  //   db.exercise.findOne({ where: { id: root.id } }).exerciseType(),
}
