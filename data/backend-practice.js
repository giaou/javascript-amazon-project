const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
  //console.log(xhr.response);
});
//set this request
xhr.open("GET", "https://supersimplebackend.dev/documentation");

xhr.send();
