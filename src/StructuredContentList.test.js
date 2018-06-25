import React from 'react';
import ReactDOM from 'react-dom';
import App from './StructuredContentList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StructuredContentList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
