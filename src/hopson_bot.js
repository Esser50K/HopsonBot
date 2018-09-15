const Discord         = require("discord.js");
const Config          = require("../data/config.json");

const MessageSentHandler    = require("./events/message_sent_handler");
const MessageModifyHandler  = require("./events/message_mod_handler");

module.exports = class HopsonBot {
    constructor(client) {
        this.client = client;
        this.messageSentHandler = new MessageSentHandler();
    }

    runBot() {
        //Event for when the bot starts
        this.client.on("ready", () => {
            console.log("Client has logged in to server");
            this.client.user.setPresence({game: {name : "Type >help"}})
                .then(console.log)
                .catch(console.error);
        });

        //Event for when bot is dissconnected
        this.client.on("disconnect", (event) => {
            console.log(`Client has closed with status code ${event.code} and reason ${event.reason}`)
        });  

        //Event for messages sent to any of the discord channels
        this.client.on("message", (message) => {
            this.messageSentHandler.handleMessageSent(message, this.client);
        });

        //Event for a message delete
        this.client.on("messageDelete", (message) => {
            console.log("Message deleted");
            MessageModifyHandler.handleMessageDelete(
                this.client, 
                message
            );
        });
        
        //Event for a message edit
        this.client.on("messageUpdate", (oldMessage, newMessage) => {
            MessageModifyHandler.handleMessageDelete(
                this.client, 
                oldMessage, 
                newMessage
            );
        });

        //Event for people joining the server
        this.client.on("guildMemberAdd", (member) => {
           // MemberJoin.handleJoin(member);
        });

        //Event for a user update (eg changing their usernem)
        this.client.on("userUpdate", (oldUser, newUser) => {
            //this.handleUserUpdate(oldUser, newUser);
        });
    }
}