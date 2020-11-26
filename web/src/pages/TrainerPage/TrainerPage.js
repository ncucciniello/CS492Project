import UserLayout from 'src/layouts/UserLayout'
import ClientList from 'src/components/ClientList'
import Workout from 'src/components/Workout'
import Progress from 'src/components/Progress'
import { useState } from 'react'

const TrainerPage = () => {
  const [currentTrainerId] = useState(54321)
  const [currentTrainerName] = useState('Liam Onbashian')
  const currentUserType = 'Trainer'
  const [selectedClient, setSelectedClient] = useState(0)

  return (
    <UserLayout>
      <ClientList
        currentTrainerId={currentTrainerId}
        currentTrainerName={currentTrainerName}
        setSelectedClient={setSelectedClient}
      />
      <h2>Displaying info for client id: {selectedClient}</h2>
      <Workout
        currentUserType={currentUserType}
        userSelected={selectedClient}
      />
      {/* <Progress userSelected={selectedClient} /> */}
    </UserLayout>
  )
}

export default TrainerPage
