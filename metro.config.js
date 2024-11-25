const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated");

const config = getDefaultConfig(__dirname);

// Wrap the config with Reanimated's configuration
const reanimatedConfig = wrapWithReanimatedMetroConfig(config);

// Add NativeWind configuration
module.exports = withNativeWind(reanimatedConfig, { input: "./global.css" });
