// Listen for tab changes
browser.tabs.onActivated.addListener((tabId) => {
  runCheck(tabId.tabId);
});

// Listen for tab updates (i.e. navigating to a new URL)
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.status === "complete") {
        runCheck(tabId);
    }
}, {properties: ["status"]});

/**
 * Run the check on the tab with the given ID
 * @param {integer} tabId 
 */
function runCheck(tabId) {
    browser.tabs.get(tabId).then((tab) => {
        checkTab(tab).then((result) => {
            // If the tab is a scam, inject the warning script
            if (result) {
                browser.tabs.executeScript(tabId, {
                    file: "warning.js"
                });
            }
        });
    });
}

// Listen for messages from the warning.js script in order to close the tab after a warning
browser.runtime.onMessage.addListener((message) => {
    if (message.action === "closeTab") {
        browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
            browser.tabs.remove(tabs[0].id);
        });
    }
});