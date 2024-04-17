import { render, screen } from '@testing-library/react';
import { Timer } from './Timer';

  test('renders correctly with deafult 30s', () => {
    render(<Timer resetTimer={{current: null}} darkMode={{darkMode: false}} gameFinish={false} />);

    expect(screen.getByText('30s')).toBeInTheDocument();

  });

  test('renders with diferent timeout if indicated', () => {
    const resetTimer = {current: null};
    render(<Timer timeout={15000} resetTimer={resetTimer} darkMode={{darkMode: false}} gameFinish={false} />);

    expect(screen.getByText('15s')).toBeInTheDocument();

});
