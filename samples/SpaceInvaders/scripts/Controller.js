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
    }

    // adds an event to the registered event
    this.registerEvent = function(e) {	
	events[events.length] = e;
    }

    // takes an action, and return the first event triggered by this action
    var getEventIndex = function(a) {
	for (var i = 0; i < events.length; i++) {
	    if (events[i].action == a){
		return i;
	    }
	}
	return -1;
    }

    this.getEvents = function() {
	return events;
    }

    this.getCommands = function() {
	return commands;
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
	return null;
    };

    this.updateDown = function(e) {
	var localEvent = getEventIfRegistered(e);
	if (localEvent != null) {
	    // if action has been registered, then update the event
	    // and push its command to the list
	    //	    console.log("(D)was down ? "+localEvent.wasDown);
	    if (  localEvent.trigger == TRIGGER_MAINTAIN ||
		  (localEvent.trigger == TRIGGER_PRESS 
		   && (!localEvent.wasDown)) ) {
		// adding the command 
		// TODO : don't call commands immediately (?)
		/*		window.alert("adding command "+localEvent.command);
				commands[commands.length] = localEvent.command;
				};
		*/
		//console.log(this+" call "+localEvent.command+" with "+Controller.scene);
		localEvent.command.call(this.scene);
	    }
	    localEvent.wasDown = true;
	} else {
	}
    }

    this.updateUp = function(e) {
	var localEvent = getEventIfRegistered(e);
	if (localEvent != null) {
	    // if action has been registered, then update the event
	    // and push its command to the list	    
	    //	    console.log("(U)was down ? "+localEvent.wasDown);
	    if (localEvent.trigger == TRIGGER_RELEASE) {
		// adding the command 
		commands[commands.length] = localEvent.command;
	    }
	    localEvent.wasDown = false;
	}
    }

    this.cleanCommands = function() {
	commands = [];
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
