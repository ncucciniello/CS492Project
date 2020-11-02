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
// export const beforeQuery = (props) => {
//   return { variables: props, fetchPolicy: 'cache-and-network' }
// }

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ clients }) => {
  return (
    <div className="clientList">
      {clients.map((user) => (
        <ClientListItem key={user.id} user={user} />
      ))}
      {/* <button onClick={() => refetch()}>ReRender</button> */}
    </div>
  )
}
