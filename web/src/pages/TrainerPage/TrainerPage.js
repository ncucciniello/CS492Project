import UserLayout from 'src/layouts/UserLayout'
import ClientList from 'src/components/ClientList'

const TrainerPage = () => {
  return (
    <UserLayout>
      <ClientList />
      <div className="workoutGraphContatiner ">
        <div className="workoutGraphHeader">
          <button>Previous Day</button>
          <h3>Todays Date</h3>
          <button>Next Day</button>
        </div>
        <div className="workoutGraph">Workout Graph Goes here</div>
        <div className="workoutGraphSidebar">
          <button>Add Workout</button>
          <button>Edit Workout</button>
        </div>
      </div>
      <div className="exerciseProgressContatiner ">
        <div className="exerciseProgress">
          Exercise Progress Graph Goes here
        </div>
      </div>
    </UserLayout>
  )
}

export default TrainerPage
