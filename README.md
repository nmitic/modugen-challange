# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `Notes`
- I have decided to make the form configurable. Which will allow for any number of fields and steps to be shown.
- This approach has its pros and cons, it makes the form configurable from the outside, with certain modifications, but this comes with the danger of UI breaking in case when form is not configured in a way that component API is expecting. Plus many more pros and cons. 

### `Tools Exmplanation`

- **Formik** - to make me go faster I decided to make use of react form lib which will do all the heavy lifting for me when it comes to validation
- **React MUI** - in order to make things look at least semi decent I have reached out to component lib I am the most familiar with.
- **Yup and card-validator** - as a utils to apply validation without having to write my own validation engine.

