import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

const UserLayout = ({ children }) => {
  const { logOut, isAuthenticated, currentUser } = useAuth()

  return (
    <>
      <header className="home-header">
        <div className="logo">Logo goes here</div>
        <h1>
          <Link to={routes.home()}>TrainerTracker</Link>
        </h1>
        <div className="user-info">
          <div className="info-block">
            {isAuthenticated && (
              <>
                <p className="username">
                  Welcome, {currentUser.user_metadata.full_name}
                </p>
                <p className="username">Current Role: {currentUser.roles[0]}</p>
              </>
            )}
            <button onClick={logOut}>Log Out</button>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <div>Footer info goes here</div>
      </footer>
    </>
  )
}

export default UserLayout
