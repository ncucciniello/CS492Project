import { Form, SelectField, Submit, Label } from '@redwoodjs/forms'
import { Flash, useMutation, useQuery } from '@redwoodjs/web'
import { useForm } from 'react-hook-form'

const GET_TRAINEES = gql`
  query getTrainees {
    unassignedTrainees {
      id
      name
      email
      type
      trainer
    }
  }
`

const UPDATE_TRAINEE = gql`
  mutation UpdateUser($id: Int, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
    }
  }
`

const NewClient = (props) => {
  const { loading, data } = useQuery(GET_TRAINEES, {
    fetchPolicy: 'network-only',
  })

  const [updateUser] = useMutation(UPDATE_TRAINEE)

  const formMethods = useForm()

  const onSubmit = (selection) => {
    updateUser({
      variables: { id: parseInt(selection.traineeId), input: { trainer: 1 } },
    })
    props.setVisibility(false)
  }

  return (
    <div className="client-form">
      <Flash timeout={1000} />
      <Form onSubmit={onSubmit} formMethods={formMethods}>
        <Label name="name" errorClassName="error">
          Choose Trainee:
        </Label>

        <SelectField name="traineeId">
          {loading ? (
            <option>Loading ...</option>
          ) : (
            data.unassignedTrainees.map((trainee) => (
              <option key={trainee.id} value={trainee.id}>
                {trainee.name}
              </option>
            ))
          )}
        </SelectField>

        <Submit>Add Client</Submit>
      </Form>
    </div>
  )
}

export default NewClient
