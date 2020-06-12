import { getCookie } from "./storage";

window.onload = function () {
  let baseCropping = $("#cropped-image").croppie({
    viewport: {
      width: 200,
      height: 200,
    },
    boundary: {
      width: 300,
      height: 300,
    },
    showZoomer: true,
  });

  function readableFile(file) {
    let reader = new FileReader();
    reader.onload = function (e) {
      baseCropping
        .croppie("bind", {
          url: e.target.result,
        })
        .then(() => {
          $(".cr-slider").attr({
            min: 0.5,
            max: 1.5,
          });
        });
    };
    reader.readAsDataURL(file);
  }

  $("#profilepicture").on("change", function (e) {
    if (this.files[0]) {
      readableFile(this.files[0]);
      $("#crop-modal").modal({
        backdrop: "static",
        keyboard: false,
      });
    }
  });

  $("#cancel-cropping").on("click", function () {
    $("#crop-modal").modal("hide");
  });

  $("#upload-image").on("click", function () {
    baseCropping
      .croppie("result", "blob")
      .then((blob) => {
        let formData = new FormData();
        let file = document.getElementById("profilepicture").files[0];

        let name = generateFileName(file.name);

        let token = getCookie("token");

        formData.append("profilepicture", blob, name, token);

        let headers = new Headers();
        headers.append("Accept", "Application/JSON");
        //headers.append('Content-type', 'Application/JSON')

        let req = new Request("/picture", {
          method: "post",
          headers,
          mode: "cors",
          body: formData,
        });

        return fetch(req);
      })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        document.getElementById("remove-picture").style.display = "block";
        document.getElementById("profilepics").src = data.profilePicture;
        document.getElementById("profilepictureform").reset();

        //document.getElementById('profilepictureform')
        $("#crop-modal").modal("hide");
      })
      .catch((e) => {
        console.log(e);
      });
  });

  function generateFileName(name) {
    const types = /(.jpeg|.jpg|.png|.gif)/;
    return name.replace(types, ".png");
  }

  $("#remove-picture").on("click", function (e) {
    let req = new Request("/picture", {
      method: "DELETE",
      mode: "cors",
    });

    fetch(req)
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("remove-picture").style.display = "none";
        document.getElementById("profilepics").src = data.profilePicture;
        document.getElementById("profilepictureform").reset();
      });
  });
};
