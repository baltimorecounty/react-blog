import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StructureContentList from './StructuredContentList';
import registerServiceWorker from './registerServiceWorker';
import BlogCardContent from './Blog/BlogCardContent';

ReactDOM.render(<StructureContentList cardContentComponent={BlogCardContent} />, document.getElementById('root'));
registerServiceWorker();
