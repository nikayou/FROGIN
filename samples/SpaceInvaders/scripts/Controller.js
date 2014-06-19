function Controller() {
    /**
     * Controller manages Event and commands.  
     * Event have to be registered. 
     * When HTML triggers onkeydown or onkeyup, Controller checks if 
     * the given key has been registered. If so, it will add the Event's 
     * command to its list. This one should be accessed via "getCommands", 
     * and each one should be executed. 
     *
     * Members : 
     * events - all events registered to the Controller (IN).
     * command - all commands to be executed (OUT). 
     */

    // "events" keep registered inputs, those we are interested in
    var events = {};
    // "commands" will receive commands to execute
    var commands = [];

    //    this.scene = null;

    // TODO : consider using a key-value with a boolean as value, telling 
    // that the command should be executed. This would make only one structure.

    // TODO : check if "preventDefault" is necessary for events

    this.init = function(scene) {
	this.scene = scene;
	events = new Object();
    }

    // adds an event to the registered event
    this.registerEvent = function(e) {	
//	var action = e.action;
	events[e.action] = e;
	console.log("registered "+e+"->"+e.action+"("+events[e]);
	console.log("events : "+events[e]);	
	console.log("events["+e+"] -> "+events[e]);
	console.log(events);
    }

    // takes an action, and return the first event triggered by this action
    var getEvent = function(a) {
	showEvents();
	for (e in events) {
	    if (e == a) {
		return events[e];
	    }
	}
	return null;
/*
	for (e in events) {
	    console.log("----------*");
	    console.log("event : "+e);
	    if (e.action == a){
		console.log("found");
		console.log("*----------");
		return events;
	    }
	}
	console.log(a+" not found");
	console.log("----------");
	return null;
*/
    }

    var showEvents = function() {
	console.log("<--EVENTS--");
	for (e in events){
	    console.log(e+"->"+events[e]);
	}
	console.log("--EVENTS-->");
    }

    this.getEvents = function() {
	return events;
    }

    this.getCommands = function() {
	commands = [];
//	console.log("checking in "+events.length+" events");
	for (e in events) {
//	    console.log("event ? " + events[e]);
	    if (events[e].isPerformed)
		commands[commands.length] = events[e].command;
	}
	return commands;
    }

    /**
     * Returns action associated to 'e' code (see file Actions.js)
     */
    var getAction = function(e) {
	var code = (e.keyCode) ? e.keyCode : e.charCode;
	var action = ACTIONS[code];
	console.log("getAction : "+action);
	if (!action || action=="") {
	    return null;
	}
	return action;
    }

    this.updateDown = function(e) {
	var event = getEvent( getAction(e) );
	console.log("event : "+event);
	if (event != null) {
	    console.log("registered event");
	    if (  event.trigger == TRIGGER_MAINTAIN ||
		  (event.trigger == TRIGGER_PRESS 
		   && (!event.wasDown)) ) {
		console.log("event "+event.action+" is triggered ->"+event.command);
		event.isPerformed = true;
	    } else {
		event.isPerformed = false;
	    }
	    event.wasDown = true;
	}
    }

    this.updateUp = function(e) {
	var event = getEvent( getAction(e) );
	if (event != null) {
	     if (event.trigger == TRIGGER_RELEASE) {
		 event.isPerformed = true;
	     }else{
		 event.isPerformed = false;
	     }
	    event.wasDown = false;
	}
    }

    this.cleanCommands = function() {
//	commands = [];
    }

    this.cleanEvents = function() {
//	events = [];
    }

}

TRIGGER_PRESS = 0;
TRIGGER_RELEASE = 1;
TRIGGER_MAINTAIN = 2;

function Event() {
    /**
     * Event make the link between an action and a command. 
     * Held by the Controller which will checked, when a key is 
     * pressed / released, if the command has to be executed. 
     *
     * Members : 
     * action - name of the action (in file "Actions.js")
     * command - function to execute when the action occurs
     * trigger - when the command is executed : at press, release, or holding
     * wasDown - to avoid repeated PRESSED events
     */


    this.action = "";
    this.command = function(){};
    this.trigger = TRIGGER_PRESS;
    this.wasDown = false;

    this.init = function(action, command) {
	this.action = action;
	this.command = command;
    }

    this.init = function(action, command, trigger) {
	this.action = action;
	this.command = command;
	if (trigger == TRIGGER_PRESS ||
	    trigger == TRIGGER_RELEASE ||
	    trigger == TRIGGER_MAINTAIN) {
	    this.trigger = trigger;
	} 
    }    

}
