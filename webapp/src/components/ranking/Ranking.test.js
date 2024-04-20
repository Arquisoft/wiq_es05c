import React from 'react';
import { render } from '@testing-library/react';
import { Ranking } from './Ranking';

describe('Ranking Component', () => {
    it('renders without crashing', () => {
      render(<Ranking darkMode={false} />);
    });
  
    it('renders correctly', () => {
      const { getByText } = render(<Ranking darkMode={false} />);
  
      expect(getByText('Ranking')).toBeInTheDocument();
      expect(getByText('Posición')).toBeInTheDocument();
      expect(getByText('Usuario')).toBeInTheDocument();
      expect(getByText('Puntuación')).toBeInTheDocument();
    });
    
});