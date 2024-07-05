import { loadOptions, watchOptions } from '@models/options/data-store';

async function main() {
  watchOptions(async (options) => {
    await chrome.sidePanel.setPanelBehavior({
      openPanelOnActionClick: options.useSidePanel,
    });
  });
  const useSidePanel = (await loadOptions()).useSidePanel;
  await chrome.sidePanel.setPanelBehavior({
    openPanelOnActionClick: useSidePanel,
  });
}

main();
