import ClientListItem from 'src/components/ClientListItem'
import NewClient from 'src/components/NewClient/NewClient'
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

const ClientList = (props) => {
  const [isVisible, setVisibility] = useState(false)

  const openTraineeList = () => {
    setVisibility(true)
  }

  const { refetch, loading, empty, data } = useQuery(GET_CLIENTS, {
    variables: { trainerId: props.currentUserId },
    onCompleted: (data) => {
      props.setSelectedClient(data.clients[0].id)
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
          key={client.id}
          user={client}
          refreshClients={refetch}
          setSelectedClient={props.setSelectedClient}
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
          currentClient={data}
          setVisibility={setVisibility}
          refreshClients={refetch}
        />
      )}
      <div className="clientList">{displayList()}</div>
    </div>
  )
}

export default ClientList
