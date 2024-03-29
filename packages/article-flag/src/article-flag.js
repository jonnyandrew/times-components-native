import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { colours } from "@times-components-native/styleguide";
import { gqlRgbaToStyle } from "@times-components-native/utils";
import styles from "./style";
import getActiveFlags from "./get-active-flags";
import {
  articleFlagPropTypes,
  articleFlagsPropTypes,
  articleFlagDefaultProps,
} from "./article-flag-prop-types";

const ArticleFlag = ({ title, color }) => (
  <View style={styles.view}>
    <View
      style={[
        styles.bullet,
        { backgroundColor: gqlRgbaToStyle(color) || color },
      ]}
    />
    <Text
      accessibilityLabel={`${title} Flag`}
      style={[styles.title, { color: gqlRgbaToStyle(color) || color }]}
      testID={`flag-${title}`}
    >
      {title.toLowerCase()}
    </Text>
  </View>
);

ArticleFlag.propTypes = {
  ...articleFlagPropTypes,
  title: PropTypes.string.isRequired,
};

ArticleFlag.defaultProps = articleFlagDefaultProps;

const NewArticleFlag = (props) => <ArticleFlag {...props} title="new" />;
const UpdatedArticleFlag = (props) => (
  <ArticleFlag {...props} title="updated" />
);
const ExclusiveArticleFlag = (props) => (
  <ArticleFlag {...props} title="exclusive" />
);
const SponsoredArticleFlag = (props) => (
  <ArticleFlag {...props} title="sponsored" />
);
const LongReadArticleFlag = () => null;
// disable long read flag for now
//<ArticleFlag {...props} title="long read" testID={"long-read"} />

NewArticleFlag.propTypes = articleFlagPropTypes;
NewArticleFlag.defaultProps = {
  color: colours.functional.articleFlagNew,
};

UpdatedArticleFlag.propTypes = articleFlagPropTypes;
UpdatedArticleFlag.defaultProps = {
  color: colours.functional.articleFlagUpdated,
};

ExclusiveArticleFlag.propTypes = articleFlagPropTypes;
ExclusiveArticleFlag.defaultProps = {
  color: colours.functional.articleFlagExclusive,
};

SponsoredArticleFlag.propTypes = articleFlagPropTypes;
SponsoredArticleFlag.defaultProps = {
  color: colours.functional.tertiary,
};

LongReadArticleFlag.propTypes = articleFlagPropTypes;
LongReadArticleFlag.defaultProps = {
  color: colours.functional.secondary,
};

const ArticleFlags = ({ flags, longRead, color, style, withContainer }) => {
  const activeFlags = getActiveFlags(flags);
  const allFlags = [
    ...activeFlags,
    ...(longRead ? [{ type: "LONGREAD" }] : []),
  ];

  if (!allFlags.length) return null;

  const flagsMapping = {
    NEW: <NewArticleFlag color={color} />,
    UPDATED: <UpdatedArticleFlag color={color} />,
    EXCLUSIVE: <ExclusiveArticleFlag color={color} />,
    SPONSORED: <SponsoredArticleFlag color={color} />,
    LONGREAD: <LongReadArticleFlag color={color} />,
  };

  const flagsView = (
    <View style={[styles.flags, style]}>
      {allFlags.map((flag) => (
        <View key={flag.type} style={allFlags.length > 1 && styles.flagPadding}>
          {flagsMapping[flag.type]}
        </View>
      ))}
    </View>
  );

  if (!withContainer) return flagsView;

  return <View style={styles.flagsContainer}>{flagsView}</View>;
};

ArticleFlags.propTypes = articleFlagsPropTypes;
ArticleFlags.defaultProps = {
  flags: [],
  longRead: false,
  withContainer: false,
};

export default ArticleFlag;

export {
  getActiveFlags,
  ArticleFlags,
  NewArticleFlag,
  UpdatedArticleFlag,
  ExclusiveArticleFlag,
  SponsoredArticleFlag,
  LongReadArticleFlag,
};
