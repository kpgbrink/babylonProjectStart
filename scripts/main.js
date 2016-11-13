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
        this.scene.enablePhysics(new BABYLON.Vector3(0,-10,0), new BABYLON.OimoJSPlugin());
        // Set up the camera
        this.setCamera();
        // create a basic light, aiming 0, 1, 0 - meaning, to the sky
        this.light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this.scene);
        // create a built-in "sphere" shape; its constructor takes 5 params: name, width, depth, subdivisions, scene
        this.ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, this.scene);
        this.ground.setPhysicState({imposter:BABYLON.PhysicsEngine.BoxImpostor, move:false});
        
        
        this.sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, this.scene);
        // move the sphere upward of 1/2 of its height
        this.sphere.position.y = 1;
        this.sphere.setPhysicsState({imposter:BABYLON.PhysicsEngine.BoxImpostor, move: true});
        
        // create this scene
        // Try to add dynamic drawing  
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
