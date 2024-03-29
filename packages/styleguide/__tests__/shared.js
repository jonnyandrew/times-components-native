import { Text } from "react-native";
import React from "react";
import TestRenderer from "react-test-renderer";
import { iterator } from "@times-components-native/test-utils";
import styleguide, { Animations, scales } from "../src/styleguide";
import themeFactory from "../src/theme/theme-factory";
const {
  addSerializers,
  minimalNative,
} = require("@times-components-native/jest-serializer");

addSerializers(expect, minimalNative);

const tests = [
  {
    name: "Font factory default scale",
    test: () => {
      const testInstance = styleguide().fontFactory({
        font: "body",
        fontSize: "secondary",
      });
      expect(testInstance).toMatchSnapshot();
    },
  },
  {
    name: "Font factory large scale",
    test: () => {
      const testInstance = styleguide({ scale: scales.large }).fontFactory({
        font: "body",
        fontSize: "secondary",
      });
      expect(testInstance).toMatchSnapshot();
    },
  },
  {
    name: "Font factory xlarge scale",
    test: () => {
      const testInstance = styleguide({ scale: scales.xlarge }).fontFactory({
        font: "body",
        fontSize: "secondary",
      });
      expect(testInstance).toMatchSnapshot();
    },
  },
  {
    name: "Animations should have a FadeIn animation wrapper component",
    test: () => {
      const testInstance = TestRenderer.create(
        <Animations.FadeIn>
          <Text>Hello World</Text>
        </Animations.FadeIn>,
      );

      expect(testInstance.toJSON()).toMatchSnapshot();
    },
  },
  // Non snapshot tests
  {
    name:
      "Font factory should throw a a TypeError if no font or font size are provided",
    test: () => {
      expect(() => styleguide().fontFactory()).toThrow(TypeError);
    },
  },
  {
    name:
      "Font factory should throw a TypeError if no font or font size are not correctly referenced",
    test: () => {
      expect(() =>
        styleguide().fontFactory({
          font: "comicSans",
          fontSize: "massive",
        }),
      ).toThrow(TypeError);
    },
  },
  {
    name:
      "Line height factory should throw a TypeError if no font or font size are provided",
    test: () => {
      expect(() => styleguide().lineHeights()).toThrow(TypeError);
    },
  },
  {
    name:
      "Line height factory should throw a TypeError if no font or font size are not correctly referenced",
    test: () => {
      expect(() =>
        styleguide().lineHeights({
          font: "comicSans",
          fontSize: "massive",
        }),
      ).toThrow(TypeError);
    },
  },
  {
    name: "Theme Factory - DropCapFont should return the correct font",
    test: () => {
      expect(themeFactory("default", "indepth").dropCapFont).toEqual("dropCap");
      expect(themeFactory("default", "maincomment").dropCapFont).toEqual(
        "dropCap",
      );
      expect(themeFactory("culture", "indepth").dropCapFont).toEqual(
        "cultureMagazine",
      );
      expect(themeFactory("style", "indepth").dropCapFont).toEqual(
        "styleMagazine",
      );
      expect(
        themeFactory("thesundaytimesmagazine", "magazinestandard").dropCapFont,
      ).toEqual("stMagazine");
      expect(
        themeFactory("thesundaytimesmagazine", "mainstandard").dropCapFont,
      ).toEqual("dropCap");
      expect(themeFactory("thesundaytimesmagazine", null).dropCapFont).toEqual(
        "dropCap",
      );
      expect(themeFactory().dropCapFont).toEqual("dropCap");
      expect(
        themeFactory("the sunday times magazine", "indepth").dropCapFont,
      ).toEqual("stMagazine");
    },
  },
  {
    name: "Theme Factory - HeadlineFont should return the correct font",
    test: () => {
      expect(themeFactory("default", "indepth").headlineFont).toEqual(
        "headline",
      );
      expect(themeFactory("default", "maincomment").headlineFont).toEqual(
        "headline",
      );
      expect(themeFactory("culture", "indepth").headlineFont).toEqual(
        "cultureMagazine",
      );
      expect(themeFactory("style", "indepth").headlineFont).toEqual(
        "styleMagazine",
      );
      expect(
        themeFactory("thesundaytimesmagazine", "magazinestandard").headlineFont,
      ).toEqual("stMagazine");
      expect(
        themeFactory("thesundaytimesmagazine", "mainstandard").headlineFont,
      ).toEqual("headline");
      expect(themeFactory("thesundaytimesmagazine", null).headlineFont).toEqual(
        "headline",
      );
      expect(
        themeFactory("the sunday times magazine", "indepth").headlineFont,
      ).toEqual("stMagazine");
    },
  },
  {
    name: "Theme Factory - pullQuoteFont should return the correct font",
    test: () => {
      expect(themeFactory("default", "indepth").pullQuoteFont).toEqual(
        "headlineRegular",
      );
      expect(themeFactory("default", "maincomment").pullQuoteFont).toEqual(
        "headlineRegular",
      );
      expect(themeFactory("culture", "indepth").pullQuoteFont).toEqual(
        "cultureMagazine",
      );
      expect(themeFactory("style", "indepth").pullQuoteFont).toEqual(
        "styleMagazine",
      );
      expect(
        themeFactory("thesundaytimesmagazine", "magazinestandard")
          .pullQuoteFont,
      ).toEqual("stMagazine");
      expect(
        themeFactory("thesundaytimesmagazine", "mainstandard").pullQuoteFont,
      ).toEqual("headlineRegular");
      expect(
        themeFactory("thesundaytimesmagazine", null).pullQuoteFont,
      ).toEqual("headlineRegular");
      expect(
        themeFactory("the sunday times magazine", "indepth").pullQuoteFont,
      ).toEqual("stMagazine");
    },
  },
  {
    name:
      "Theme Factory - sectionColour should return the correct section with colours",
    test: () => {
      expect(themeFactory("default", "indepth").sectionColour).toEqual(
        undefined,
      );
      expect(themeFactory("default", "maincomment").sectionColour).toEqual(
        "#1D1D1B",
      );
      expect(themeFactory("news", "mainstandard").sectionColour).toEqual(
        "#13354E",
      );
      expect(themeFactory("news", null).sectionColour).toEqual("#13354E");
      expect(
        themeFactory("business", "magazinestandard").sectionColour,
      ).toEqual("#005B8D");
      expect(themeFactory().sectionColour).toEqual("#1D1D1B");
    },
  },
  {
    name:
      "Theme Factory - headlineCase should return the correct headline case",
    test: () => {
      expect(themeFactory("default", "indepth").headlineCase).toEqual(null);
      expect(themeFactory("style", "indepth").headlineCase).toEqual(
        "uppercase",
      );
      expect(themeFactory("style", "mainstandard").headlineCase).toEqual(null);
      expect(themeFactory("style", null).headlineCase).toEqual(null);
    },
  },
];

export default () =>
  describe("", () => {
    beforeAll(() => jest.useFakeTimers());
    afterAll(() => jest.useRealTimers());

    iterator(tests);
  });
