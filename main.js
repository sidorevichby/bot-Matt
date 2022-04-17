

//=========================================================================================================================================//

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}


function doPost(e) {
  var contents = JSON.parse(e.postData.contents);

  
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
    }
  return sendMessage(message.chat.id, text); 
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







