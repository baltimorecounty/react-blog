import React from 'react';
import ReactDOM from 'react-dom';
import StructureContentList from './StructuredContentList';
import BlogCardContent from './Blog/BlogCardContent';

const filters = [
    {
        field: 'Category',
        type: 'radio'
    }
];

const appElm = document.getElementById('root');

if (appElm) {
    ReactDOM.render(
        <StructureContentList
            baseUrl="//localhost:54453/api/structured-content/blog"
            filters={filters}
            cardContentComponent={BlogCardContent}
        />,
        appElm
    );
}
