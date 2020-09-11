import React from "react";
import ReactDOM from "react-dom";
import StructureContentList from "./StructuredContentList";
import BlogCardContent from "./Blog/BlogCardContent";
import { Run, getValue } from "./startup";

Run();

const filters = [
  {
    field: "Category",
    type: "radio",
  },
];

const appElm = document.getElementById("root");

if (appElm) {
  ReactDOM.render(
    <StructureContentList
      baseUrl={getValue("apiRoot")}
      filters={filters}
      cardContentComponent={BlogCardContent}
      title="Between the Covers"
    />,
    appElm
  );
}
