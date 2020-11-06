import { db } from 'src/lib/db'

export const exerciseTypes = () => {
  return db.exerciseType.findMany()
}

export const createExerciseType = ({ input }) => {
  return db.exerciseType.create({ data: input })
}

export const ExerciseType = {
  exercise: (_obj, { root }) =>
    db.exerciseType.findOne({ where: { id: root.id } }).exercise(),
}
