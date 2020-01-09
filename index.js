let markerScanned = false;

docReady(function() {
  // * Show / Hide Scan message
  AFRAME.registerComponent("marker", {
    init: function() {
      const marker = this.el;
      const message = document.getElementById("message");

      marker.setAttribute("emitevents", "true");

      marker.addEventListener("markerFound", function() {
        if (markerScanned) return;

        // Open the gates

        // Set bool
        markerScanned = true;

        message.style.display = "none";
        console.log("Scanned!");
      });

      // marker.addEventListener("markerLost", function() {
      //   message.style.display = "flex";
      // });
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
  document.getElementById("whatsapp").addEventListener("click", () => {
    document.location.href = "tel:+56978455169";
  });
});
