import { StatusBar } from '@capacitor/status-bar'
import { NavigationBar } from '@capgo/capacitor-navigation-bar'

export function updateColors(color: string) {
  StatusBar.setBackgroundColor({ color })
  NavigationBar.setNavigationBarColor({ color })
}
