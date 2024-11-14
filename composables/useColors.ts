import { StatusBar } from '@capacitor/status-bar'
import { NavigationBar } from '@capgo/capacitor-navigation-bar'
import { Capacitor } from '@capacitor/core'

export function updateColors(color: string) {
  if (Capacitor.getPlatform() === 'android') {
    StatusBar.setBackgroundColor({ color })
    NavigationBar.setNavigationBarColor({ color })
  }
}
