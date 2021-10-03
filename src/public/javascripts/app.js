document.addEventListener("DOMContentLoaded", function () {
  ClassicEditor.create(document.querySelector("#editor"), {
    cloudServices: {
      tokenUrl:
        "https://83809.cke-cs.com/token/dev/6d57962ec8203e3b754849792b637ad70bd277fb68e211c2088f58827f62",
      uploadUrl: "https://83809.cke-cs.com/easyimage/upload/",
    },
  }).catch((error) => {
    console.error(error);
  });
});
