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
    var events = [];
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
	var action = e.action;
	events[action] = false;
	commands[action] = e.command;
	console.log("registered "+action+"->"+events+"("+events[action]);
	console.log("events : "+events[action]);	
	console.log("events["+action+"] -> "+events[action]);
    }

    // takes an action, and return the first event triggered by this action
    var getEventIndex = function(a) {
	for (e in events) {
	    if (e.action == a)
		return e;
	}
	return null;
    }

    this.getEvents = function() {
	return events;
    }

    this.getCommands = function() {
	var todoCommands = [];
//	console.log("checking in "+events.length+" events");
	for (e in events) {
//	    console.log("event ? " + events[e]);
	    if (events[e])
		todoCommands[todoCommands.length] = commands[e];
	}
	return todoCommands;
    }

    var getEventIfRegistered = function(e) {
	// Firefox and opera use charCode instead of keyCode to
	// return which key was pressed.
	var code = (e.keyCode) ? e.keyCode : e.charCode;
	// getting the action string associated with the key code
	var action = ACTIONS[code];
	if (!action) {
	    return null;
	}
	// checking if the action has been registered
/*	var eventIndex = getEventIndex(action);
	if (eventIndex) {
	    return events[eventIndex];
	} else {
	    return null;
	}
	return null;*/
	return getEventIndex(action);
    };

    var isRegistered = function(action) {
	// getting the action string associated with the key code
	return (events.action);
    }

    var getAction = function(e) {
	var code = (e.keyCode) ? e.keyCode : e.charCode;
	var action = ACTIONS[code];
	console.log(events);
	console.log("events["+action+"] -> "+events[action]);
	if (!action || action=="") {
	    return null;
	}
	return action;
    }

    this.updateDown = function(e) {
	var action = getAction(e);
//	if (isRegistered(action)) {
	    console.log("event != null : "+e);
	    events[action] = true;
//	}
    }

    this.updateUp = function(e) {
	var action = getAction(e);
	events[action] = false;
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
