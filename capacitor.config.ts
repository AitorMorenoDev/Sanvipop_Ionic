import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'es.amorenoiborra.sanvipop',
  appName: 'SanvipopIonic',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
