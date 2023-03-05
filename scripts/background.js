// chrome.runtime.onInstalled.addListener(() => {
//     chrome.action.setBadgeText({
//         text: "OFF",
//     });
// });

// const extensions = "https://developer.chrome.com/docs/extensions";
// const webstore = "https://developer.chrome.com/docs/webstore";

chrome.webNavigation.onCompleted.addListener((tab) => {
  // if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
  if (
    tab.url.startsWith("https://www.nytimes.com/") ||
    tab.url.startsWith("https://www.cnn.com/") ||
    tab.url.startsWith("https://www.palmerreport.com/")
  ) {
    // chrome.action.setBadgeText({
    //     text: "ON",
    // });
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    chrome.notifications.create("Left Leaning Notification", {
      type: "basic",
      iconUrl: chrome.runtime.getURL("images/logo-small.png"),
      title: "Left Leaning Source Detected",
      message:
        "The source that you are using has been detected to contain liberal leaning terminology, remember to look at both sides of any issue before making decisions.",
      priority: 2,
    });
  }
  if (
    tab.url.startsWith("https://www.foxnews.com/") ||
    tab.url.startsWith("https://www.dailywire.com/") ||
    tab.url.startsWith("https://www.dailysignal.com/")
  ) {
    // chrome.action.setBadgeText({
    //     text: "ON",
    // });
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    chrome.notifications.create("Right Leaning Notification", {
      type: "basic",
      iconUrl: chrome.runtime.getURL("images/logo-small.png"),
      title: "Right Leaning Source Detected",
      message:
        "The source that you are using has been detected to contain republican leaning terminology, remember to look at both sides of any issue before making decisions.",
      priority: 2,
    });
  }
});
