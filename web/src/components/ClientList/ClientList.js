import ClientListItem from 'src/components/ClientListItem'
import NewClient from 'src/components/NewClient/NewClient'
import { useState } from 'react'
import { /*useEffect,*/ useQuery } from '@redwoodjs/web'

export const GET_CLIENTS = gql`
  query ClientListQuery($trainerId: Int!) {
    clients(trainerId: $trainerId) {
      id
      traineeName
      traineeId
    }
  }
`

const ClientList = (props) => {
  const [isVisible, setVisibility] = useState(false)

  const openTraineeList = () => {
    setVisibility(true)
  }

  const { refetch, loading, empty, data } = useQuery(GET_CLIENTS, {
    variables: { trainerId: props.currentTrainerId },
    onCompleted: (data) => {
      props.setSelectedClient(data.clients[0].traineeId)
      props.setSelectedUserRelationship(data.clients[0].id)
    },
  })

  const hasData = data?.clients?.length || false

  const displayList = () => {
    if (empty) {
      return <div>Empty data...</div>
    }

    if (loading) {
      return <div>Loading...</div>
    }

    if (hasData) {
      return data.clients.map((client) => (
        <ClientListItem
          key={client.traineeId}
          client={client}
          refreshClients={refetch}
          setSelectedClient={props.setSelectedClient}
          setSelectedUserRelationship={props.setSelectedUserRelationship}
          relationshipId={client.id}
        />
      ))
    }

    return (
      <div>
        <h3>No clients assigned</h3>
        <h4>Please click add client to assign a client</h4>
      </div>
    )
  }

  return (
    <div className="clientListHeader">
      <h3>Client List</h3>
      <button onClick={openTraineeList}>Add Client +</button>
      {isVisible && (
        <NewClient
          currentClients={data?.clients}
          setVisibility={setVisibility}
          refreshClients={refetch}
          currentClientslist={data}
          currentTrainerId={props.currentTrainerId}
          currentTrainerName={props.currentTrainerName}
        />
      )}
      <div className="clientList">{displayList()}</div>
    </div>
  )
}

export default ClientList
