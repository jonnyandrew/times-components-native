const path = require("path");

module.exports = (async () => {
  const root = path.resolve(__dirname, "../");
  return {
    resolver: {
      providesModuleNodeModules: ["react-native"],
      resolverMainFields: ["react-native", "dev", "browser", "main"],
      sourceExts: ["tsx", "ts", "js", "gql", "graphql"],
      blacklistRE: /(.*\/__fixtures__\/.*|node_modules[\/\\]react[\/\\]dist[\/\\].*|website\/node_modules\/.*|heapCapture\/bundle\.js|.*\/__tests__\/.*)$/,
    },
    transformer: {
      babelTransformerPath: require.resolve(
        "@bam.tech/react-native-graphql-transformer",
      ),
    },
    serializer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
      getModulesRunBeforeMainModule: () => [
        path.join(
          root,
          "node_modules/react-native/Libraries/Core/InitializeCore.js",
        ),
      ],
      getPolyfills: require(path.join(
        root,
        "node_modules/react-native/rn-get-polyfills",
      )),
    },
    server: {},
    projectRoot: root,
    watchFolders: [root, path.join(root, "node_modules")],
  };
})();
