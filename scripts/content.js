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

function predict(text) {
    if (text != undefined) {
        return (async () => {
            const onnx = await import("onnx");

            const modelPath = "model.onnx";
            const model = await onnx.load(modelPath);

            const inputIds = tokenizer.encode(text);

            const inputTensor = new onnx.Tensor(
                new Int32Array(inputIds),
                "int32",
                [1, inputIds.length]
            );

            const output = await model.run({ input: inputTensor });
            return output.values().next().value.data;
        })();
    }
}

function generateSentiment(text) {
    if (text != undefined) {
        let array = [];
        for (const sentence of sentenceArray(text)) {
            array.push(predict(sentence));
        }
        let total = 0;
        for (let i of array) {
            total += i;
        }
        return total / array.length;
    }
}

// let logo = document.getElementById("logo");
// logo.src = chrome.runtime.getURL("logo.png");

console.log(generateSentiment(formatText(getArticleContents())));
