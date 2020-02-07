let markerScanned = false;

let blackTop, blackLeft, blackRight, blackBottom, eyeAnims;

docReady(() => {
  window.addEventListener("camera-init", data => {
    // alert("camera ready")
  });

  // * References
  blackTop = document.getElementById("black-top");
  blackLeft = document.getElementById("black-left");
  blackRight = document.getElementById("black-right");
  blackBottom = document.getElementById("black-bottom");
  eyeAnims = document.getElementById("eyeanims");

  // * Get card owner
  const cardOwner = getQueryParams("name");

  // * Set buttons urls
  setButtonsUrls(cardOwner);
});

// * Set scene
AFRAME.registerComponent("scene", {
  init: function() {
    const scene = this.el;
  }
});

// * Show / Hide Scan message
AFRAME.registerComponent("marker", {
  init: function() {
    const marker = this.el;
    const name = marker.getAttribute("name");

    marker.setAttribute("emitevents", "true");

    marker.addEventListener("markerFound", () => {
      // if (markerScanned) return;
      console.log("name: ", name);

      // * Set bool
      markerScanned = true;

      // * Hide black borders
      animateCSS(blackTop, "fadeOut", "fadeIn");
      animateCSS(blackLeft, "fadeOut", "fadeIn");
      animateCSS(blackRight, "fadeOut", "fadeIn");
      animateCSS(blackBottom, "fadeOut", "fadeIn");
    });

    marker.addEventListener("markerLost", () => {
      // * Show black borders
      animateCSS(blackTop, "fadeIn", "fadeOut");
      animateCSS(blackLeft, "fadeIn", "fadeOut");
      animateCSS(blackRight, "fadeIn", "fadeOut");
      animateCSS(blackBottom, "fadeIn", "fadeOut");
    });
  }
});

// * Set the 3D Model transform
AFRAME.registerComponent("transform", {
  init: function() {
    const el = this.el;
    const object = el.object3D;

    const scale = 3.5;
    object.scale.set(scale, scale, scale);

    // object.rotation.x = THREE.Math.degToRad(120);
    // object.rotation.z = THREE.Math.degToRad(200);
    // object.rotation.y = THREE.Math.degToRad(-150);

    object.position.set(0, 0, 0);
  }
});

// * Set "Flip the card" message's transform
AFRAME.registerComponent("fliptransform", {
  init: function() {
    const el = this.el;
    const object = el.object3D;

    const scale = 10.5;
    // object.scale.set(scale, scale, scale);

    object.rotation.x = THREE.Math.degToRad(-90);
  }
});

// * Handle reveal and blinking eye animations
AFRAME.registerComponent("eye", {
  init: function() {
    const marker = this.el;

    marker.addEventListener("markerFound", () => {
      console.log("anim added!");
      eyeAnims.setAttribute(
        "animation-mixer",
        "clip: eyeReveal; duration: 5; loop: once"
      );
    });

    marker.addEventListener("markerLost", () => {});
  }
});
AFRAME.registerComponent("eyeanims", {
  init: function() {
    const el = this.el;

    el.addEventListener("animation-finished", () => {
      eyeAnims.setAttribute(
        "animation-mixer",
        "clip: eyeBlinking; loop: repeat"
      );
    });
  }
});
