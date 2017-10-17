// state here is just the piece of the application state that is
// concerned with this reducer

export default (state = null, action) => {
  switch (action.type) {
    case 'SELECTED_TAB':
      return action.payload;
      break;
    default:
      return state;
  }
}
