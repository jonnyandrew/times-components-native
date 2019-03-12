import React from "react";
import PropTypes from "prop-types";
import { TileLink, TileSummary, withTileTracking } from "../shared";
import styles from "./styles";

const TileY = ({ onPress, tile }) => (
  <TileLink onPress={onPress} style={styles.container} tile={tile}>
    <TileSummary
      headlineStyle={styles.headline}
      summary={tile.article.summary300}
      tile={tile}
    />
  </TileLink>
);

TileY.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default withTileTracking(TileY);
