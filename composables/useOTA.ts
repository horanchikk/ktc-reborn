import { useSettings } from '~/store/useSettings';
import type { Tota } from '~/types/ota';

export async function useOTA() {
  const { 
    $config: { public: { APP_VERSION } },
    $api
  } = useNuxtApp()
  const { $state: { settings } } = useSettings()
  const log = useLogger('OTA')

  const latestUpdate = ref<Tota>({} as Tota)

  try {
    log.info('Получение обновлений...')
    
    latestUpdate.value = await $api.ota.getVersion(settings.dev)
    
    log.info(`Последняя актуальная версия: ${latestUpdate.value.version}`)
  } catch (e) {
    log.error('Ошибка получения обновлений ', e)
  }
  
  function needsUpdate() {
    if (Object.keys(latestUpdate.value).includes('version')) {
      return [
        latestUpdate.value.version !== APP_VERSION,
        latestUpdate.value.version,
        APP_VERSION,
        latestUpdate.value.apkfile,
      ]
    }
  }

  function parseUpdateLog(text: string) {
    const result = { features: [], bugfixes: [] };
  
    const getSection = (title) =>
      (text.match(new RegExp(`###\\s*${title}([\\s\\S]*?)(?=\\n###\\s*|$)`, 'i')) || [])[1] || '';
  
    const normalize = (line) =>
      line
        .replace(/^\s*[*-]\s*/, '')                     
        .replace(/\*\*/g, '')                           
        .replace(/\s*\([a-f0-9]{7,}\)\s*$/i, '')        
        .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')        
        .trim();
  
    ['Bug Fixes', 'Features'].forEach((title) =>
      getSection(title)
        .split('\n')
        .filter((l) => /^\s*[*-]\s+/.test(l))
        .map(normalize)
        .forEach((item) =>
          title === 'Bug Fixes' ? result.bugfixes.push(item) : result.features.push(item)
        )
    );
  
    return result;
  }

  function getDescription() {
    const data = parseUpdateLog(latestUpdate.value.description)
    log.info('Описание обновления:', data)
    return data;
  }

  return {
    needsUpdate,
    getDescription,
  }
}