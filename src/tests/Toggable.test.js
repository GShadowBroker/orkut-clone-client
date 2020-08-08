import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import Toggable from '../components/utils/Togglable'

test('renders Toggable component', () => {
    const message = 'Test message'

    const component = render(
        <Toggable>{ message }</Toggable>
    )

    expect(screen.queryByText(message)).toBeNull()

    fireEvent.click(screen.getByText(/mostrar/i))
    expect(screen.getByText(message)).toBeInTheDocument()

    fireEvent.click(screen.getByText(/ocultar/i))
    expect(screen.queryByText(message)).toBeNull()
})