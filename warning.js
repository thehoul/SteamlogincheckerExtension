// Inject a warning message
if(!document.getElementById("steamlogincheck-warning")) {
    fetch(browser.runtime.getURL("warning/warning.html"))
        .then((response) => response.text())
        .then((html) => {
            const warning = document.createElement("div");
            warning.id = "steamlogincheck-warning";
            warning.innerHTML = html;
            document.body.appendChild(warning);

            // Add buttons behaviours to close the warning or the tab
            document.getElementById("close-button").addEventListener("click", () => {
                document.getElementById("steamlogincheck-warning").remove();
            });
            document.getElementById('close-tab-button').addEventListener('click', () => {
                browser.runtime.sendMessage({ action: 'closeTab' });
            });
        });
}