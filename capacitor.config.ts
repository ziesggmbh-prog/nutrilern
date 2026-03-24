import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'de.ziesggmbh.nutrilern',
  appName: 'NutriLern',
  webDir: 'dist/public',
  server: {
    androidScheme: 'https'
  },
  android: {
    backgroundColor: '#131d2e'
  }
};

export default config;
