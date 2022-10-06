import React from "react";
import styled from "styled-components";
import {
  closeModal as closeModalAction,
  resetGameBoard,
} from "../redux/features/gameSlice";
import { connect } from "react-redux";

const ResetModal = ({ closeModal, resetGame }) => {
  const i18n = {
    reset: "reset",
    close: "close",
    title: "Good job, man!",
  };

  return (
    <Root>
      <Modal>
        <Title>{i18n.title}</Title>
        <BtnRoot>
          <Btn onClick={resetGame}>{i18n.reset}</Btn>
          <Btn onClick={closeModal}>{i18n.close}</Btn>
        </BtnRoot>
      </Modal>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 1;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.15);
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 400px;
  height: 350px;
  background-color: #fff;
  border: 1px solid black;
  border-radius: 15px;
`;

const Title = styled.h1`
  display: flex;
  align-self: center;
  color: #8321a3;
`;

const BtnRoot = styled.div`
  display: flex;
  align-self: center;
  height: 25px;
  padding: 50px;
`;

const Btn = styled.button`
  width: 100px;
  border-radius: 7px;
  background-color: #8221a343;
  margin: 0 40px;
  font-size: 17px;
`;

const mapDispatchToProps = (dispatch) => ({
  resetGame: () => dispatch(resetGameBoard()),
  closeModal: () => dispatch(closeModalAction()),
});

export default connect(null, mapDispatchToProps)(ResetModal);
