﻿"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
    document.getElementById("txtUserInput").value = "";
    document.getElementById("txtMessageInput").value = "";
});

//connection.on("ReceiveMessage", function (message) {
//    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
//    var encodedMsg = msg;
//    var li = document.createElement("li");
//    li.textContent = encodedMsg;
//    document.getElementById("messagesList").appendChild(li);
//});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("txtUserInput").value;
    var message = document.getElementById("txtMessageInput").value;

    connection.invoke("SendMessagge", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    //connection.invoke("SendMessageToGroup", message).catch(function (err) {
    //    return console.error(err.toString());
    //});
    event.preventDefault();
});
