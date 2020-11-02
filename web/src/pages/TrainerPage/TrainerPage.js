import NewClient from 'src/components/NewClient/NewClient'
import UserLayout from 'src/layouts/UserLayout'
import ClientList from 'src/components/ClientList'
import { useState } from 'react'
import { useQuery } from '@redwoodjs/web'

export const GET_CLIENTS = gql`
  query ClientListQuery($trainerId: Int!) {
    clients(trainerId: $trainerId) {
      id
      name
      email
    }
  }
`

const TrainerPage = () => {
  const [isVisible, setVisibility] = useState(false)

  const openTraineeList = () => {
    setVisibility(true)
  }

  const { refetch, loading, data } = useQuery(GET_CLIENTS, {
    variables: { trainerId: 1 },
  })

  return (
    <UserLayout>
      <div className="clientListHeader">
        <h3>Client List</h3>
        <button onClick={openTraineeList}>Add Client +</button>
        {isVisible && (
          <NewClient setVisibility={setVisibility} refreshClients={refetch} />
        )}
        {loading ? (
          <div>Loading ...</div>
        ) : (
          <ClientList clients={data.clients} refreshClients={refetch} />
        )}
      </div>
      <div className="workoutGraphContatiner ">
        <div className="workoutGraphHeader">
          <button>Previous Day</button>
          <h3>Todays Date</h3>
          <button>Next Day</button>
        </div>
        <div className="workoutGraph">Workout Graph Goes here</div>
        <div className="workoutGraphSidebar">
          <button>Add Workout</button>
          <button>Edit Workout</button>
        </div>
      </div>
      <div className="exerciseProgressContatiner ">
        <div className="exerciseProgress">
          Exercise Progress Graph Goes here
        </div>
      </div>
    </UserLayout>
  )
}

export default TrainerPage
