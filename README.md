## BCPL Blog

Home of the code for the BCPL Blog.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
- [BCPL Blog](#bcpl-blog)
- [Setup](#setup)
- [Running the App](#running-the-app)
- [Publishing the App](#publishing-the-app)
- [Component Properties](#component-properties)
- [Models](#models)
	- [Filter](#filter)

## Setup

`npm install`

## Running the App

`yarn start`

## Publishing the App

1. `yarn build`
2. Login to CMS and update the css and js files generated from the build in step #1

_Note_: Make sure that your `baseUrl` is set to the appropriate environment

- Local - your web service running locally
- Dev - testservices.bcpl.info
- Prod - services.bcpl.info

## Component Properties

| Name                 | Type   | Default | Description                                                     | Is Required? |
| -------------------- | ------ | ------- | --------------------------------------------------------------- | ------------ |
| baseUrl              | string | n/a     | Api Endpoint for the Blog                                       | Yes          |
| filters              | array  | n/a     | A list of [filters](#filter) to include in the app              | No           |
| cardContentComponent | Node   | n/a     | A custom component to display the results of your endpoint call | Yes          |
| title                | string | ''      | H1 to show in your app                                          | No           |

## Models

### Filter

**field**: property name of the filter in which you want to add (property must exist in your results)

**type**: right now, this can only be `radio` (`checkbox` will be added in the future)

**Example**:

```javascript
{
	field: 'Category',
	type: 'radio'
}
```