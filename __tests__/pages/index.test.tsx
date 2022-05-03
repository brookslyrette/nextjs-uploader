import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import '@testing-library/jest-dom'

import Home from '../../pages/index'

jest.mock("next-auth/react")

describe('Home', () => {
  it('renders for support', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          username: 'tester',
          role: 'support'
        },
      },
      status: 'authenticated',
    })
    render(<Home />)

    const heading = screen.getByText("Click here to view uploaded logs files")

    expect(heading).toBeInTheDocument()
  })
  it('renders for customers', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          username: 'tester',
          role: 'customer'
        },
      },
      status: 'authenticated',
    })
    render(<Home />)

    const heading = screen.getByText("Click here to upload a log file to share with our support team")

    expect(heading).toBeInTheDocument()
  })
  it('renders when not logged in', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    })
    render(<Home />)

    const heading = screen.getByText("Click here to log in and get started")

    expect(heading).toBeInTheDocument()
  })
})
