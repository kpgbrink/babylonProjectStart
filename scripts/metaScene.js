'use strict';

$(document).window.addEventListener('DOMContentLoaded', function() {
    function Main () {
        // Set canvas
        this.canvas = document.getElementById('renderCanvas');
        // Load babylon 3d engine
        this.engine = new BABYLON.Engine(canvas, true);
        init();
    }
    
    Main.prototype.init = function () {
        createScene();
        renderLoop();
        manageWindowResize();
    }
    
    Main.prototype.createScene = function () {
        // Create a basic BJS Scene object
        this.scene = new BABYLON.Scene(this.engine);dsaf
        // Set up the camera
        setCamera();
        // create a basic light, aiming 0, 1, 0 - meaning, to the sky
        this.light = new BABYLON.HemisphericLight('light1', new BABYLONE.Vector3(0,1,0), scene);
        // create a built-in "sphere" shape; its constructor takes 5 params: name, width, depth, subdivisions, scene
        this.sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);
        // move the sphere upward of 1/2 of its height
        sphere.position.y = 1;
        this.ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);
        // create this scene
    }  
    Main.prototype.setCamera = function () {
        // Create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        this.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), this.scene);
        //target the camera to scene origin
        this.camera.setTarget(BABYLON.Vector3.Zero());
        // attach the camera to the canvas
        this.camera.attachControl(canvas, false);
    }
    
    Main.prototype.renderLoop = function () {
        this.engine.runRenderLoop(function() {
            this.scene.render();
        })
    }
    
    Main.prototype.manageWindowResize = function () {
        $(document).window.addEventListener('resize', function() {
            this.engine.resize(); 
        });
    }
    
    var game = new Main();
});
