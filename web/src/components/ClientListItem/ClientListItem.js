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
  }

  const selectClient = () => {
    if (props.selectedClient != props.client.traineeId) {
      props.setSelectedClient(props.client.traineeId)
      props.setSelectedUserRelationship(props.client.id)
    }
  }

  return (
    <div
      className={`clientListItem ${
        props.selectedClient == props.client.traineeId ? 'selected' : ''
      }`}
    >
      <h2>{props.client.traineeName}</h2>
      <button onClick={() => onDelete(props.relationshipId)}>Remove</button>
      <button
        onClick={() => selectClient()}
        disabled={props.selectedClient == props.client.traineeId}
      >
        Select
      </button>
    </div>
  )
}

export default ClientListItem
