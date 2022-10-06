import React from "react";
import { connect } from "react-redux";
import { flipTile } from "../redux/features/gameSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const GameTile = ({ flipTile, tiles, isBlockBoard }) => {
  const dispatch = useDispatch();
  const handleOpenTile = (id) => {
    dispatch(flipTile(id));
  };

  const handleClick = (tile) => () => {
    if (tile.isActive && !isBlockBoard) {
      handleOpenTile(tile.id);
    }
  };
  const tilesArray = tiles.map((tile) => (
    <Tile
      isClosed={tile.isClosed}
      order={tile.order}
      key={tile.id}
      onClick={handleClick(tile)}
    >
      <TileFront color={tile.color} />
      <TileBack />
    </Tile>
  ));
  return <Root>{tilesArray}</Root>;
};

const TileFront = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  ${({ color }) => color && `background-color: ${color}`};
  transform: rotateY(180deg);
  backface-visibility: hidden;
  position: absolute;
  border: 1px solid black;
`;
const TileBack = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: black;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
  position: absolute;
`;

const Root = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 400px;
`;

const Tile = styled.div`
  margin: 10px;
  order: ${({ order }) => order};
  ${({ isClosed }) => !isClosed && "transform: rotateY(180deg)"};
  transform-style: preserve-3d;
  position: relative;
  transition: transform 0.7s;
  width: 70px;
  height: 70px;
`;

const mapStateToProps = ({ game }) => ({
  tiles: game.tiles,
  isBlockBoard: game.isBlockBoard,
});

export default connect(mapStateToProps, { flipTile })(GameTile);
