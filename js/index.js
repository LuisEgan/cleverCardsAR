let markerScanned = false;

docReady(() => {
  // * References
  // const message = document.getElementById("message");
  // const guide = document.getElementById("guide");
  const blackTop = document.getElementById("black-top");
  const blackLeft = document.getElementById("black-left");
  const blackRight = document.getElementById("black-right");
  const blackBottom = document.getElementById("black-bottom");

  // * Get card owner
  const cardOwner = getQueryParams("name");

  // * Set buttons urls
  setButtonsUrls(cardOwner);

  // * Scene
  // AFRAME.registerComponent("scene", {
  //   init: function() {
  //     const { el: scene } = this;
  //     const { camera } = scene;

  // const guidePos = guide.getAttribute("position");
  //     console.log("camera.position: ", camera.position);

  // console.log("planetFire: ", planetFire);
  // planetFire.object3D.position.set(0, 0, -1);

  //     setTimeout(() => {
  //       camera.position.set(0.5, 0, 0);
  //       console.log("camera.position: ", camera.position);
  //     }, 2000);

  //     setTimeout(() => {
  // console.log("guidePos: ", guidePos);
  //       camera.lookAt(planetFire.object3D.position);
  //     }, 3000);
  //   }
  // });

  // * Show / Hide Scan message
  AFRAME.registerComponent("marker", {
    init: function() {
      const marker = this.el;
      const name = marker.getAttribute("name");

      marker.setAttribute("emitevents", "true");

      marker.addEventListener("markerFound", function() {
        // if (markerScanned) return;

        // * Set bool
        markerScanned = true;

        // * Hide black borders
        animateCSS(blackTop, "fadeOut", "fadeIn");
        animateCSS(blackLeft, "fadeOut", "fadeIn");
        animateCSS(blackRight, "fadeOut", "fadeIn");
        animateCSS(blackBottom, "fadeOut", "fadeIn");
      });

      marker.addEventListener("markerLost", function() {
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

  // * Open phone to store number
  // document.getElementById("whatsapp").addEventListener("click", () => {
  //   document.location.href = "tel:+56978455169";
  // });
});
