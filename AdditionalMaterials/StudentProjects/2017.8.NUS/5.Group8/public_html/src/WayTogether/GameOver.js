/*
 * File: GameOver.js 
 * The game over screen
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, Camera: false, vec2: false, FontRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameOver() {
    this.kFontCon72 = "assets/fonts/Consolas-72";
    this.kFontConSys = "assets/fonts/system-default-font";
    
    this.kCue = "assets/sounds/jump failure.wav";
    
    this.mCamera = null;
    this.mMsg = null;
    this.mMsg0 = null;
    
    this.mMsg2 = null;
    this.mState = 0;
    this.flag = 1;
}
gEngine.Core.inheritPrototype(GameOver, Scene);

//GameOver.prototype.unloadScene = function () {
//     var nextLevel = new GameStart();  // next level to be loaded
//    gEngine.Core.startScene(nextLevel);
//};
GameOver.prototype.loadScene = function () {
    // Step A: loads the textures    
    // Step B: loads all the fonts
    gEngine.Fonts.loadFont(this.kFontCon72);
    gEngine.Fonts.loadFont(this.kFontConSys);
    
    gEngine.AudioClips.loadAudio(this.kCue);
};

GameOver.prototype.unloadScene = function () {
    // unload the fonts
    gEngine.Fonts.unloadFont(this.kFontCon72);
    gEngine.Fonts.unloadFont(this.kFontConSys);
    
    
        var nextLevel = new GameStart();  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    
   gEngine.AudioClips.unloadAudio(this.kCue);
    // Step B: starts the next level
//    var nextLevel = new GameOver();  // next level to be loaded
//    gEngine.Core.startScene(nextLevel);
};
GameOver.prototype.initialize = function () {
    // Step A: set up the cameras
    
    this.mCamera = new Camera(
        vec2.fromValues(50, 33),   // position of the camera
        100,                       // width of camera
        [0, 0, 1280, 720]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);
            // sets the background to gray

    //<editor-fold desc="Create the fonts!">
    // this.mText = new FontRenderable("This is green text");
    this.mMsg = new FontRenderable("Game Over!");
    this.mMsg.setFont(this.kFontCon72);
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(20, 45);
    this.mMsg.setTextHeight(10);
    this.mMsg0 = new FontRenderable("0");
    this.mMsg0.setColor([0.9, 0.9, 0.9, 1]);
    this.mMsg0.getXform().setPosition(50, 32);
    this.mMsg0.setTextHeight(4);
    
    this.mMsg2 = new FontRenderable("Menu");
    this.mMsg2.setColor([0.9, 0.9, 0.9, 1]);
    this.mMsg2.getXform().setPosition(60, 32);
    this.mMsg2.setTextHeight(4);
    //</editor-fold>
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameOver.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();
    this.mMsg.draw(this.mCamera);
    this.mMsg0.draw(this.mCamera);
    
    this.mMsg2.draw(this.mCamera);
    
   // gEngine.AudioClips.unloadAudio(this.kCue);
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
GameOver.prototype.update = function () {
    if(this.flag === 1){
        gEngine.AudioClips.playACue(this.kCue);
        this.flag = 2;
    }
    
    if(this.mMsg0.getXform().getYPos()===this.mMsg2.getXform().getYPos())
    {
        this.mMsg2.setColor([0, 0, 0, 1]);
        
        
        //start
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
            this.mState = 2;
            gEngine.GameLoop.stop();
        }     
    }
   
};