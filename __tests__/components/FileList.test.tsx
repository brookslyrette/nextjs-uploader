import { render, screen } from '@testing-library/react'
import FileList from '../../components/FileList'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import 'whatwg-fetch'

describe('Home', () => {
  it('renders a loading state', () => {
    render(<FileList files={[]} state="loading" />)

    const heading = screen.getByText('Loading...')

    expect(heading).toBeInTheDocument()
  })
  it('renders a files once loaded', () => {
    render(<FileList files={[
      {
        name: 'file1.tgz',
        size: 100,
        lastModified: new Date(Date.now() - 1000)
      }
    ]} state="loaded" />)

    const fileItem = screen.getByText('file1.tgz')

    expect(fileItem).toBeInTheDocument()
  })
})