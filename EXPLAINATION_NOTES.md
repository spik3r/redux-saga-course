# REDUX & REDUX-SAGA
A quick explanation of the concepts using this app for examples

- store = {JSON Object}
- dispatch = An action that gets fired through the 
--    connect(<rest ommited see App.js> 
--    ... 
--    createUserRequest, 
--    ...)(App)
- middleware 
>It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer. People use Redux middleware for logging, crash reporting, talking to an asynchronous API, routing, and more.

## STORE
> the apps state

In it's simplest form it's a JSON object that holds the complete state for the app.

## REDUCERS
>the only thing that can update the state.
>also always the first thing to be run

A function that takes in two arguments `currentState` and `action` and returns a new state

## ACTION
> what is being changed

A function that takes a `payload` and returns a JSON object `{ type: CREATE_USER_REQUEST, payload: {firstName, lastName} }`
 in this case it gets triggered by the `Create` Button's `handleSubmit` method that triggers the connected `createUserRequest` action 

## SELECTOR
> A `selector` is simply a function that accepts Redux state as an argument and returns data that is derived from that state.
>
## SAGA
> By Convention sagas are split up in two types but it also helps with understanding a little
### WATCHER
> listen for an action then call the worker

 eg. when `CREATE_USER_REQUEST` happens call the `createUser` worker saga with the action.
 
### WORKER
> the saga that does stuff

eg. when the `createUser` worker saga runs call the api with the payload from actions in this case `{firstName: action.payload.firstName, lastName: action.payload.lastName}`


## REDUX / SAGA ORDER OF EXECUTION

option* [UI event] (triggers) -> [Action]

[Action]  (causes state update in the) -> [REDUCER]
[REDUCER] (updatees the state in the) -> [Store] 
[Store] (update action triggers) -> [SAGA] 
[SAGA] (potentially calls more actions causing the reducer to update state and so on...) [ACTION] -> [REDUCER] and so on..

## Further reading/ watching:
- https://redux-starter-kit.js.org/introduction/quick-start
- https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html
- https://egghead.io/courses/building-react-applications-with-idiomatic-redux