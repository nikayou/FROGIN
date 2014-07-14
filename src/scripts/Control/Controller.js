include(scriptsPath+"Control/Keys.js");
include(scriptsPath+"Control/InputMap.js");

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
     * inputMaps - binding of events
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
    this.inputMaps = [];

    // TODO : check if "preventDefault" is necessary for events

    this.init = function(scene) {
	this.scene = scene;
	events = new Object();
	this.inputMaps[0] = new InputMap();
	this.inputMaps[0].init(); 
    };

    /**
     * Binds an action (string) to an Event (e). 
     * When the key matching the action is involved in an input, 
     * the event's command will be triggered. 
     */
    this.register = function(a, e) {	
	this.registerOn(a, e, this.inputMaps[0]);
    };

    /**
     * Binds an action (string) to an Event (e) on the specified inputMap index. 
     * When the key matching the action is involved in an input, 
     * the event's command will be triggered. 
     */
    this.registerOn = function(a, e, i) {
	this.inputMaps[i].register(a, e);
    };

    /**
     * Adds the given input map at the given index (new one if unspecified)
     */
    this.addInputMap = function(m, i) {
	var map = null;
	if (i) {
	    if (i >= this.inputMaps.length) {
		this.inputMaps[i] = new InputMap();
	    }
	    map = this.inputMaps[i];
	} else {
	    map = this.inputMaps[this.inputMaps.length];
	}
	for (a in m.events) {
	    this.inputMaps[i].register(a, m.events[a]);
	}
    }

    /**
     * Replaces an input map at the given index. If no index given, a new one is added
     */
    /** TODO: not working (events are not detected)
    this.setInputMap = function(m, i) {
	if (i) {
	    this.inputMaps[i] = m;
	} else {
	    this.inputMaps[this.inputMaps.length] = m;
	}
    }
    */

    /**
     * Computes and returns all commands to perform, obtained by inputMaps. 
     * Each one should be called ( command.call() );
     */
    this.getCommands = function() {
	commands = [];
	for (m in this.inputMaps) {
	    commands = commands.concat(this.inputMaps[m].getCommands());
	}
	return commands;
    };

    /**
     * Returns the key name associated to 'e' code (see file Keys.js)
     */
    var getKeyName = function(e) {
	var code = (e.keyCode) ? e.keyCode : e.charCode;
	var action = KEYS[code];
	if (!action || action=="") {
	    return null;
	}
	return action;
    };

    /**
     * Retrieves the event bound to the matching key, and tells to inputMaps 
     * to update
     */
    this.updateDown = function(e) {
	var action = getKeyName(e);
	for (m in this.inputMaps) {
	    this.inputMaps[m].updateDown(action);
	}
    };

    /**
     * Retrieves the event bound to the matching key, and tells to inputMaps 
     * to update
     */
    this.updateUp = function(e) {
	var action = getKeyName(e);
	for (m in this.inputMaps) {
	    this.inputMaps[m].updateUp(action);
	}
    };

    /**
     * Cleans all registered events. 
     */
    this.cleanEvents = function() {
	events = [];
    };

    /**
     * Enables the input map at the given index
     */
    this.enable = function(i) {
	this.inputMaps[i].enable();
    };

    /**
     * Enables the input map at the given index
     */
    this.disable = function(i) {
	this.inputMaps[i].disable();
    };

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
    };

    this.init = function(command, trigger) {
	this.command = command;
	if (trigger == TRIGGER_PRESS ||
	    trigger == TRIGGER_RELEASE ||
	    trigger == TRIGGER_MAINTAIN) {
	    this.trigger = trigger;
	} 
    };

}
