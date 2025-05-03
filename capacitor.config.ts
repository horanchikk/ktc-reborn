import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'app.hapticx.procollege',
  appName: 'ProCollege',
  webDir: '.output/public',
  zoomEnabled: false,
  backgroundColor: '#323232',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#323232",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
  },

}

export default config
