/**
 * Check if the given tab is a scam website
 * @param {Tab} tab to check
 * @returns resolve to true if the tab is a scam, false otherwise
 */
function checkTab(tab) {
    return new Promise((resolve, reject) =>  {

        // 1. Check if the URL is the real Steam login page
        let hostname = new URL(tab.url).hostname;
        if (STEAM_HN.includes(hostname)) {
            resolve(false);
            return;
        }

        // 2. Check if the URL is a known scam website using a database. If yes return true 

        // TODO

        // 3. Check if the content of the page looks like a Steam login page

        // Execute the content script in all frames to get the text of the page
        const res = browser.tabs.executeScript(tab.id, { file: "content_text.js", allFrames: true })

        // Check if the text contains the keywords
        res.then((result) => {
            if (!result) {
                return;
            }   
            // Run in each frame
            for (let i = 0; i < result.length; i++) {
                // Count how many keywords are present in the text
                let content = result[i];
                if(!content) {
                    continue;
                }
                let count = 0;
                KEYWORDS.forEach(keyword => {
                    if (content.includes(keyword)) {
                        count++;
                    }
                });

                // Only consider the page as a Steam login page if all keywords are present
                if (count == KEYWORDS.length) {
                    resolve(true);
                    return;
                }
            }
            resolve(false);
        }).catch((error) => {
            console.error("Failed to execute content script: " + error);
        });
    });
}

// Key words that a page must contain to be considered a Steam login page lookalike
const KEYWORDS = [
    "steam",
    "sign in",
    "password",
    "account",
    "store",
    "community",
    "about",
    "support"
]

// List of hostnames that are the real Steam website
const STEAM_HN = ["steamcommunity.com", "store.steampowered.com", "help.steampowered.com"];