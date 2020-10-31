import NewClient from 'src/components/NewClient/NewClient'
import UserLayout from 'src/layouts/UserLayout'
import ClientListCell from 'src/components/ClientListCell'
import { useState } from 'react'

const TrainerPage = () => {
  const [isVisible, setVisible] = useState(false)

  const openTraineeList = () => {
    setVisible(true)
  }

  return (
    <UserLayout>
      <div className="clientListHeader">
        <h3>Client List</h3>
        <button onClick={openTraineeList}>Add Client +</button>
        {isVisible && <NewClient setVisible={setVisible} />}
        <ClientListCell trainerId={1} />
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
    </UserLayout>
  )
}

export default TrainerPage
