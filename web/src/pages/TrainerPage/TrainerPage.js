import UserLayout from 'src/layouts/UserLayout'
import ClientList from 'src/components/ClientList'
import Workout from 'src/components/Workout'
import Progress from 'src/components/Progress'
import { useQuery } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { useState } from 'react'

const FIND_USER = gql`
  query FindUserQuery($emailAddress: String!) {
    userExists(emailAddress: $emailAddress) {
      id
      email
      userName
      type
    }
  }
`
const TrainerPage = () => {
  const { currentUser } = useAuth()
  console.log(currentUser.email)
  const [currentTrainerId, setCurrentTrainerId] = useState(54321)
  const [currentTrainerName, setCurrentTrainerName] = useState('')
  const [currentUserType, setCurrentUserType] = useState('')

  const [selectedClient, setSelectedClient] = useState(0)
  const [selectedUserRelationship, setSelectedUserRelationship] = useState(0)

  const { data } = useQuery(FIND_USER, {
    variables: { emailAddress: currentUser.email },
    onCompleted: (data) => {
      const user = data.userExists[0]
      console.log('user', user)
      setCurrentTrainerId(user.id)
      setCurrentTrainerName(user.userName)
      setCurrentUserType(user.type)
    },
  })

  // const [currentTrainerId] = useState(54321)
  // const [currentTrainerName] = useState('Liam Onbashian')
  // const currentUserType = 'Trainer'
  // const [selectedClient, setSelectedClient] = useState(0)
  // const [selectedUserRelationship, setSelectedUserRelationship] = useState(0)

  return (
    <UserLayout>
      <ClientList
        currentTrainerId={currentTrainerId}
        currentTrainerName={currentTrainerName}
        setSelectedClient={setSelectedClient}
        setSelectedUserRelationship={setSelectedUserRelationship}
      />
      <h2>Displaying info for client id: {selectedClient}</h2>
      <Workout
        currentTrainerId={currentTrainerId}
        currentUserType={currentUserType}
        userSelected={selectedClient}
        relationshipSelected={selectedUserRelationship}
      />
      <Progress userSelected={selectedClient} />
    </UserLayout>
  )
}

export default TrainerPage
