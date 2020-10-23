import { render } from '@redwoodjs/testing'

import TrainerPage from './TrainerPage'

describe('TrainerPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TrainerPage />)
    }).not.toThrow()
  })
})
