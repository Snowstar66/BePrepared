import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { HouseholdProfileForm } from '../components/household-profile-form'
import { resetAppDbForTests } from '../../../shared/lib/dexie/app-db'

describe('Household profile flow', () => {
  beforeEach(async () => {
    await resetAppDbForTests()
  })

  afterEach(async () => {
    await resetAppDbForTests()
  })

  it('shows field errors without clearing typed values and reloads saved profile data', async () => {
    const firstRender = render(<HouseholdProfileForm />)

    const adultsInput = await screen.findByLabelText(/antal vuxna/i)
    const saveButton = screen.getByRole('button', {
      name: /spara hushållsprofil/i,
    })
    await waitFor(() => {
      expect(saveButton).toBeEnabled()
    })

    const childrenInput = screen.getByLabelText(/antal barn/i)
    const petsCheckbox = screen.getByLabelText(/hushållet har husdjur/i)
    const formElement = saveButton.closest('form')

    expect(formElement).not.toBeNull()

    fireEvent.change(adultsInput, { target: { value: '0' } })
    fireEvent.change(childrenInput, { target: { value: '2' } })
    fireEvent.click(petsCheckbox)

    expect(adultsInput).toHaveValue(0)
    expect(childrenInput).toHaveValue(2)
    expect(petsCheckbox).toBeChecked()

    fireEvent.submit(formElement as HTMLFormElement)

    expect(
      await screen.findByText(/antal vuxna måste vara minst 1/i),
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/antal vuxna/i)).toHaveValue(0)
    expect(screen.getByLabelText(/antal barn/i)).toHaveValue(2)
    expect(screen.getByLabelText(/hushållet har husdjur/i)).toBeChecked()

    fireEvent.change(screen.getByLabelText(/antal vuxna/i), {
      target: { value: '2' },
    })
    fireEvent.submit(formElement as HTMLFormElement)

    expect(
      await screen.findByText(/hushållsprofilen är sparad lokalt/i),
    ).toBeInTheDocument()

    firstRender.unmount()

    render(<HouseholdProfileForm />)

    await waitFor(() => {
      expect(screen.getByLabelText(/antal vuxna/i)).toHaveValue(2)
    })

    expect(screen.getByLabelText(/antal barn/i)).toHaveValue(2)
    expect(screen.getByLabelText(/hushållet har husdjur/i)).toBeChecked()
  })
})
