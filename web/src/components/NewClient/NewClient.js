import { Form, HiddenField, SelectField, Submit, Label } from '@redwoodjs/forms'
import { Flash, useMutation, useQuery } from '@redwoodjs/web'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

const GET_TRAINEES = gql`
  query unassignedTrainees {
    trainees {
      id
      userName
    }
  }
`

const CREATE_USER_REALATION = gql`
  mutation createUserRelation($input: CreateUserRelationshipInput!) {
    createUserRelation(input: $input) {
      trainerName
      trainerId
      traineeId
      traineeName
    }
  }
`

const NewClient = (props) => {
  const { loading, data } = useQuery(GET_TRAINEES, {
    fetchPolicy: 'network-only',
  })
  // console.log(data)
  const [createUserRealtion] = useMutation(CREATE_USER_REALATION)
  const [selectedTraineeName, setSelectedTraineeName] = useState('')

  const formMethods = useForm()

  const handleChange = () => {
    const e = document.getElementById('traineeSelecter')
    setSelectedTraineeName(e.options[e.selectedIndex].text)
  }

  const onSubmit = (selection) => {
    createUserRealtion({
      variables: { input: selection },
    })
    console.log(selection)
    props.setVisibility(false)
    props.refreshClients()
  }

  const hasData = data?.trainees?.length || false

  const displayTraineeOptions = () => {
    if (loading) {
      return <option>Lodaing...</option>
    }

    if (hasData) {
      return data.trainees.map((trainee) => (
        <option key={trainee.id} value={trainee.id}>
          {trainee.userName}
        </option>
      ))
    }

    return <option>There are no unassigned trainees</option>
  }

  return (
    <div className="client-form">
      <Flash timeout={1000} />
      <Form
        onSubmit={onSubmit}
        onChange={handleChange}
        formMethods={formMethods}
      >
        <HiddenField name="traineeName" defaultValue={selectedTraineeName} />
        <HiddenField
          name="trainerName"
          defaultValue={props.currentTrainerName}
        />
        <HiddenField name="trainerId" defaultValue={props.currentTrainerId} />

        <Label name="name" errorClassName="error">
          Choose Trainee:
        </Label>

        <SelectField name="traineeId" id="traineeSelecter">
          {displayTraineeOptions()}
        </SelectField>

        <Submit>Add Client</Submit>
      </Form>
    </div>
  )
}

export default NewClient
