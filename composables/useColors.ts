import { StatusBar, Style } from '@capacitor/status-bar'
import { NavigationBar } from '@capgo/capacitor-navigation-bar'
import { Capacitor } from '@capacitor/core'

export function updateColors(color: string) {
  const log = useLogger('useColors');

  if (Capacitor.getPlatform() === 'android') {
    StatusBar.setStyle({
      style: Style.Dark
    })
    StatusBar.setBackgroundColor({ color }).catch(e => log.error(e))
    NavigationBar.setNavigationBarColor({ color }).catch(e => log.error(e))
  }
}
