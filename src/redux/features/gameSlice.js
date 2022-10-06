import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import tiles from "./mockData";

export const matchTiles = createAsyncThunk(
  "game/matchTiles",
  ({ firstTileId, secondTileId }, { dispatch, getState }) => {
    const { firstTile, tiles } = getState().game;
    const secondTile = tiles.find((tile) => tile.id === secondTileId);

    if (firstTile.color === secondTile.color) {
      dispatch(disableTiles({ firstId: firstTileId, secondId: secondTileId }));
    } else {
      dispatch(setIsBlockBoard(true));
      setTimeout(() => {
        dispatch(closeTiles({ firstId: firstTileId, secondId: secondTileId }));
        dispatch(setIsBlockBoard(false));
      }, 1000);
    }
  }
);

export const flipTile = createAsyncThunk(
  "game/flipTile",
  (id, { dispatch, getState }) => {
    dispatch(openTile(id));
    const { firstTile } = getState().game;
    if (!firstTile) {
      dispatch(setFirstTile(id));
    } else {
      dispatch(matchTiles({ firstTileId: firstTile.id, secondTileId: id }));
    }
  }
);

const initialState = {
  tiles,
  flippedCounter: 0,
  firstTile: null,
  isBlockBoard: false,
  isShowModal: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    openTile: (state, { payload }) => {
      state.tiles = state.tiles.map((tile) => {
        if (tile.id === payload) {
          return { ...tile, isClosed: false };
        }
        return tile;
      });
    },
    setFirstTile: (state, { payload }) => {
      state.firstTile = state.tiles.find((tile) => tile.id === payload);
    },
    closeTiles: (state, { payload }) => {
      state.tiles = state.tiles.map((tile) => {
        if (tile.id === payload.firstId || tile.id === payload.secondId) {
          return { ...tile, isClosed: true };
        }
        return tile;
      });
      state.firstTile = null;
    },
    disableTiles: (state, { payload }) => {
      state.tiles = state.tiles.map((tile) => {
        if (tile.id === payload.firstId || tile.id === payload.secondId) {
          return { ...tile, isActive: false };
        }
        return tile;
      });
      state.firstTile = null;
      if (state.flippedCounter === 14) {
        state.isShowModal = true;
      }
      state.flippedCounter += 2;
    },
    setIsBlockBoard: (state, { payload }) => {
      state.isBlockBoard = payload;
    },
    mixOrder: (state) => {
      state.tiles = state.tiles.map((tile) => {
        return { ...tile, order: Math.floor(Math.random() * 16) };
      });
    },
    resetGameBoard: (state) => {
      state.tiles = state.tiles.map((tile) => {
        return {
          ...tile,
          order: Math.floor(Math.random() * 16),
          isClosed: true,
          isActive: true,
        };
      });
      state.flippedCounter = 0;
      state.isShowModal = false;
    },
    closeModal: (state) => {
      state.isShowModal = false;
    },
  },
});

export const {
  openTile,
  closeTiles,
  disableTiles,
  setFirstTile,
  setIsBlockBoard,
  mixOrder,
  resetGameBoard,
  closeModal,
} = gameSlice.actions;

export default gameSlice.reducer;
