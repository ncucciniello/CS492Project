import { useMutation } from '@redwoodjs/web'

const DELETE_TRAINEE = gql`
  mutation deleteUserRelation($id: Int) {
    deleteUserRelation(id: $id) {
      id
    }
  }
`

const ClientListItem = (props) => {
  const [deleteRelationship] = useMutation(DELETE_TRAINEE)

  const onDelete = (selection) => {
    deleteRelationship({ variables: { id: selection } })
    props.refreshClients()
    console.log(selection)
  }

  return (
    <div className="clientListItem">
      <h2>{props.client.traineeName}</h2>
      <button
        onClick={() => {
          props.setSelectedClient(props.client.traineeId)
          props.setSelectedUserRelationship(props.client.id)
        }}
      >
        Select
      </button>
      <button onClick={() => onDelete(props.relationshipId)}>Remove</button>
    </div>
  )
}

export default ClientListItem
