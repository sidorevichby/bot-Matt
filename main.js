var token = "5198418372:AAGXPJTVyeaW8mOligKKXvXyH7qxADgjR7Q";
var telegramUrl = "https://api.telegram.org/bot" + token;
var webAppUrl = "https://script.google.com/macros/s/AKfycbyjZaBpXiiN-vVRriqVpwXS9rpTHbgLWMH_E_oP0Q/exec";
var loginTb = "@floppi1_bot";

//=========================================================================================================================================//

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}


function doPost(e) {
  var src = 'Лист1';
  var sourceSheet = SpreadsheetApp.openById('1fkbZuv_8uvLthSo0TVtOAmfvzbiEoH5yW8WIp71utAU').getSheetByName(src);
  var whatDo = SpreadsheetApp.openById('1fkbZuv_8uvLthSo0TVtOAmfvzbiEoH5yW8WIp71utAU').getSheetByName('Лист17').getRange(2,1);

  var contents = JSON.parse(e.postData.contents);

  sourceSheet.getRange("C1").setValue(e.postData.contents);

  if("callback_query" in contents)
  {
  var text = contents.callback_query.data;
  var message = contents.callback_query.message;
  if(!loginTb.includes(message.from.username)){
    return;
  }
  } else {
    var message = contents.message;
    var text = contents.message.text;
    if(message.chat.type != "private" && !text.toString().includes(loginTb)){
    return;
    }
  }

  

  /*
  sourceSheet.getRange("C4").setValue(contents.callback_query);
  {
  var message = contents.message;
  var forspy = SpreadsheetApp.openById('1fkbZuv_8uvLthSo0TVtOAmfvzbiEoH5yW8WIp71utAU').getSheetByName("spy");
  var spyData = [loginTb,message.chat.id,message.from.first_name,message.from.username,message.text,"&" + Utilities.formatDate(new Date(), "GMT+3", "dd.MM.yyyy HH:mm")];
  forspy.appendRow(spyData);
  } 



  sourceSheet.getRange("C1").setValue(e.postData.contents);
  sourceSheet.getRange("C2").setValue(contents.message.entities);  
  sourceSheet.getRange("C3").setValue(contents.message.reply_to_message);
    */

//  if(whatDo.getValue().toString()=="/addtask"){
//    return checkAnswer(id,text);
//  }

  if(text.toString().includes(' /') || text.toString()[0] == '/')
  {
    switch(separateCommand(text.toString())){
      case "/getdate":
        text = Utilities.formatDate(new Date(),"GMT+3", "dd.MM.yyyy HH:mm");
        break;
      case "/getmyid":
        text = "Your ID :" + message.chat.id;
        break;
      case "/answer":
        checkAnswer(id,text);
        break;
      case "/test":
        text = "Currently not use";
        //text = 
        //return getExchange(id);
        //sourceSheet.getRange("C3").setValue(e.postData.contents.message.text);
        break;
      default:
        text = "Wrong command! Try again.";
    }     
  }
  else
    {
      text = "Привет "+ contents.message.from.first_name + "!";
      //text = contents.messages.getMessages
    }
  return sendMessage(message.chat.id, text); 
  //return HtmlService.createHtmlOutput();
}

//=========================================================================================================================================//

function sendMessage(id, text) {
  var buttons = JSON.stringify({"inline_keyboard": [[{"text":"Get my id","callback_data":"/getmyid"},{"text":"Get date","callback_data":"/getdate"}]]});

  var data = {
    muteHttpExceptions: true,
    method: "POST",
    payload: {
      method: "sendMessage",
      chat_id: String(id),
      text: text,
      parse_mode: "HTML",
      reply_markup: buttons
    }    
  };
  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}

//=========================================================================================================================================//

function finder(){
  var text = "Hi! I`m here!";
  sendMessage(-782659375, text); //436618259, text);
}

//=========================================================================================================================================//

function separateCommand(str){
    var command = str.substr(str.indexOf('/'));
    if(command.includes(' ') || command.includes(loginTb))
    {
      command = command.split(' ')[0];
      command = command.split(loginTb)[0];
    }
    return command;
}

//=========================================================================================================================================//

function getExchange(id){
  var src = 'Лист16';
  var db_answ = SpreadsheetApp.openById('1fkbZuv_8uvLthSo0TVtOAmfvzbiEoH5yW8WIp71utAU').getSheetByName('Лист17');
  var sourceSheet = SpreadsheetApp.openById('1fkbZuv_8uvLthSo0TVtOAmfvzbiEoH5yW8WIp71utAU').getSheetByName(src);
  var rndrow = getRandomInt(1,sourceSheet.getLastRow());
  var answ = sourceSheet.getRange(rndrow,1).getValue() + '-' + 
              sourceSheet.getRange(rndrow,2).getValue() + '-' + 
              sourceSheet.getRange(rndrow,3).getValue() + '-' + 
              sourceSheet.getRange(rndrow,4).getValue();
  db_answ.getRange(1,1).setValue(answ);
  db_answ.getRange(2,1).setValue("/addtask");
  var rndcollum = getRandomInt(1,sourceSheet.getLastColumn());
  
  sendMessage(id, "Введите три формы неправильного глагола и перевод через '-' без пробелов:\n"+ sourceSheet.getRange(rndrow,rndcollum).getValue() + "\n\n/answer - получить ответ") //rndrow + ":" + rndcollum

}

function checkAnswer(id,text){
  var answ = SpreadsheetApp.openById('1fkbZuv_8uvLthSo0TVtOAmfvzbiEoH5yW8WIp71utAU').getSheetByName('Лист17').getRange(1,1).getValue();
  var infinitive = answ.split('-')[0];
  var pSimple = answ.split('-')[1];
  var pParticiple = answ.split('-')[2];
  var translate = answ.split('-')[3];

  if(text!="/answer"){
  var a_infinitive = text.split('-')[0];
  var a_pSimple = text.split('-')[1];
  var a_pParticiple = text.split('-')[2];
  var a_translate = text.split('-')[3];

  if(infinitive.toLowerCase().includes(a_infinitive.toLowerCase()) &&
      pSimple.toLowerCase().includes(a_pSimple.toLowerCase()) &&
      pParticiple.toLowerCase().includes(a_pParticiple.toLowerCase()) &&
      translate.toLowerCase().includes(a_translate.toLowerCase())
      )
      {
        sendMessage(id,"Все верно!");
      } else {
        sendMessage(id,"Возможно что-то написано с ошибкой, проверьте:\n" + "Infinitive - \t" + infinitive + ";\nPast Simple - \t" + pSimple + ";\nPast Participle - \t" + pParticiple + ";\nПеревод - \t" + translate + ".");
      }
  } else {
    sendMessage(id,"Infinitive - \t" + infinitive + ";\nPast Simple - \t" + pSimple + ";\nPast Participle - \t" + pParticiple + ";\nПеревод - \t" + translate + ".");
  }
  SpreadsheetApp.openById('1fkbZuv_8uvLthSo0TVtOAmfvzbiEoH5yW8WIp71utAU').getSheetByName('Лист17').getRange(2,1).setValue('');
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * max+min);
}










