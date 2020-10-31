import { useMutation } from '@redwoodjs/web'

const UPDATE_TRAINEE = gql`
  mutation UpdateUser($id: Int, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
    }
  }
`

const ClientListItem = ({ user }) => {
  const [updateUser] = useMutation(UPDATE_TRAINEE)

  const onSubmit = (selection) => {
    updateUser({
      variables: {
        id: parseInt(selection),
        input: { trainer: null },
      },
    })
  }

  return (
    <div className="clientListItem">
      <h2>{user.name}</h2>
      <button onClick={() => onSubmit(user.id)}>Remove</button>
    </div>
  )
}

export default ClientListItem
