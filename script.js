// O Middleware ocorre entre o momento que a ação é disparada e antes dela chegar ao reducer.
// Ele é aplicado através da função Redux.applyMiddleware.

function reducer(state = 0, action) {
  switch (action.type) {
    case "INCREMENTAR":
      return state + 1;
    case "REDUZIR":
      return state - 1;
    default:
      return state;
  }
}

const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("ACTION", action);
  // store.getState antes de next(action), retorna o estado atual
  console.log("PREV_STATE", store.getState());
  const result = next(action);
  // store.getState após next(action), retorna o estado posterior
  console.log("NEW_STATE", store.getState());
  console.groupEnd();
  // temos sempre que retornar o resultado de next(action)
  return result;
};

// Desestrutução das funções do Redux (não é necessário, podemos usar Redux.compose)
const { compose, applyMiddleware } = Redux;
// Verifica se __REDUX_DEVTOOLS_EXTENSION__COMPOSE__ existe, se nõa usa o compose puro.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Aplica o Middleware com o compose
const enhancer = composeEnhancers(applyMiddleware(logger));
// Utiliza a devTools + middleware como enhancer da store
const store = Redux.createStore(reducer, enhancer);

store.dispatch({ type: "INCREMENTAR" });
const action = store.dispatch({ type: "REDUZIR" });
console.log(action);

// {type: 'INCREMENTAR'}, se não retornarmos nada no Middleware, aqui será undefined
