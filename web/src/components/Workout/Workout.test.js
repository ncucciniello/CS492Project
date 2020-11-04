import { render } from '@redwoodjs/testing'

import Workout from './Workout'

describe('Workout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Workout />)
    }).not.toThrow()
  })
})
