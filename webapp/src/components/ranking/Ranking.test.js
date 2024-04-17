import React from 'react';
import { render } from '@testing-library/react';
import { Ranking } from './Ranking';

describe('Ranking Component', () => {
    it('renders without crashing', () => {
      render(<Ranking darkMode={false} />);
    });
  
    
});