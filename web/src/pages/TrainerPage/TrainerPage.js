import UserLayout from 'src/layouts/UserLayout'
import ClientList from 'src/components/ClientList'
import Workout from 'src/components/Workout'
import { useState } from 'react'

const TrainerPage = () => {
  const [selectedClient, setSelectedClient] = useState(0)

  return (
    <UserLayout>
      <ClientList setSelectedClient={setSelectedClient} />
      <h2>Displaying workout for client id: {selectedClient}</h2>
      <Workout userSelected={selectedClient} />
      {/* <div className="exerciseProgressContatiner ">
        <div className="exerciseProgress">
          Exercise Progress Graph Goes here
        </div>
      </div> */}
    </UserLayout>
  )
}

export default TrainerPage
