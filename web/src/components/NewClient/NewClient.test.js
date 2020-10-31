import { render } from '@redwoodjs/testing'

import NewClient from './NewClient'

describe('NewClient', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewClient />)
    }).not.toThrow()
  })
})
