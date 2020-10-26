import ClientListItem from 'src/components/ClientListItem'

// export const QUERY = gql`
//   query ClientListQuery {
//     clientList {
//       id
//     }
//   }
// `

// let mockUsersList = [
//   { id: '1', name: 'user1'},
//   { id: '2', name: 'user2'},
//   { id: '3', name: 'user3'},
//   { id: '4', name: 'user4'}
// ]

export const QUERY = gql`
  query ClientListQuery {
    user {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

// export const Success = ({ clientList }) => {
//   return JSON.stringify(clientList)
// }

export const Success = ({ user }) => {
  return <ClientListItem user={user} />
}
