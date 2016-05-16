/*************** LOAD DEPENDENCIES *****************/
try{
	var cv = require('../node-opencv/lib/opencv');
	} 
catch (e){
	  console.log("Couldn't load opencv bindings:", e)
	}

/**************** DOBOT COMPUTER VISION CONSTRUCTOR ******************/
var DobotComputerVision = function( ) { 

	this._camera 				= null;
	this._cameraWindow 			= null;
	this._cameraImage			= null;
	this._cameraImageTracked	= null;

	this._cameraTrackingState	= false;

};


DobotComputerVision.prototype.startCamera = function (params) {
	var that = this;		//shallow reference

	try {
	  	this._camera 			= new cv.VideoCapture(0);
	  	//this._cameraWindow 	= new cv.NamedWindow('Video', 0);
	  
		setInterval(function() {
			var ref = that;		//another reference variable...ugh callbacks= /

			that._camera.read(function(err, im) {
				if (err) {
					throw err;
				}
				//console.log(im.size())
				else if (im.size()[0] > 0 && im.size()[1] > 0){
					ref._cameraImage = im;

					if(ref._cameraTrackingState === false) {
						ref._cameraImageTracked	= im;		
					}
					//ref._cameraWindow.show(im);
					//ref.trackFace();
				}
			});
			
		}, 200);
	  
	} catch (e){
	  console.log("Couldn't start camera:", e)
	}

};


DobotComputerVision.prototype.startTrackFace = function (params) {

	var that 			= this;
	//var tracking_rate 	= params.tracking_rate | 200;
	var tracking_rate = 200;

	setInterval(function() {
		that.trackFace();
	}, tracking_rate);

};


DobotComputerVision.prototype.updateVisionControlMode = function (params) {	



};


DobotComputerVision.prototype.updateVisionControlOutput = function (params) {	



};


DobotComputerVision.prototype.updateCameraOutputWindow = function (params) {	



};



DobotComputerVision.prototype.trackObject = function (object_params) {	



};


DobotComputerVision.prototype.trackFace = function () {

	var that = this;

	this._cameraTrackingState = true;

	var COLOR = [0, 255, 0];  // draw green rectangle
	var thickness = 2;      // default 1

	try{
	  	this._cameraImage.detectObject('../node-opencv/data/haarcascade_frontalface_alt2.xml', {}, function(err, faces) {
		    if(faces.length > 0) {
			    for (var i = 0; i < faces.length; i++) {
			        face = faces[i];			        //TO DO: need to include some time averaging for consistency
			        //console.log("face: " + i + " is at x = " + face.x + " and y = " + face.y);

					that._cameraImageTracked = that._cameraImage;             //set cameraImageTracked to base image
			        that._cameraImageTracked.rectangle([face.x, face.y], [face.width, face.height], COLOR, 2);  //draw a rectangle around face	        
			    }
		    }
		    else {
		    	that._cameraImageTracked = that._cameraImage;             //set cameraImageTracked to base image

		    }
	  	});
	} catch (error) {
		console.log(error);
	}

}


//do some averaging of the discovered faces




/*************** EXPORT DOBOT COMPUTER VISION CLASS ****************/
module.exports = DobotComputerVision;