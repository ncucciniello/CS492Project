import UserLayout from 'src/layouts/UserLayout'
// import ClientListCell from 'src/components/ClientListCell'

const TrainerPage = () => {
  return (
    <UserLayout>
      <div className="clientListHeader">
        <h3>Client List</h3>
        <button>Add Client +</button>
      </div>
      <div className="clientList">
        <div className="clientListItem">Client 1</div>
        <div className="clientListItem">Client 2</div>
        <div className="clientListItem">Client 3</div>
        <div className="clientListItem">Client 4</div>
        <div className="clientListItem">Client 5</div>
        <div className="clientListItem">Client 6</div>
        <div className="clientListItem">Client 7</div>
      </div>
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
      {/* <ClientListCell /> */}
    </UserLayout>
  )
}

export default TrainerPage
