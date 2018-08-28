## BCPL Blog

Home of the code for the BCPL Blog.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
- [BCPL Blog](#bcpl-blog)
- [Component Properties](#component-properties)
- [Setup](#setup)
- [Running the App](#running-the-app)
- [Publishing the App](#publishing-the-app)

## Component Properties

| Name                 | Type   | Default | Description                                                             | Is Required? |
| -------------------- | ------ | ------- | ----------------------------------------------------------------------- | ------------ |
| baseUrl              | string | n/a     | Api Endpoint for the Blog                                               | Yes          |
| filters              | array  | n/a     | A list of filters to be applied to allow your users to use in their app | No           |
| cardContentComponent | Node   | n/a     | A custom component to display the results of your endpoint call         | Yes          |
| title                | string | ''      | H1 to show in your app                                                  | No           |

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
