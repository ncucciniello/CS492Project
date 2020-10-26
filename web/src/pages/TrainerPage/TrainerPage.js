import UserLayout from 'src/layouts/UserLayout'
import ClientListCell from 'src/components/ClientListCell'

const TrainerPage = () => {
  return (
    <UserLayout>
      <h1>TrainerPage</h1>
      <p>
        Find me in <tt>./web/src/pages/TrainerPage/TrainerPage.js</tt>
      </p>
      <ClientListCell />
    </UserLayout>
  )
}

export default TrainerPage
