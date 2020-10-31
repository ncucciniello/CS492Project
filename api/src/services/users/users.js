import { db } from 'src/lib/db'

export const users = () => {
  return db.user.findMany()
}

export const clients = ({ trainerId }) => {
  return db.user.findMany({
    where: {
      type: 'Trainee',
      trainer: trainerId,
    },
  })
}

export const unassignedTrainees = () => {
  return db.user.findMany({
    where: {
      type: 'Trainee',
      trainer: null,
    },
  })
}

export const trainees = () => {
  return db.user.findMany({
    where: {
      type: 'Trainee',
    },
  })
}

export const trainers = () => {
  return db.user.findMany({
    where: {
      type: 'Trainer',
    },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({ data: input })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}
