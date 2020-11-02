import { useQuery } from '@redwoodjs/web'
import ClientListItem from 'src/components/ClientListItem'

export const QUERY = gql`
  query ClientListQuery($trainerId: Int!) {
    clients(trainerId: $trainerId) {
      id
      name
      email
    }
  }
`

const ClientList = (props) => {
  const { refetch, loading, data } = useQuery(QUERY, {
    variables: { trainerId: props.trainerId },
  })

  return (
    <div className="clientList">
      {loading ? (
        <div>Loading ...</div>
      ) : (
        data.clients.map((user) => (
          <ClientListItem key={user.id} user={user} refetch={refetch} />
        ))
      )}
      <button onClick={() => refetch()}>ReRender</button>
    </div>
  )
}

export default ClientList
