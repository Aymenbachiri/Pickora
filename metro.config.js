const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// Get the default config
const config = getDefaultConfig(__dirname);

// Modify the config for Reanimated
config.resolver.sourceExts.push("mjs");

// Add NativeWind configuration
module.exports = withNativeWind(config, { input: "./global.css" });
