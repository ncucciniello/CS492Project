import { Link, routes, navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { useQuery, useMutation } from '@redwoodjs/web'
import { useState } from 'react'
import 'src/index.css'

export const FIND_USER = gql`
  query FindUserQuery($emailAddress: String!) {
    userExists(emailAddress: $emailAddress) {
      id
      email
      type
    }
  }
`

const CREATE_USER = gql`
  mutation createAppUser($input: CreateUserInput!) {
    createUser(input: $input) {
      email
      userName
      type
    }
  }
`

const HomePage = () => {
  const [displayPopUp, setDisplayPopUp] = useState(false)

  const [userTypeSelected, setUserTypeSelected] = useState('')

  const { logIn, logOut, hasRole, isAuthenticated, currentUser } = useAuth()
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: () => {
      userTypeSelected == 'Trainer'
        ? navigate(routes.trainer())
        : navigate(routes.trainee())
    },
  })

  const popUp = () => {
    return (
      <div>
        <p>Please Select a role: </p>
        <button onClick={() => setUserTypeSelected('Trainer')}>Trainer</button>
        <button onClick={() => setUserTypeSelected('Trainee')}>Trainee</button>
        <button
          onClick={() => {
            console.log(userTypeSelected)
            setDisplayPopUp(false)
            // Set the role in Netlify Identity
            createUser({
              variables: {
                input: {
                  email: currentUser.email,
                  userName: currentUser.user_metadata.full_name,
                  type: userTypeSelected,
                },
              },
            })
          }}
        >
          Submit
        </button>
      </div>
    )
  }

  const redirectUser = () => {
    const currentUserType = data.userExists[0].type
    console.log('sending from redirectUser()', data.userExists[0].type)

    currentUserType == 'Trainer'
      ? navigate(routes.trainer())
      : navigate(routes.trainee())
  }

  const { data } = useQuery(FIND_USER, {
    variables: { emailAddress: currentUser?.email },
    skip: !isAuthenticated,
    onCompleted: (data) => {
      if (data.userExists.length < 1) {
        console.log('users is not in db yet')
        setDisplayPopUp(true)
      } else {
        console.log(data.userExists[0])
        redirectUser()
      }
    },
  })

  return (
    <>
      <header className="home-header">
        <div className="logo">Logo goes here</div>
        <h1>
          <Link to={routes.home()}>TrainerTracker</Link>
        </h1>
      </header>
      <main>
        {isAuthenticated ? (
          <ul>
            {hasRole('Trainer') && (
              <li>
                <Link to={routes.trainer()}>Trainer Page</Link>
              </li>
            )}
            {hasRole('Trainee') && (
              <li>
                <Link to={routes.trainee()}>Trainee Page</Link>
              </li>
            )}
          </ul>
        ) : (
          ''
        )}
        <div className="banner">
          <h1>Welcome to</h1>
          <h1>TrainerTracker</h1>
          {isAuthenticated ? (
            <button
              onClick={() => {
                logOut()
                setDisplayPopUp(false)
              }}
            >
              Log out
            </button>
          ) : (
            <button onClick={logIn}>Sign up / Log in</button>
          )}
          {displayPopUp && popUp()}
        </div>
        <div className="info">
          <p>
            <center>Welcome to TrainerTracker!</center>
          </p>
          <p>
            Have you ever wondered if there was a better way to communicate with
            your trainers, get workout plans, or even track progress in a better
            fashion? Trainer Tracker is the answer! TrainerTracker is an
            application that connects trainees and trainers through a powerful
            user interface that does many things:
          </p>
          <p>
            1. Trainers can assign trainees a workout plan including the
            weights, repetitions, and sets.
          </p>
          <br />
          <p>
            2. Trainees can view the workouts assigned and log the workouts that
            they crush!
          </p>
          <br />
          <p>
            3. Trainers and Trainees can view progress that the trainee is
            making through powerful graphs to gain powerful intel.
          </p>
          <br />
          <p>
            4. Based on these graphs the trainers and trainees have a better
            understanding of whether or not their trainee is successful or not
            enabling them to lower the weight or push their trainee to the next
            level!
          </p>
        </div>
      </main>
      <footer>
        <div>Footer info goes here</div>
      </footer>
    </>
  )
}

export default HomePage
