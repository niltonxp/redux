function reducer(state = { loading: false, data: null, error: null }, action) {
  switch (action.type) {
    case "FETCH_STARTED":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { loading: false, data: action.payload, error: null };
    case "FETCH_ERROR":
      return { loading: false, error: action.payload, data: null };
    default:
      return state;
  }
}

// thunk
const thunk = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch, store.getState);
  } else {
    return next(action);
  }
};

const { compose, applyMiddleware } = Redux;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = Redux.createStore(reducer, enhancer);

// Action Creator, retorna uma função ao invés de um objeto
function fetchUrl(url) {
  return async (dispatch) => {
    try {
      dispatch({ type: "FETCH_STARTED" });
      const data = await fetch(url).then((r) => r.json());
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };
}

store.dispatch(fetchUrl("https://dogsapi.origamid.dev/json/api/photo"));
