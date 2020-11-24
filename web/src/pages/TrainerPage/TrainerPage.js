import UserLayout from 'src/layouts/UserLayout'
import ClientList from 'src/components/ClientList'
import Workout from 'src/components/Workout'
import Progress from 'src/components/Progress'
import { useState } from 'react'

const TrainerPage = () => {
  const currentUserId = 2
  const currentUserType = 'Trainer'
  const [selectedClient, setSelectedClient] = useState(0)

  return (
    <UserLayout>
      <ClientList
        currentUserId={currentUserId}
        setSelectedClient={setSelectedClient}
      />
      <h2>Displaying info for client id: {selectedClient}</h2>
      <Workout
        currentUserType={currentUserType}
        userSelected={selectedClient}
      />
      <Progress userSelected={selectedClient} />
    </UserLayout>
  )
}

export default TrainerPage
