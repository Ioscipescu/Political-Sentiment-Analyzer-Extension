chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

const extensions = "https://developer.chrome.com/docs/extensions";
const webstore = "https://developer.chrome.com/docs/webstore";

chrome.webNavigation.onCompleted.addListener((tab) => {
    if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
        chrome.action.setBadgeText({
            text: "ON",
        });
        // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
        chrome.notifications.create("Left Leaning Notification", {
            type: "basic",
            iconUrl: chrome.runtime.getURL("images/logo-small.png"),
            title: "Left Leaning Source Detected",
            message:
                "The source that you are using has been detected to be heavily left leaning with a confidence of _____%",
            priority: 2,
        });
    }
});
