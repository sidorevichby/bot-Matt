var token = "908022839:AAEdPzMwOIRUcrOH9xcxwc8BPrS9gVw17w8";
var telegramUrl = "https://api.telegram.org/bot" + token;

function getWebhookInfo() {
    var url = telegramUrl + "/getWebhookInfo";
    var response = UrlFetchApp.fetch(url);
    Logger.log(response);
    }