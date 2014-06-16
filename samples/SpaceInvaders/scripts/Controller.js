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

    // TODO : consider using a key-value with a boolean as value, telling 
    // that the command should be executed. This would make only one structure.

    this.init = function() {
    }

    // adds an event to the registered event
    this.registrerEvent = function(e) {
	events[events.length] = e;
    }

    // takes an action, and return the first event triggered by this action
    this.getEventIndex = function(a) {
	for (var i = 0; i < events.length; i++) {
	    if (events[i].action == a)
		return i;
	}
	return -1;
    }

    this.getEvents = function() {
	return events;
    }

    this.updateDown = function(e) {
	var localEvent = getEventIfRegistered(e);
	if (localEvent != null) {
	    // if action has been registered, then update the event
	    // and push its command to the list
	    localEvent.wasDown = true;
	    if (  localEvent.trigger == TRIGGER_MAINTAIN ||
		 (localEvent.trigger == TRIGGER_PRESSED 
		  && (!localEvent.wasDown)) ) {
		// adding the command 
		commands[commands.length] = localEvent.command;
	    }
	}
    }

    this.updateUp = function(e) {
	var localEvent = getEventIfRegistered(e);
	if (localEvent != null) {
	    // if action has been registered, then update the event
	    // and push its command to the list	    
	    localEvent.wasDown = false;
	    if (localEvent.trigger == TRIGGER_RELEASED) {
		// adding the command 
		commands[commands.length] = localEvent.command;
	    }
	}
    }

    this.cleanCommands = function() {
	commands = [];
    }

    this.cleanEvents = function() {
	events = [];
    }

    var getEventIfRegistered = function(e) {
	// Firefox and opera use charCode instead of keyCode to
	// return which key was pressed.
	var code = (e.keyCode) ? e.keyCode : e.charCode;
	// getting the action string associated with the key code
	var action = ACTIONS[code];
	// checking if the action has been registered
	var eventIndex = getEventIndex(action);
	if (eventIndex > -1) {
	    return events[eventIndex];
	} else {
	    return null;
	}
    }


}

TRIGGER_PRESSED = 0;
TRIGGER_RELEASED = 1;
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
    this.trigger = TRIGGER_PRESSED;
    this.wasDown = false;

    this.init = function(action, command) {
	this.action = action;
	this.command = command;
    }

    var init = function(action, command, trigger) {
	this.action = action;
	this.command = command;
	if (trigger == TRIGGER_PRESSED ||
	    trigger == TRIGGER_RELEASED ||
	    trigger == TRIGGER_MAINTAIN) {
	this.trigger = trigger;
	}
    }    

}
