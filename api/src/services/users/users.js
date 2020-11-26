import { db } from 'src/lib/db'

export const users = () => {
  return db.appUser.findMany({
    include: {
      traineeRelationship: true,
      trainerRelationship: true,
    },
  })
}

export const trainees = () => {
  return db.appUser.findMany({
    where: {
      type: 'Trainee',
      traineeRelationship: undefined,
    },
    include: {
      traineeRelationship: true,
    },
  })
}

export const unassignedTrainees = () => {
  return db.appUser.findMany({
    where: {
      type: 'Trainee',
    },
    include: {
      traineeRelationship: true,
    },
  })
}

export const createUser = ({ input }) => {
  return db.appUser.create({ data: input })
}

export const updateUser = ({ id, input }) => {
  return db.appUser.update({
    data: input,
    where: { id },
  })
}

// export const AppUser = {
//   UserRelationships: (_obj, { root }) =>
//     db.appUser.findOne({ where: { id: root.id } }).UserRelationships(),
// }
