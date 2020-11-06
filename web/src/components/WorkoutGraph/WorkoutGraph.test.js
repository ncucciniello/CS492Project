import { render } from '@redwoodjs/testing'

import WorkoutGraph from './WorkoutGraph'

describe('WorkoutGraph', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WorkoutGraph />)
    }).not.toThrow()
  })
})
