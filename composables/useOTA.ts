import { useSettings } from '~/store/useSettings';

export async function useOTA() {
  const { 
    $config: { public: { APP_VERSION } },
    $api
  } = useNuxtApp()
  const { $state: { settings } } = useSettings()
  const log = useLogger('OTA')

  const latestUpdate = await $api.ota.getVersion(settings.dev)
  log.success(`Последняя актуальная версия: ${latestUpdate.version}`)
  
  function needsUpdate() {
    return [
      latestUpdate.version !== APP_VERSION,
      latestUpdate.version,
      APP_VERSION,
      latestUpdate.apkfile,
    ]
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
    const data = parseUpdateLog(latestUpdate.description)
    log.info('Описание обновления:', data)
    return data;
  }

  return {
    needsUpdate,
    getDescription,
  }
}