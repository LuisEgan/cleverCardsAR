let markerScanned = false;

const loadGLTF = (source, scene) => {
  const loader = new THREE.GLTFLoader();

  const onLoad = object => {
    console.log("object: ", object);
    scene.object3D.add(object);
  };

  const onLoading = xhr => {
    console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
  };

  const onError = error => {
    console.error("An error happened", error);
  };

  loader.load(source, onLoad, onLoading, onError);
};

docReady(() => {
  // * References
  // const message = document.getElementById("message");
  // const guide = document.getElementById("guide");
  const planetFire = document.getElementById("planetFire");

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

      marker.setAttribute("emitevents", "true");

      const name = marker.getAttribute("name");

      marker.addEventListener("markerFound", function() {
        console.log(`Scanned! ---> ${name}`);
        if (markerScanned) return;

        // Open the gates

        // Set bool
        markerScanned = true;

        // message.style.display = "none";
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

      // object.position.set(1, 0, -3);
    }
  });

  AFRAME.registerComponent("ar", {
    init: function() {
      const el = this.el;
      const object = el.object3D;

      const scale = 3;
      object.scale.set(scale, scale, scale);

      object.rotation.x = THREE.Math.degToRad(120);
      object.rotation.z = THREE.Math.degToRad(200);
      object.rotation.y = THREE.Math.degToRad(-150);

      object.position.set(0, -2, 0.5);
    }
  });

  // * Open phone to store number
  // document.getElementById("whatsapp").addEventListener("click", () => {
  //   document.location.href = "tel:+56978455169";
  // });
});
