import React from 'react';
import { render } from '@testing-library/react';
import { Ranking } from './Ranking';

describe('Ranking Component', () => {
    it('renders without crashing', () => {
      render(<Ranking darkMode={false} />);
    });
  
    it('renders dark mode without crashing', () => {
      render(<Ranking darkMode={true} />);
    });

    it('renders correctly', () => {
      const ranking = [
        { user: 'user1', diariasAcertadas: 10 },
        { user: 'user2', diariasAcertadas: 8 },
      ];
  
      const { getAllByRole } = render(<Ranking ranking={ranking} darkMode={false} />);
  
      const rows = getAllByRole('row');
  
      expect(rows).toHaveLength(3); // 2 filas de datos + 1 fila de encabezado
  
      const firstRow = within(rows[1]);
      expect(firstRow.getByText('1')).toBeInTheDocument();
      expect(firstRow.getByText('user1')).toBeInTheDocument();
      expect(firstRow.getByText('10')).toBeInTheDocument();
  
      const secondRow = within(rows[2]);
      expect(secondRow.getByText('2')).toBeInTheDocument();
      expect(secondRow.getByText('user2')).toBeInTheDocument();
      expect(secondRow.getByText('8')).toBeInTheDocument();
    });
    
});