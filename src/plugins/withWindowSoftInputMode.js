const { withAndroidManifest } = require('@expo/config-plugins');

const withWindowSoftInputMode = (config, mode = 'adjustPan') => {
  return withAndroidManifest(config, (config) => {
    const androidManifest = config.modResults;
    const mainActivity = androidManifest.manifest.application[0].activity.find(
      (activity) => activity.$['android:name'] === '.MainActivity'
    );

    if (mainActivity) {
      mainActivity.$['android:windowSoftInputMode'] = mode;
    }

    return config;
  });
};

module.exports = withWindowSoftInputMode;
