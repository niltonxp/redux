function getLocalStorage(key, initial) {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (error) {
    return initial;
  }
}

const initialState = {
  token: getLocalStorage("token", null),
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return { token: action.payload };
    default:
      return state;
  }
}

// middleware
const localStorage = (store) => (next) => (action) => {
  const response = next(action);
  if (action.localStorage !== undefined)
    window.localStorage.setItem(
      action.localStorage,
      JSON.stringify(action.payload)
    );
  return response;
};

const { compose, applyMiddleware } = Redux;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(localStorage));
const store = Redux.createStore(reducer, enhancer);

store.dispatch({
  type: "SET_TOKEN",
  payload: "xxxx-xxxx",
  localStorage: "token",
});
