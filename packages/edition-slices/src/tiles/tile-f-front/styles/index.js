import {
  colours,
  fonts,
  globalSpacingStyles,
  spacing,
} from "@times-components-native/styleguide";
import { getStyleByDeviceSize } from "@times-components-native/styleguide/src/styleguide";

const headline = {
  ...globalSpacingStyles.tabletHeadline,
  fontFamily: fonts.headline,
};

const summary = {
  ...globalSpacingStyles.tabletTeaser,
};

const strapline = {
  fontFamily: fonts.headlineRegular,
  color: colours.functional.primary,
};

const sharedLandscapeStyles = {
  container: {
    paddingBottom: 0,
    paddingRight: spacing(2),
    flex: 1,
  },
  summaryContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: colours.functional.white,
    width: "100%",
    paddingTop: spacing(2),
  },
  imageContainer: {
    width: "100%",
  },
  summary: {
    ...summary,
    fontSize: 14,
    lineHeight: 18,
  },
  straplineMarginTop: spacing(2),
  straplineMarginBottom: spacing(3),
  headlineMarginBottom: spacing(2),
  bylineMarginBottom: spacing(3),
};

const sharedPortraitStyles = {
  container: {
    paddingBottom: 0,
    flex: 1,
    flexDirection: "column",
  },
  bylineMarginBottom: 0,
  summary: {
    ...summary,
    fontSize: 14,
    lineHeight: 18,
  },
};

const portrait834 = {
  ...sharedPortraitStyles,
  headline: {
    paddingTop: spacing(2),
    ...headline,
  },
  imageContainer: {
    width: "100%",
  },
  strapline: {
    ...strapline,
  },
};

const styles = {
  landscape: {
    "1024": {
      ...sharedLandscapeStyles,
      headline: {
        ...headline,
        fontSize: 40,
        lineHeight: 40,
      },
      strapline: {
        ...strapline,
        fontSize: 24,
        lineHeight: 24,
      },
    },
    "1080": {
      ...sharedLandscapeStyles,
      headline: {
        ...headline,
        fontSize: 45,
        lineHeight: 45,
      },
      strapline: {
        ...strapline,
        fontSize: 24,
        lineHeight: 24,
      },
    },
    "1194": {
      ...sharedLandscapeStyles,
      headlineMarginBottom: spacing(1),
      headline: {
        ...headline,
        fontSize: 50,
        lineHeight: 50,
      },
      strapline: {
        ...strapline,
        fontSize: 24,
        lineHeight: 24,
      },
    },
    "1133": {
      ...sharedLandscapeStyles,
      headline: {
        ...headline,
        fontSize: 45,
        lineHeight: 45,
      },
      strapline: {
        ...strapline,
        fontSize: 24,
        lineHeight: 24,
      },
    },
    "1366": {
      ...sharedLandscapeStyles,
      imageContainer: {
        width: "100%",
      },
      headline: {
        ...headline,
        fontSize: 55,
        lineHeight: 55,
        paddingTop: spacing(2),
      },
      strapline: {
        ...strapline,
        fontSize: 26,
        lineHeight: 26,
      },
    },
  },
  portrait: {
    "744": {
      ...sharedPortraitStyles,
      headline: {
        ...headline,
        fontSize: 45,
        lineHeight: 45,
        paddingTop: spacing(2),
      },
      imageContainer: {
        width: "100%",
      },
      strapline: {
        ...strapline,
        fontSize: 24,
        lineHeight: 24,
      },
      headlineMarginBottom: spacing(4),
      straplineMarginTop: spacing(1),
      straplineMarginBottom: spacing(3),
    },
    "768": {
      ...sharedPortraitStyles,
      headline: {
        ...headline,
        fontSize: 42,
        lineHeight: 42,
        paddingTop: spacing(1),
      },
      imageContainer: {
        width: "100%",
      },
      strapline: {
        ...strapline,
        fontSize: 24,
        lineHeight: 24,
      },
      headlineMarginBottom: spacing(4),
      straplineMarginTop: spacing(1),
      straplineMarginBottom: spacing(2),
    },
    "810": {
      ...sharedPortraitStyles,
      headline: {
        ...headline,
        fontSize: 45,
        lineHeight: 45,
        paddingTop: spacing(2),
      },
      imageContainer: {
        width: "100%",
      },
      strapline: {
        ...strapline,
        fontSize: 24,
        lineHeight: 24,
      },
      headlineMarginBottom: spacing(4),
      straplineMarginTop: spacing(1),
      straplineMarginBottom: spacing(3),
    },
    "834": {
      ratios: {
        0: {
          ...portrait834,
          headlineMarginBottom: spacing(4),
          straplineMarginTop: spacing(2),
          straplineMarginBottom: spacing(3),
          headline: {
            ...portrait834.headline,
            fontSize: 50,
            lineHeight: 50,
          },
          strapline: {
            ...portrait834.strapline,
            fontSize: 26,
            lineHeight: 26,
          },
        },
        0.75: {
          ...portrait834,
          headlineMarginBottom: spacing(4),
          straplineMarginTop: spacing(2),
          straplineMarginBottom: spacing(3),
          headline: {
            ...portrait834.headline,
            fontSize: 45,
            lineHeight: 45,
          },
          strapline: {
            ...portrait834.strapline,
            fontSize: 24,
            lineHeight: 24,
          },
        },
      },
    },
    "1024": {
      ...sharedPortraitStyles,
      headline: {
        ...headline,
        fontSize: 55,
        lineHeight: 55,
        paddingTop: spacing(2),
      },
      imageContainer: {
        width: "100%",
      },
      strapline: {
        ...strapline,
        fontSize: 30,
        lineHeight: 30,
      },
      headlineMarginBottom: spacing(4),
      straplineMarginTop: spacing(1),
      straplineMarginBottom: spacing(5),
      summary: {
        ...summary,
        fontSize: 15,
        lineHeight: 18,
      },
    },
  },
};

export const getStyle = (orientation, windowWidth, windowHeight) =>
  getStyleByDeviceSize(styles[orientation], windowWidth, windowHeight);
