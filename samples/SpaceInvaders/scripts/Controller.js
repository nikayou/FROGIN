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
     *
     * How it works : 
     * When HTML triggers a 'onkeydown' event, 'updateDown' is called. 
     * This function first checks if the code matches a valid action (defined 
     * in Keys.js). If it does, the registered event is retrieved and set 
     * as "performed" (that means, its related command should be called). 
     * When "getCommands" is called, it returns a list of all commands that 
     * should be performed, based on this attribute. 
     */

    // "events" keep a map of <string->Event>, those we are interested in
    var events = {};
    // "commands" will receive commands to execute
    var commands = [];

    // TODO : check if "preventDefault" is necessary for events

    this.init = function(scene) {
	this.scene = scene;
	events = new Object();
    }

    // adds an event to the registered event
    this.registerEvent = function(a, e) {	
	events[a] = e;
    }

    // takes an action, and return the first event triggered by this action
    var getEvent = function(a) {
	for (e in events) {
	    if (e == a) {
		return events[e];
	    }
	}
	return null;
    }

    this.getEvents = function() {
	return events;
    }

    this.getCommands = function() {
	commands = [];
	for (e in events) {
	    if (events[e].isPerformed)
		commands[commands.length] = events[e].command;
	}
	return commands;
    }

    /**
     * Returns action associated to 'e' code (see file Keys.js)
     */
    var getAction = function(e) {
	var code = (e.keyCode) ? e.keyCode : e.charCode;
	var action = KEYS[code];
	if (!action || action=="") {
	    return null;
	}
	return action;
    }

    this.updateDown = function(e) {
	var event = getEvent( getAction(e) );
	if (event != null) {
	    if (  event.trigger == TRIGGER_MAINTAIN ||
		  (event.trigger == TRIGGER_PRESS 
		   && (!event.wasDown)) ) {
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

    this.cleanEvents = function() {
	events = [];
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
     * command - function to execute when the action occurs
     * trigger - when the command is executed : at press, release, or holding
     * wasDown - to avoid repeated PRESSED events
     */

    this.command = function(){};
    this.trigger = TRIGGER_PRESS;
    this.wasDown = false;

    this.init = function(command) {
	this.command = command;
    }

    this.init = function(command, trigger) {
	this.command = command;
	if (trigger == TRIGGER_PRESS ||
	    trigger == TRIGGER_RELEASE ||
	    trigger == TRIGGER_MAINTAIN) {
	    this.trigger = trigger;
	} 
    }    

}
