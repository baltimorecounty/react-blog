import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StructureContentList from './StructuredContentList';
import registerServiceWorker from './registerServiceWorker';
import BlogCardContent from './Blog/BlogCardContent';

const filters = [
    {
        field: 'Category',
		type: 'radio'
	}
];

ReactDOM.render(
    <StructureContentList
		baseUrl="http://localhost:54453/api/structured-content/blog"
        filters={filters}
        cardContentComponent={BlogCardContent}
    />,
    document.getElementById('root')
);
registerServiceWorker();
