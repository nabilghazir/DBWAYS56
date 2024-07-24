function openHamburger() {
  var hamburgerContainer = document.getElementById("hamburger");
  var dropdownMenu = document.getElementById("dropdown");

  hamburgerContainer.classList.toggle("open");
  dropdownMenu.style.display =
    dropdownMenu.style.display === "flex" ? "none" : "flex";
}
