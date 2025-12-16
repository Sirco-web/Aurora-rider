/**
 * Stepback warning - pauses game if player moves too far from center.
 * Shows warning message and pauses until they return to safe zone.
 */
AFRAME.registerComponent('stepback', {
  init: function () {
    this.message = document.getElementById('stepback');
    this.camera = document.getElementById('camera');
    this.lastTime = 0;
    
    // Limits - player must stay within this Z range
    this.forwardLimit = -(3.0 / 2 - 0.6);  // Max forward (negative Z)
    this.backwardLimit = 1.5;  // Max backward (positive Z)
    
    this.throttling = 300;
    this.wasOutOfBounds = false;
  },

  tick: function (time, delta) {
    if (time - this.lastTime < this.throttling) { return; }
    this.lastTime = time;

    const state = this.el.sceneEl.systems.state.state;
    
    // Only check during active gameplay
    if (!state.isPlaying && !this.wasOutOfBounds) { return; }

    const camPos = this.camera.object3D.position;
    const msgPos = this.message.object3D.position;
    
    // Check if player is out of bounds
    const tooFarForward = camPos.z < this.forwardLimit;
    const tooFarBack = camPos.z > this.backwardLimit;
    const outOfBounds = tooFarForward || tooFarBack;

    if (outOfBounds) {
      this.throttling = 10;
      this.message.object3D.visible = true;
      
      // Position message in front of player
      msgPos.x = camPos.x;
      msgPos.y = camPos.y;
      
      // Fade based on distance
      const distance = tooFarForward 
        ? Math.abs(camPos.z - this.forwardLimit)
        : Math.abs(camPos.z - this.backwardLimit);
      this.message.getObject3D('mesh').material.opacity = Math.min(1, 0.5 + distance);
      
      // Pause game if not already paused
      if (state.isPlaying && !state.isPaused && !this.wasOutOfBounds) {
        this.el.sceneEl.emit('pausegame', null, false);
        this.wasOutOfBounds = true;
      }
    } else {
      this.message.object3D.visible = false;
      this.throttling = 500;
      
      // Resume game if player returns to safe zone
      if (this.wasOutOfBounds && state.isPaused) {
        this.el.sceneEl.emit('gamemenuresume', null, false);
        this.wasOutOfBounds = false;
      }
    }
  }
});
