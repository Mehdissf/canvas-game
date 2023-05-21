function spara() {
  let svårighetsgrad = document.getElementById("svårighetsgrad").value;
  console.log("Svårighetsgraden är inställd på: " + svårighetsgrad);
  switch (svårighetsgrad) {
    case "lätt":
      platform.svårighetsgrad = "lätt";
      break;
    case "medel":
      platform.svårighetsgrad = "medel";
      break;
    case "svår":
      platform.svårighetsgrad = "svår";
      break;
    default:
      platform.svårighetsgrad = "medel";
  }

  platform.fart = platform.fartnivå();
  platform2.fart = platform.fartnivå();
  platform3.fart = platform.fartnivå();
}
