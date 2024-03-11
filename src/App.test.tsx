import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

it('renders the App component', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, title: 'Album 1' },
          { id: 2, title: 'Album 2' },
          { id: 3, title: 'Album 3' },
        ]),
    })
  ) as jest.Mock;

  const { getByText, getByLabelText } = render(<App />);

  expect(getByText('Multiple Select Component')).toBeInTheDocument();

  waitFor(() => {
    expect(getByLabelText('Select')).toBeInTheDocument();
    expect(getByText('Album 1')).toBeInTheDocument();
    expect(getByText('Album 2')).toBeInTheDocument();
    expect(getByText('Album 3')).toBeInTheDocument();
  }, {timeout: 1000});
});
