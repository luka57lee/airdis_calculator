# airdis_calculator
AirportDistanceCalculator

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Things implemented

I put more energy into user experience than testing (mocking google map apis, and snapshoting) in the project.
[Searching, Google Map zooming & centering based on distance between two airports, and show markers & polyline ]

1. Airports should be searchable by name or 3 digit code
2. Use an autocomplete component for searching airports
3. Use Material UI
4. Show nautical miles distance 
5. Make a self-test (wrote some unit tests for utility functions)
6. API works well with many airports (actually air-port-codes API returns 20 airports at most)
7. interface works well in mobile
8. Calculation is correct.

## Requirements to run the project

1. Please change .env.example to .env
2. Make sure to put correct env variables

## Available Scripts

In the project directory, you can run:

### `yarn`
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

### `yarn build`

Builds the app for production to the `build` folder.\

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn lint`

Help to find and fix problems with your code
See the section about [eslint](https://eslint.org/)