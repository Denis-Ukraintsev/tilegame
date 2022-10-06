import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./features/gameSlice";

export default configureStore({
  reducer: {
    game: gameReducer,
  },
});
