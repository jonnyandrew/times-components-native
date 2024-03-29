jest.mock("react-native", () => {
  const rn = jest.requireActual("react-native");
  rn.NativeModules.ArticleEvents = {
    onArticleLoaded: jest.fn(),
  };
  rn.NativeModules.ReactAnalytics = { track: jest.fn() };
  rn.NativeModules.SectionEvents = {
    onSectionLoaded: jest.fn(),
  };
  return rn;
});
