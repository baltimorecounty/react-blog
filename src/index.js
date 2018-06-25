import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StructureContentList from './StructuredContentList';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<StructureContentList />, document.getElementById('root'));
registerServiceWorker();
