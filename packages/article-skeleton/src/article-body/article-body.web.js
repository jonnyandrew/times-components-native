import React from "react";
import PropTypes from "prop-types";
import Ad from "@times-components/ad";
import LazyLoad from "@times-components/lazy-load";
import ArticleImage from "@times-components/article-image";
import ArticleParagraph, {
  DropCapView
} from "@times-components/article-paragraph";
import Context from "@times-components/context";
import InteractiveWrapper from "@times-components/interactive-wrapper";
import KeyFacts from "@times-components/key-facts";
import coreRenderers from "@times-components/markup";
import PullQuote from "@times-components/pull-quote";
import { colours, spacing } from "@times-components/styleguide";
import Video from "@times-components/video";
import renderTrees from "@times-components/markup-forest";
import { AspectRatioContainer } from "@times-components/utils";
import ArticleLink from "./article-link";
import InsetCaption from "./inset-caption";
import {
  PrimaryImg,
  SecondaryImg,
  InlineImg,
  FullWidthImg,
  InteractiveContainer,
  PullQuoteContainer,
  PullQuoteResp
} from "../styles/article-body/responsive";
import styles from "../styles/article-body";

export const responsiveDisplayWrapper = displayType => {
  switch (displayType) {
    case "secondary":
      return SecondaryImg;
    case "inline":
      return InlineImg;
    case "fullwidth":
      return FullWidthImg;
    default:
      return PrimaryImg;
  }
};

const renderers = ({ paidContentClassName }) => ({
  ...coreRenderers,
  ad(key, attributes) {
    return (
      <Ad key={key} slotName="inline-ad" style={styles.ad} {...attributes} />
    );
  },
  dropCap(key, attrs, children) {
    return (
      <Context.Consumer key={key}>
        {({
          theme: { dropCapFont, sectionColour = colours.section.default }
        }) => (
          <DropCapView colour={sectionColour} font={dropCapFont}>
            {children}
          </DropCapView>
        )}
      </Context.Consumer>
    );
  },
  image(key, { display, ratio, url, caption, credits }) {
    const MediaWrapper = responsiveDisplayWrapper(display);
    return (
      <LazyLoad key={key} rootMargin={spacing(15)} threshold={0.5}>
        {({ observed, registerNode }) => (
          <div id={key} ref={node => registerNode(node)}>
            <MediaWrapper>
              <ArticleImage
                captionOptions={{
                  caption,
                  credits
                }}
                imageOptions={{
                  display,
                  highResSize: observed.get(key)
                    ? observed.get(key).clientWidth
                    : null,
                  lowResSize: 100,
                  ratio,
                  uri: url
                }}
              />
            </MediaWrapper>
          </div>
        )}
      </LazyLoad>
    );
  },
  interactive(key, { url, element, display }) {
    const { attributes, value } = element;
    return (
      <InteractiveContainer key={key} fullWidth={display === "fullwidth"}>
        <InteractiveWrapper
          attributes={attributes}
          element={value}
          key={key}
          source={url}
        />
      </InteractiveContainer>
    );
  },
  keyFacts(key, attributes, renderedChildren, indx, node) {
    return <KeyFacts ast={node} key={key} />;
  },
  link(key, attributes, children) {
    const { href, target, dropCap } = attributes;

    return (
      <ArticleLink dropCap={dropCap} key={key} target={target} url={href}>
        {children}
      </ArticleLink>
    );
  },
  paragraph(key, attributes, children) {
    return <ArticleParagraph key={key}>{children}</ArticleParagraph>;
  },
  paywall(key, attributes, children) {
    return (
      <span className={paidContentClassName} key={key}>
        {children}
      </span>
    );
  },
  pullQuote(
    key,
    {
      caption: { name, text, twitter }
    },
    children
  ) {
    return (
      <Context.Consumer key={key}>
        {({
          theme: { pullQuoteFont, sectionColour = colours.section.default }
        }) => (
          <PullQuoteContainer>
            <PullQuoteResp>
              <PullQuote
                caption={name}
                font={pullQuoteFont}
                quoteColour={sectionColour}
                text={text}
                twitter={twitter}
              >
                {children}
              </PullQuote>
            </PullQuoteResp>
          </PullQuoteContainer>
        )}
      </Context.Consumer>
    );
  },
  video(
    key,
    {
      id,
      is360,
      brightcovePolicyKey,
      brightcoveVideoId,
      brightcoveAccountId,
      brightcovePlayerId,
      caption,
      posterImageUrl,
      skysports
    }
  ) {
    const MediaWrapper = responsiveDisplayWrapper("primary");
    return (
      <MediaWrapper key={key}>
        <figure style={{ margin: 0 }}>
          <AspectRatioContainer aspectRatio="16:9">
            <Video
              id={id}
              is360={is360}
              accountId={brightcoveAccountId}
              height="100%"
              playerId={brightcovePlayerId}
              policyKey={brightcovePolicyKey}
              poster={{ uri: posterImageUrl }}
              skySports={skysports}
              videoId={brightcoveVideoId}
              width="100%"
            />
          </AspectRatioContainer>
          <figcaption>
            <InsetCaption caption={caption} />
          </figcaption>
        </figure>
      </MediaWrapper>
    );
  }
});

const decorateAd = ({ contextUrl, section }) => element =>
  element.name === "ad"
    ? { ...element, attributes: { ...element.attributes, contextUrl, section } }
    : element;

const ArticleBody = ({
  content: bodyContent,
  contextUrl,
  section,
  paidContentClassName
}) =>
  renderTrees(
    bodyContent.map(decorateAd({ contextUrl, section })),
    renderers({ paidContentClassName })
  );

ArticleBody.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      attributes: PropTypes.object,
      children: PropTypes.arrayOf(PropTypes.object),
      name: PropTypes.string
    })
  ).isRequired,
  contextUrl: PropTypes.string.isRequired,
  paidContentClassName: PropTypes.string,
  section: PropTypes.string
};

export { ArticleLink };
export default ArticleBody;
