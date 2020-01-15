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
  btnWsapp.setAttribute("href", wsapp);
};
