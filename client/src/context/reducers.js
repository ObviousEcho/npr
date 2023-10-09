import { TRIGGER_MODAL } from "./actions";

export default function reducer(state, action) {
  switch (action.type) {
    case TRIGGER_MODAL: {
      return {
        ...state,
        setIsModal: state.setIsModal((prev) => !prev),
      };
    }
    default:
      return state;
  }
}
