function getText() {
    return document.body.innerText;
}

function getHTML() {
    return document.body.outerHTML;
}

function getArticleContents() {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(getHTML(), "text/html");
    let articleContent = parseHtml(htmlDoc, "meteredContent"); //NYTimes (left)
    if (articleContent != null) {
        return articleContent;
    }
    articleContent = parseHtml(htmlDoc, "article__content"); //CNN (left)
    if (articleContent != null) {
        return articleContent;
    }
    articleContent = parseHtml(htmlDoc, "article-body"); //Fox News (right)
    if (articleContent != null) {
        return articleContent;
    }
    articleContent = parseHtml(htmlDoc, "post_content__w3pdf"); //Buzzfeed News (left)
    if (articleContent != null) {
        return articleContent;
    }
    articleContent = parseHtml(htmlDoc, "e1nzmkc90 css-15jw47d"); //Daily Wire (right)
    if (articleContent != null) {
        return articleContent;
    }
    articleContent = parseHtml(htmlDoc, "mh-wrapper clearfix"); //News Punch (extreme right)
    if (articleContent != null) {
        return articleContent;
    }
    articleContent = parseHtml(htmlDoc, "tds-content"); //The Daily Signal (right)
    if (articleContent != null) {
        return articleContent;
    }
    articleContent = parseHtml(htmlDoc, "fl-post-content clearfix"); //Palmer Report (extreme left)
    if (articleContent != null) {
        return articleContent;
    }
}

function parseHtml(htmlDoc, text) {
    for (const element of htmlDoc.getElementsByClassName(text)) {
        if (element != null) {
            return element.innerText;
        }
    }
}

function formatText(text) {
    if (text != undefined)
        return text
            .replace(/\s+/g, " ")
            .replace(/[^a-zA-Z0-9"';:!?()-_,. ]/g, "");
}

function sentenceArray(text) {
    if (text != undefined) return text.split(". ");
}

// let logo = document.getElementById("logo");
// logo.src = chrome.runtime.getURL("logo.png");

console.log(formatText(getArticleContents()));
