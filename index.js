let markerScanned = false;

docReady(function() {
  // * References
  // const message = document.getElementById("message");
  // const guide = document.getElementById("guide");

  // * Scene
  AFRAME.registerComponent("scene", {
    init: function() {
      const {
        el: { camera }
      } = this;

      const guidePos = guide.getAttribute("position");
      console.log("camera.position: ", camera.position);

      setTimeout(() => {
        // camera.position.set(.5,.5,.5);
        console.log("camera.position: ", camera.position);
      }, 2000);

      setTimeout(() => {
        console.log("guidePos: ", guidePos);
        // camera.lookAt(guidePos);
      }, 3000);
    }
  });

  // * Show / Hide Scan message
  AFRAME.registerComponent("marker", {
    init: function() {
      const marker = this.el;

      marker.setAttribute("emitevents", "true");

      marker.addEventListener("markerFound", function() {
        console.log("Scanned!");
        if (markerScanned) return;

        // Open the gates

        // Set bool
        markerScanned = true;

        message.style.display = "none";
      });

      // marker.addEventListener("markerLost", function() {
      //   message.style.display = "flex";
      // });
    }
  });

  AFRAME.registerComponent("markerluis", {
    init: function() {
      const marker = this.el;
      marker.setAttribute("emitevents", "true");

      marker.addEventListener("markerFound", function() {
        console.log("Scanned Luis!");
      });
    }
  });

  // * Set the 3D Model transform
  AFRAME.registerComponent("transform", {
    init: function() {
      const el = this.el;
      const object = el.object3D;

      const scale = 3;
      object.scale.set(scale, scale, scale);

      object.rotation.x = THREE.Math.degToRad(120);
      object.rotation.z = THREE.Math.degToRad(200);
      object.rotation.y = THREE.Math.degToRad(-150);
    }
  });

  // * Open phone to store number
  // document.getElementById("whatsapp").addEventListener("click", () => {
  //   document.location.href = "tel:+56978455169";
  // });
});
