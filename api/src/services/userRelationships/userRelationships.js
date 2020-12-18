import { db } from 'src/lib/db'

export const userRelationships = () => {
  return db.userRelationship.findMany()
}

export const clients = ({ trainerId }) => {
  return db.userRelationship.findMany({
    where: {
      trainerId: {
        equals: trainerId,
      },
    },
  })
}

export const createUserRelation = ({ input }) => {
  return db.userRelationship.create({
    data: {
      trainerUser: {
        connect: {
          id: parseInt(input.trainerId),
        },
      },
      traineeUser: {
        connect: {
          id: parseInt(input.traineeId),
        },
      },
      trainerName: input.trainerName,
      traineeName: input.traineeName,
    },
  })
}

export const deleteUserRelation = ({ id }) => {
  return db.userRelationship.delete({
    where: { id: id },
  })
}

export const UserRelationship = {
  AppUser: (_obj, { root }) =>
    db.userRelationship.findMany({ where: { id: root.id } }).AppUser(),
  Workout: (_obj, { root }) =>
    db.userRelationship.findMany({ where: { id: root.id } }).Workout(),
}
