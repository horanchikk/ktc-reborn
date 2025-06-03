import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'app.hapticx.procollege',
  appName: 'ProCollege',
  webDir: '.output/public',
  zoomEnabled: false,
  backgroundColor: '#323232',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#323232",
      showSpinner: true,
      androidSpinnerStyle: "small",
      iosSpinnerStyle: "small",
      spinnerColor: "#212121",
      splashFullScreen: true,
      splashImmersive: true,
    },
  },

}

export default config
