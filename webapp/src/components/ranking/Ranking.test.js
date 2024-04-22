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
  
      expect(rows).toHaveLength(2); // 2 filas de datos + 1 fila de encabezado
  
      
    });
    
});