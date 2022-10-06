import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import styled from "styled-components";

import { mixOrder } from "./redux/features/gameSlice";
import ResetModal from "./components/ResetModal";
import GameTile from "./components/GameTile";

const App = ({ isShowModal }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(mixOrder());
  }, [dispatch]);

  return (
    <Root>
      <GameTile />
      {isShowModal && <ResetModal />}
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const mapStateToProps = ({ game }) => ({
  isShowModal: game.isShowModal,
});

export default connect(mapStateToProps)(App);
