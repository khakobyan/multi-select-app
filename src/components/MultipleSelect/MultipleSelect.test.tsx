import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MultipleSelect from './MultipleSelect';

it('renders the component with options', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  const { getByLabelText, getByText } = render(<MultipleSelect options={options} />);

  fireEvent.click(getByLabelText('select-options'));

  options.forEach(option => {
    expect(getByText(option.label)).toBeInTheDocument();
  });
});

it('selects and deselects options', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  const { getByLabelText, getAllByText } = render(<MultipleSelect options={options} />);

  const selectOptionsButton = getByLabelText('select-options');

  fireEvent.click(selectOptionsButton);

  const option1Elements = getAllByText(/Option 1/);
  
  const option1ToSelect = option1Elements.find(el => !el?.parentElement?.classList.contains('selected'));
  
  if (option1ToSelect) {
    fireEvent.click(option1ToSelect);

    expect(option1ToSelect.parentElement).toHaveClass('selected');

    fireEvent.click(option1ToSelect);
    expect(option1ToSelect.parentElement).not.toHaveClass('selected');
  }
});


it('clears all selections', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  const { getByText, getByLabelText } = render(<MultipleSelect options={options} />);

  const select = getByLabelText('select-options');
  fireEvent.click(select);

  fireEvent.click(getByText('Option 1'));
  fireEvent.click(getByText('Option 2'));
  expect(select).toHaveTextContent('Option 1');
  expect(select).toHaveTextContent('Option 2');

  fireEvent.click(getByText('Clear All'));
  expect(select).not.toHaveTextContent('Option 1');
  expect(select).not.toHaveTextContent('Option 2');
});

it('calls onChange callback with selected values', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  const handleChange = jest.fn();

  const { getByText, getByLabelText } = render(<MultipleSelect options={options} />);
  const select = getByLabelText('select-options');
  fireEvent.click(select);

  fireEvent.click(getByText('Option 1'));
  fireEvent.click(getByText('Option 2'));
  waitFor(() => {
    expect(handleChange).toHaveBeenCalledWith(['Option 1', 'Option 2']);
  })

  fireEvent.click(getByText('Option 1'));
  waitFor(() => {
    expect(handleChange).toHaveBeenCalledWith(['Option 2']);
  })

  fireEvent.click(getByText('Option 3'));
  waitFor(() => {
    expect(handleChange).toHaveBeenCalledWith(['Option 2', 'Option 3']);
  })
});

it('filters options when searching', () => {
  const options = [
    { value: '1', label: 'Apple' },
    { value: '2', label: 'Samsung' },
    { value: '3', label: 'Microsoft' },
  ];

  const { getByLabelText, getByPlaceholderText, queryByText } = render(<MultipleSelect options={options} />);

  const select = getByLabelText('select-options');
  fireEvent.click(select);
  const searchInput = getByPlaceholderText('Search...');

  fireEvent.change(searchInput, { target: { value: 'Samsung' } });

  expect(queryByText('Apple')).toBeNull();
  expect(queryByText('Samsung')).toBeInTheDocument();
  expect(queryByText('Microsoft')).toBeNull();
});
