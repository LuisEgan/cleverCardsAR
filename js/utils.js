const docReady = fn => {
  // see if DOM is already available
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
};

const getQueryParams = (name, url) => {
  if (!url) url = location.href;
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  return results == null ? null : results[1];
};

const setButtonsUrls = cardOwner => {
  const btnCall = document.getElementById("btn-call");
  const btnWeb = document.getElementById("btn-web");
  const btnLinkedin = document.getElementById("btn-linkedin");
  const btnMail = document.getElementById("btn-mail");
  const btnWsapp = document.getElementById("btn-wsapp");

  const { tel, web, linkedin, mail, wsapp } = cardOwners[cardOwner];

  btnCall.setAttribute("href", `tel:${tel}`);
  btnWeb.setAttribute("href", web);
  btnLinkedin.setAttribute("href", linkedin);
  btnMail.setAttribute("href", `mailto:${mail}`);
  // btnWsapp.setAttribute("href", wsapp);
};

const animateCSS = (
  element,
  animationName,
  substitutedClass,
  removeAnimClass = false,
  callback
) => {
  if (substitutedClass) {
    element.classList.remove(substitutedClass);
  }

  element.classList.add("animated", animationName);

  function handleAnimationEnd() {
    if (removeAnimClass) {
      element.classList.remove("animated", animationName);
    }

    element.removeEventListener("animationend", handleAnimationEnd);

    if (typeof callback === "function") callback();
  }

  element.addEventListener("animationend", handleAnimationEnd);
};

// * 3D

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

const setMarker = cardOwner => {
  const scene = document.getElementById("scene");

  // * BACK
  const markerBack = document.createElement("a-marker");
  markerBack.setAttribute("marker", "");
  markerBack.setAttribute("name", cardOwner);
  markerBack.setAttribute("type", "pattern");
  markerBack.setAttribute(
    "url",
    `./markers/pattern-qr-${cardOwner.toLowerCase()}.patt`
  );
  const entityFlipCard = document.createElement("a-entity");
  entityFlipCard.setAttribute("fliptransform", "");
  entityFlipCard.setAttribute("animation-mixer", "");
  entityFlipCard.setAttribute("gltf-model", `url(./models/flipTheCardGlb.glb)`);
  markerBack.appendChild(entityFlipCard);

  // * FRONT
  const markerFront = document.createElement("a-marker");
  markerFront.setAttribute("marker", "");
  markerFront.setAttribute("name", cardOwner);
  markerFront.setAttribute("type", "pattern");
  markerFront.setAttribute(
    "url",
    `./markers/pattern-${cardOwner.toLowerCase()}.patt`
  );
  const entityCard = document.createElement("a-entity");
  entityCard.setAttribute("transform", "");
  entityCard.setAttribute("animation-mixer", "");
  entityCard.setAttribute(
    "gltf-model",
    `url(./models/card${cardOwner}Glb.glb)`
  );

  if (cardOwner === cardOwners.Luis.name) {
    // * Set eye attribute to initialize anim
    markerFront.setAttribute("eye", "");

    // * Eye anims entity
    const entityEye = document.createElement("a-entity");
    entityEye.setAttribute("id", "eyeanims");
    entityEye.setAttribute("eyeanims", "");
    entityEye.setAttribute("animation-mixer", "");
    entityEye.setAttribute("gltf-model", "url(./models/eyeAnimationsGlb.glb)");
    markerFront.appendChild(entityEye);
  }

  markerFront.appendChild(entityCard);

  scene.appendChild(markerBack);
  scene.appendChild(markerFront);
};
