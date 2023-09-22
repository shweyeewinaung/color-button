import { logRoles, render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('button has correct initial color and updates when clicked', () => {
  render(<App/>);
  
  //find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole('button', { name : 'Change to blue' });

  //expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' })

  //click button
  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: 'blue'});
  expect(colorButton).toHaveTextContent('Change to red');
});

test('initial conditions', () => {
  render(<App/>);
  
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  expect(colorButton).toBeEnabled();

  const checkBox = screen.getByRole('checkbox');
  expect(checkBox).not.toBeChecked();
})

test('When the checkbox is checked, button should be disabled', () => {
  render(<App/>);

  const checkBox = screen.getByRole('checkbox', { name: 'Disable button'});
  fireEvent.click(checkBox)

  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  expect(colorButton).toBeDisabled();

  fireEvent.click(checkBox)
  expect(colorButton).toBeEnabled();
})

test('Confirm the button color is grey when it is disabled when it is red color', () => {
  render(<App/>);

  const colorButton = screen.getByRole('button', { name : 'Change to blue' });
  const checkBox = screen.getByRole('checkbox', { name : 'Disable button' });

  fireEvent.click(checkBox);
  expect(colorButton).toBeDisabled();
  expect(colorButton).toHaveStyle({ backgroundColor: 'grey' });

  fireEvent.click(checkBox);
  expect(colorButton).toBeEnabled();
  expect(colorButton).toHaveStyle({ backgroundColor:'red' });
})

test('Confirm the button color is grey when it is disabled when it is blue color', () => {
  render(<App/>);

  const colorButton = screen.getByRole('button', { name : 'Change to blue' });
  const checkBox = screen.getByRole('checkbox', { name : 'Disable button' });

  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({backgroundColor : 'blue'})
  expect(colorButton).toHaveTextContent('Change to red');

  fireEvent.click(checkBox);

  expect(colorButton).toBeDisabled();
  expect(colorButton).toHaveStyle({ backgroundColor: 'grey' });

  fireEvent.click(checkBox);

  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });
  expect(colorButton).toHaveTextContent('Change to red');

})

