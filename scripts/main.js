'use strict';

$(function() {
    function Main () {
        // Set canvas
        this.canvas = document.getElementById('renderCanvas');
        // Load babylon 3d engine
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.init();
    }
    
    Main.prototype.init = function () {
        this.createScene();
        this.renderLoop();
        this.manageWindowResize();
    }
    
    Main.prototype.createScene = function () {
        // Create a basic BJS Scene object
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.enablePhysics(new BABYLON.Vector3(0,-.5,0), new BABYLON.OimoJSPlugin());
        this.scene.shadowsEnabled = true;
        
        // Set up the camera
        this.setCamera();

        // create this scene
        // Try to add dynamic drawing  
        BABYLON.SceneLoader.Append('maps/', 'map.babylon', this.scene, (scene) => {
        }, () => {}, () => {console.log('there be error')});
    }
    
    Main.prototype.setCamera = function () {
        // Create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        this.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), this.scene);
        //target the camera to scene origin
        this.camera.setTarget(BABYLON.Vector3.Zero());
        // attach the camera to the canvas
        this.camera.attachControl(this.canvas, false);
    }
    
    Main.prototype.renderLoop = function () {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }
    
    Main.prototype.manageWindowResize = function () {
        window.addEventListener('resize', () => {
            this.engine.resize(); 
        });
    }
    
    var game = new Main();
});
