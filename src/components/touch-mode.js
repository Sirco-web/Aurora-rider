/**
 * Touch Mode - Allow PC users to click on beats to hit them.
 * This mode works without VR controllers by making beats clickable.
 */
AFRAME.registerComponent('touch-mode', {
  schema: {
    enabled: { default: false },
    gameMode: { default: '' }
  },

  init: function () {
    this.onBeatClick = this.onBeatClick.bind(this);
    this.onMouseClick = this.onMouseClick.bind(this);
    
    // Listen for raycaster intersections on beats
    this.el.sceneEl.addEventListener('click', this.onMouseClick);
  },

  remove: function () {
    this.el.sceneEl.removeEventListener('click', this.onMouseClick);
  },

  onMouseClick: function (evt) {
    if (this.data.gameMode !== 'touch') { return; }
    
    const state = this.el.sceneEl.systems.state.state;
    if (!state.isPlaying) { return; }
    
    // Check if we clicked on a beat through the raycaster
    const mouseCursor = document.getElementById('mouseCursor');
    if (!mouseCursor || !mouseCursor.components.raycaster) { return; }
    
    const intersections = mouseCursor.components.raycaster.intersections;
    if (!intersections || intersections.length === 0) { return; }
    
    // Find a beat in the intersections
    for (let i = 0; i < intersections.length; i++) {
      let el = intersections[i].object.el;
      
      // Walk up to find beat entity
      while (el && !el.components.beat) {
        el = el.parentElement;
      }
      
      if (el && el.components.beat) {
        const beat = el.components.beat;
        if (!beat.destroyed && beat.data.type !== 'mine') {
          beat.touchHit();
          return; // Only hit one beat per click
        }
      }
    }
  },

  onBeatClick: function (evt) {
    if (this.data.gameMode !== 'touch') { return; }
    
    const state = this.el.sceneEl.systems.state.state;
    if (!state.isPlaying) { return; }
    
    // Find beat element from click target
    let beatEl = evt.target;
    while (beatEl && !beatEl.components.beat) {
      beatEl = beatEl.parentElement;
    }
    
    if (beatEl && beatEl.components.beat) {
      const beat = beatEl.components.beat;
      if (!beat.destroyed && beat.data.type !== 'mine') {
        beat.touchHit();
      }
    }
  }
});
