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

ReactDOM.render(
    <StructureContentList
        baseUrl="//testservices.bcpl.info/api/structured-content/blog"
        filters={filters}
        cardContentComponent={BlogCardContent}
    />,
    document.getElementById('root')
);
