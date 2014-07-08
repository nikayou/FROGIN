function Spritesheet() {
    /**
     * Spritesheet hold information about graphics : clips, and animations.
     * They are typically loaded from XML files. 
     *
     * Members : 
     * clips - rectangles delimitating different parts of the animation. 
     * animations - set of animations mapped to a name.
     * defaultAnimationName - name of the animation played when unspecified. 
     */

    this.clips = [];
    this.animations = [];
    this.defaultAnimationName = "";

    this.init = function() {

    }

    this.loadFromFile = function(filePath) {
	var xml = readXML(filePath);
	var clips = xml.getElementsByTagName("clip");
	for (var i=0; i < clips.length; i++) {
	    var currentC = clips[i];
	    var clip = new Clip();
	    var id = currentC.getAttribute("id");
	    clip.x = currentC.getAttribute("x");
	    clip.y = currentC.getAttribute("y");
	    clip.width = currentC.getAttribute("w");
	    clip.height = currentC.getAttribute("h");
	    clip.dx = currentC.getAttribute("dx");
	    clip.dy = currentC.getAttribute("dy");
	    // TODO : convert id string to int
	    this.clips[id] = clip;
	}
	var anims = xml.getElementsByTagName("animation");
	for (var i=0; i < anims.length; i++) {
	    var currentA = anims[i];
	    var anim = new Object();
	    var name = currentA.getAttribute("name");
	    anim.steps = [];
	    var steps = currentA.getElementsByTagName("step");
	    for (var j=0; j < steps.length; j++) {
		var currentS = steps[j];
		var step = new Object();
		step.clip = currentS.getAttribute("clip");
		step.duration = currentS.getAttribute("duration");
		anim.steps[anim.steps.length] = step;
	    }
	    this.animations[name] = anim;
	}
	this.defaultAnimationName = xml.getElementsByTagName("SPRITESHEET")[0].
	    getAttribute("defaultAnim");

    }

    this.getDefaultAnimation = function() {
	return this.animations[this.defaultAnimationName];
    }

}
