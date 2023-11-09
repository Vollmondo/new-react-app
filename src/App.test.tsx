import React from 'react';
import { render, screen } from '@testing-library/react';
jest.mock("highcharts/modules/accessibility")
jest.mock("highcharts/modules/boost");
import App from './App';

test('renders learn react link', () => {
  render(<App />);
});
