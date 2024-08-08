// Inject a warning message
if(!document.getElementById("steamlogincheck-warning")) {
    fetch(browser.runtime.getURL("warning/warning.html"))
        .then((response) => response.text())
        .then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            console.log(doc);
            document.body.appendChild(doc.body.firstChild);

            // Add buttons behaviours to close the warning or the tab
            document.getElementById("close-button").addEventListener("click", () => {
                document.getElementById("steamlogincheck-warning").remove();
            });
            document.getElementById('close-tab-button').addEventListener('click', () => {
                browser.runtime.sendMessage({ action: 'closeTab' });
            });
        });
}