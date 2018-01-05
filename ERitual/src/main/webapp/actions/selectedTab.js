//An action creator, selectBook , just returns an action
export function selectTab(item) {
  return {
    type: "SELECTED_TAB",
    payload:item
  }
};