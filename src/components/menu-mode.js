const COLORS = require('../constants/colors.js');

const iconPositions = {
  classicvr: -0.6,
  punchvr: 0.87,
  ride2d: 0.87,
  ridevr: 0.15,
  viewer2d: 0.15,
  onlinevr: -1.35
};

const modeMap = {
  classicvr: 'classic',
  punchvr: 'punch',
  ride2d: 'ride',
  ridevr: 'ride',
  viewer2d: 'viewer',
  onlinevr: 'online'
};

AFRAME.registerComponent('menu-mode', {
  schema: {
    colorScheme: {default: 'default'},
    hasVR: {default: false}
  },

  init: function () {
    this.el.addEventListener('click', evt => {
      try {
        var item = evt.target.closest('[data-mode]');
        if (!item) { return; }  // No mode item clicked
        
        var mode = item.dataset.mode;
        var name = item.dataset.name;
        
        if (!mode) { return; }  // No mode specified
        
        // Handle online mode specially - open online menu (VR only)
        if (mode === 'online') {
          this.el.sceneEl.emit('onlinemenutoggle', null, false);
          return;
        }
        
        this.el.sceneEl.emit('gamemode', mode, false);
        if (this.data.hasVR && name) {
          localStorage.setItem('gameMode', name);
        }
        if (name) {
          this.setModeOption(name);
        }
      } catch (e) {
        console.error('[menu-mode] Error handling click:', e);
      }
    });
  },

  update: function () {
    if (this.data.hasVR) {
      this.setModeOption(localStorage.getItem('gameMode') || 'punchvr');
      this.el.sceneEl.emit('gamemode', modeMap[localStorage.getItem('gameMode') || 'punchvr']);
    } else {
      this.setModeOption('ride2d');
    }
  },

  setModeOption: function (name) {
    const modeEls = this.el.querySelectorAll('.modeItem');
    const modeIcon = document.getElementById('modeIcon');
    
    // Only update icon position if the icon exists and position is defined
    if (modeIcon && modeIcon.object3D && iconPositions[name] !== undefined) {
      modeIcon.object3D.position.y = iconPositions[name];
    }

    for (let i = 0; i < modeEls.length; i++) {
      const modeEl = modeEls[i];
      const selected = modeEl.dataset.name === name;

      modeEl.emit(selected ? 'select' : 'deselect', null, false);

      const background = modeEl.querySelector('.modeBackground');
      if (background) {
        background.emit(selected ? 'select' : 'deselect', null, false);
        background.setAttribute(
          'mixin',
          'modeBackgroundSelect' + (selected ? '' : ' modeBackgroundHover'));
      }

      const thumb = modeEl.querySelector('.modeThumb');
      if (thumb) {
        thumb.emit(selected ? 'select' : 'deselect', null, false);
      }

      const title = modeEl.querySelector('.modeTitle');
      if (title) {
        title.setAttribute(
          'text', 'color',
          selected ? COLORS.WHITE : COLORS.schemes[this.data.colorScheme].secondary);
      }

      const instructions = modeEl.querySelector('.modeInstructions');
      if (instructions) {
        instructions.setAttribute(
          'text', 'color',
          selected ? COLORS.WHITE : COLORS.schemes[this.data.colorScheme].primary);
      }
    }
  }
});
