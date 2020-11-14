import { useMutation } from '@redwoodjs/web'

const UPDATE_TRAINEE = gql`
  mutation UpdateUser($id: Int, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
    }
  }
`

const ClientListItem = (props) => {
  const [updateUser] = useMutation(UPDATE_TRAINEE)

  const onSubmit = (selection) => {
    updateUser({
      variables: {
        id: parseInt(selection),
        input: { trainer: null },
      },
    })
    props.refreshClients()
  }

  return (
    <div className="clientListItem">
      <h2>{props.user.name}</h2>
      <button onClick={() => props.setSelectedClient(props.user.id)}>
        Select
      </button>
      <button onClick={() => onSubmit(props.user.id)}>Remove</button>
    </div>
  )
}

export default ClientListItem
