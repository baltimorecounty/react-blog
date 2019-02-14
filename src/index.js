import React from 'react';
import ReactDOM from 'react-dom';
import StructureContentList from './StructuredContentList';
import BlogCardContent from './Blog/BlogCardContent';
import "./App.css";
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
            baseUrl="//testservices.bcpl.info/api/structured-content/blog"
            filters={filters}
            cardContentComponent={BlogCardContent}
            title="Between the Covers"
        />,
        appElm
    );
}
