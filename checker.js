/**
 * Check if the given tab is a scam website
 * @param {Tab} tab to check
 * @returns resolve to true if the tab is a scam, false otherwise
 */
function checkTab(tab) {
    return new Promise((resolve, reject) =>  {
        resolve(false);
        // TODO: 
        // 1. Check if the URL corresponds to a known scam website -> database check
        //  a. If yes, return the check as true
        // 2. Try to findout if the page is trying to pose as a Steam login page -> keywords, forms, etc.
        //  a. If yes, return the check as true and add the URL to the database
        //  b. If no, return the check as false
    });
}