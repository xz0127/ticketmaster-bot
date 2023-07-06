/**
 * @author Xin Zhe <xinzhe0127@gmail.com>
 * @version 0.1
 * @description A simple script that refreshes the ticket master event detail page till tickets are availble for sale and automates the process of choosing session. This script is adapted based on https://github.com/spikeruk/TicketmasterBot/blob/master/ticketmasterbot.user.js
 *
 */

// refresh the ticket master event detail page till tickets are availble for sale
function checkForGeneralAdmission() {
  isLocked = true;
  var path = "/html/body/div[2]/div[1]/section[2]/div/div/div[2]/a";
  while (isLocked) {
    var buy_button = getElementByXpath(path);
    if (buy_button == undefined || buy_button == null) {
      console.log(buy_button);
      sleep(2000);
      reload();
    } else {
      buy_button.click();
      break;
    }
  }
}

// sleep for a certain period of time
function sleep(ms) {
  var unixtime_ms = new Date().getTime();
  while (new Date().getTime() < unixtime_ms + ms) {}
}

// refresh the page
function reload() {
  window.top.document.location.replace(window.top.document.location.href);
}

// click the "Find Tickets" button on specific session based on user input
function getEventSession(order) {
  var path =
    "/html/body/div[2]/div[1]/div/section[1]/div/div/div/div/div/div/div[2]/div/div[2]/div/div/div/table/tbody/tr[" +
    order +
    "]/td[4]/a";
  var find_ticket_btn = getElementByXpath(path);
  console.log(find_ticket_btn);
  find_ticket_btn.click();
}

// retrieve element by full Xpath. You may obtain the Xpath of a particular element through inspection tools
function getElementByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

$(document).ready(function () {
  checkForGeneralAdmission();
  // todo: modify the session input here
  getEventSession(4);
});
