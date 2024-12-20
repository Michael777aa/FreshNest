console.log("Products frontend javascript file");
$(function () {
  $(".product-collection").on("change", () => {
    const selectedValue = $(".product-collection").val();
    if (selectedValue === "DRINK") {
      $("#product-volume").show();
      $("#product-collection").hide();
    } else {
      $("#product-volume").hide();
      $("#product-collection").show();
    }
  });

  $("#process-btn").on("click", () => {
    $(".dish-container").slideToggle(500);
    $("#process-btn").css("display", "none");
  });

  $("#cancel-btn").on("click", () => {
    $(".dish-container").slideToggle(100);
    $("#cancel-btn").css("display", "flex");
  });
  $(".new-product-status").on("change", async function (e) {
    const id = e.target.id;
    const eventStatus = $(`#${id}.new-product-status`).val();
    console.log("id:", id);
    console.log("eventStatus", eventStatus);

    try {
      const response = await axios.post(`/admin/event/${id}`, {
        eventStatus: eventStatus,
      });
      console.log("response", response);
      const result = response.data;
      if (result.data) {
        $(".new-product-status").blur();
      } else alert("Product update failed!");
    } catch (err) {
      console.log(err);
      alert("Product update failed!");
    }
  });
});
function validateForm() {
  const eventName = $(".event-name").val();
  const eventTopic = $(".event-topic").val();
  const eventDesc = $(".event-desc").val();
  const eventLocation = $(".event-location").val();
  const eventStatus = $(".event-status").val();

  if (
    eventName === "" ||
    eventTopic === "" ||
    eventDesc === "" ||
    eventLocation === "" ||
    eventStatus === ""
  ) {
    alert("Please insert all required inputs");
    return false;
  } else return true;
}
function previewFileHandler(input, order) {
  const imgClassName = input.className;
  const file = $(`.${imgClassName}`).get(0).files[0],
    fileType = file["type"],
    validImageType = ["image/jpg", "image/jpeg", "image/png"];
  if (!validImageType.includes(fileType)) {
    alert("Please, insert only jpeg, jpg and png!");
  } else {
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        $(`#image-section-${order}`).attr("src", reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
}
