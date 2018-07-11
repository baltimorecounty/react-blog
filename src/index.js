import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StructureContentList from './StructuredContentList';
import registerServiceWorker from './registerServiceWorker';
import BlogCardContent from './Blog/BlogCardContent';

const filters = [
    {
        title: 'Category',
        type: 'single',
        options: [
            {
                label: 'Show All Blog Categories',
                value: 'all',
                isCheckedByDefault: true
            },
            {
                label: 'Collection and Materials',
                value: 'collections-and-materials'
            },
            {
                label: 'News',
                value: 'news'
            },
            {
                label: 'Programming and Events',
                value: 'programming-and-events'
            }
        ]
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
