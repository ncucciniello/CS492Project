import { Link, routes } from '@redwoodjs/router'

const TrainerPage = () => {
  return (
    <>
      <h1>TrainerPage</h1>
      <p>
        Find me in <tt>./web/src/pages/TrainerPage/TrainerPage.js</tt>
      </p>
      <p>
        My default route is named <tt>trainer</tt>, link to me with `
        <Link to={routes.trainer()}>Trainer</Link>`
      </p>
    </>
  )
}

export default TrainerPage
