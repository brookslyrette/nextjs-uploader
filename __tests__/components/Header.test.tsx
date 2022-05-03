import { render, screen } from '@testing-library/react'
import Header from '../../components/Header'
import '@testing-library/jest-dom'
import { Role } from '../../lib/model/model'

describe('Home', () => {
  it('renders a heading when unauthenticated', () => {
    render(<Header session={null}/>)

    const heading = screen.getByText('Log in')

    expect(heading).toBeInTheDocument()
  })
  it('renders a heading when authenticated', () => {
    const role: Role = 'support'
    const mockSession = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: { username: "tester", name: "tester", role: role }
    };

    render(<Header session={mockSession}/>)

    const heading = screen.getByText('Logged in as tester,')
    const logout = screen.getByText('Log out')

    expect(heading).toBeInTheDocument()
    expect(logout).toBeInTheDocument()
  })
})