docReady(function() {
  // * Show / Hide Scan message
  AFRAME.registerComponent("registerevents", {
    init: function() {
      const marker = this.el;
      const message = document.getElementById("message");

      marker.setAttribute("emitevents", "true");

      marker.addEventListener("markerFound", function() {
        message.style.display = "none";
      });

      marker.addEventListener("markerLost", function() {
        message.style.display = "block";
      });
    }
  });

  // * Set the 3D Model transform
  AFRAME.registerComponent("transform", {
    init: function() {
      const el = this.el;
      const object = el.object3D;

      const scale = 10;
      object.scale.set(scale, scale, scale);

      object.rotation.x = THREE.Math.degToRad(120);
      object.rotation.z = THREE.Math.degToRad(200);
      object.rotation.y = THREE.Math.degToRad(-150);
    }
  });
});
