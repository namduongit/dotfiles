let scriptActive = false;

chrome.action.onClicked.addListener((tab) => {
  toggleScript(tab);
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-extension") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      toggleScript(tabs[0]);
    });
  }
});

function toggleScript(tab) {
  if (scriptActive) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: unloadScript,
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    });
  }
  scriptActive = !scriptActive;
}

function unloadScript() {
  document.dispatchEvent(new CustomEvent("unloadScript"));
}
