import { Link, routes, navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { useQuery, useMutation } from '@redwoodjs/web'
import { useState } from 'react'

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
  const [displayPopUp, seDisplayPopUp] = useState(false)

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
            seDisplayPopUp(false)
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
        seDisplayPopUp(true)
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
                seDisplayPopUp(false)
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
          <p>APP INFO GOES HERE</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Malesuada fames ac turpis egestas. Ut diam quam nulla porttitor
            massa id neque. Sit amet mattis vulputate enim nulla aliquet. Congue
            eu consequat ac felis donec et odio. Dictum at tempor commodo
            ullamcorper a lacus vestibulum sed. Dui nunc mattis enim ut tellus.
            Est ante in nibh mauris cursus. Massa enim nec dui nunc mattis enim.
            Quisque sagittis purus sit amet volutpat consequat mauris nunc. Nam
            at lectus urna duis. Posuere ac ut consequat semper viverra nam. Et
            molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Dolor
            morbi non arcu risus. Mattis pellentesque id nibh tortor id aliquet
            lectus proin.
          </p>
          <p>
            Interdum varius sit amet mattis. Aliquet enim tortor at auctor urna
            nunc id cursus. A iaculis at erat pellentesque adipiscing commodo
            elit at imperdiet. A arcu cursus vitae congue mauris rhoncus aenean.
            Commodo odio aenean sed adipiscing. Aliquet enim tortor at auctor
            urna nunc id. Dolor sed viverra ipsum nunc aliquet bibendum enim
            facilisis gravida. Mauris ultrices eros in cursus turpis massa
            tincidunt. In hendrerit gravida rutrum quisque non tellus. Sagittis
            eu volutpat odio facilisis. Duis ut diam quam nulla. Arcu cursus
            vitae congue mauris rhoncus aenean vel elit scelerisque. Diam quis
            enim lobortis scelerisque. Tellus elementum sagittis vitae et leo
            duis ut. Integer feugiat scelerisque varius morbi enim nunc.
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
