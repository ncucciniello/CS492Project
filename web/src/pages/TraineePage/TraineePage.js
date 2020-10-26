import UserLayout from 'src/layouts/UserLayout'

const TraineePage = () => {
  return (
    <UserLayout>
      <div className="workoutGraphContatiner ">
        <div className="workoutGraphHeader">
          <button>Previous Day</button>
          <h3>Todays Date</h3>
          <button>Next Day</button>
        </div>
        <div className="workoutGraph">Workout Graph Goes here</div>
        <div className="workoutGraphSidebar">
          <button>Log Workout</button>
          <button>Edit Log</button>
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

export default TraineePage
