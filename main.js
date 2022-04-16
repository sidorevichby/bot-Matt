
var telegramUrl = "https://api.telegram.org/bot" + token;

function getWebhookInfo() {
    var url = telegramUrl + "/getWebhookInfo";
    var response = UrlFetchApp.fetch(url);
    Logger.log(response);
    }