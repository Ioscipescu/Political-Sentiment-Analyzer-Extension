const myImage = new Image(357, 267);
myImage.src = chrome.runtime.getURL("images/logo-small.png");
document.body.appendChild(myImage);
