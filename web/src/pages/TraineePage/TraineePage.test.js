import { render } from '@redwoodjs/testing'

import TraineePage from './TraineePage'

describe('TraineePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TraineePage />)
    }).not.toThrow()
  })
})
