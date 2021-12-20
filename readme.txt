# AUTHOR
Michael McKenzie
michael.scott.mckenzie@gmail.com

# Introduction


# ENVIRONMENT
Browser: Chrome 96
OS: MacOS 12
nodeJS: 16.13.1
npm: 8.1.2
IDE: VS Code 1.63.2

I have not used any unusual CSS or HTML elements. I've used CSS Grid for layout which is widely supported in modern browsers. This layout is not mobile friendly or responsive but at this point it does not need to be.

## Libraries
# Typescript
It just makes life and development a lot easier if you have a type system that catches errors and incorrect API usage. 

# create-react-app
Used to provide both an application skeleton and a webserver for rapid development and testing.

# RecoilJS
Used for state management. Redux is large and cumbersome. Recoil provides a familiar Hooks like API for interacting with data. As the data in the underlying data store is modified, any components that subscribe to that data will rerender themselves automatically.

## How to run
I used create-react-app with Typescript to get the environment running and rapidly provide a base template for an application. As it has been a while since I had to do this I used more than I should have to get everything in place.

Install dependencies
`npm install`
Start the application server
`npm start`


# FILES
## data.ts
Contains functions for fetching data and interacting with the API

## atoms.ts
RecoilJS Atoms for overall state management and data synchronization

## types.ts
Store common types in a single file to eliminate any issues with circular dependencies between files.


# Notes
I was attempting to have an overall application structure where the UI components are bound to data from a central application data store. The output rendered should always be a reflection of the current state of the data and UI components should not need to know how to interact with the data management API. Using Recoil you can create data stores where the data is initially fetched via API calls. Afterwards you can perform operations on those data stores and when changes are committed any React components that use that data will re-render themselves automatically. No need for prop drilling or more complicated data management.

In retrospect I should have spent more time on writing code to interact with the data layer of the application. As it is, the UI is barely incomplete and there is very little code around interacting with the data API.


# TEST OBJECTIVES
No unit tests
Not knowing what kind of test this would be in advance, I had to spend some time getting a development environment up and running. Initially I attempted a much simpler implementation with the aid of tools but that was much slower and problematic. I soon pivoted to using a boilerplate React application to implement the solution.
If I had the time I would have written unit tests in Jest to test the data fetching requests, making sure that the when network or data format errors occur that the correct kind of exceptions are thrown and handled.

