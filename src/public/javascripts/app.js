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

  let idDelete = null;
  let btnDeletePost = document.querySelector("#btn-delete");
  let formDeletePost = document.querySelector("#form-delete-post");
  $("#confirmModalDelete").on("show.bs.modal", function (e) {
    let button = $(e.relatedTarget);
    idDelete = button.data("id");
  });

  btnDeletePost.addEventListener("click", function (e) {
    formDeletePost.action = `/posts/${idDelete}/?_method=DELETE`;
    formDeletePost.submit();
    console.log("success");
  });
});
