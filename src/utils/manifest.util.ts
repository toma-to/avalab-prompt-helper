export type ManifestInfo = {
  appName: string;
  version: string;
  iconUrl: string;
};

export const getManifestInfo = (): ManifestInfo => {
  const man = chrome.runtime?.getManifest();
  const iconUrl =
    (man?.icons ? man.icons[128] : undefined) ?? '/src/public/icon/icon128.png';
  return {
    appName: man?.name ?? 'Avalab.aiプロンプト入力支援ツール',
    version: man?.version ?? '1.0',
    iconUrl,
  };
};
