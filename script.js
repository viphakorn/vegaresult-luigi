const menuButton = document.querySelector(".menu-button")
const navList = document.querySelector("#navigation-list")

menuButton.addEventListener("click", () => {
 const isOpened = menuButton.getAttribute("aria-expanded") === "true"
 isOpened ? closeMenu() : openMenu()
})

function openMenu() {
 menuButton.setAttribute("aria-expanded", "true")
 navList.setAttribute("data-state", "opened")
}
function closeMenu() {
 menuButton.setAttribute("aria-expanded", "false")
 navList.setAttribute("data-state", "closing")

 navList.addEventListener(
  "animationend",
  () => {
   navList.setAttribute("data-state", "closed")
  },
  { once: true }
 )
}

const dropdownButton = document.querySelector("#dropdown-button")
const dropdownList = document.querySelector(".dropdown-list")

dropdownButton.addEventListener("click", () => {
 dropdownList.hidden = !dropdownList.hidden
 dropdownButton.setAttribute("aria-expanded", !dropdownList.hidden)
})

const filterSearch = document.querySelector("#filter-search")
const tableRows = document.querySelectorAll("#players-table tbody tr")

filterSearch.addEventListener("input", () => {
 const searchTerm = filterSearch.value.trim().toLowerCase()

 tableRows.forEach((row) => {
  const [id, name, fed, title, rtgF, rtgN] = Array.from(row.querySelectorAll("td")).map((cell) => cell.textContent.trim().toLowerCase())
  const matches = [id, name, fed, title, rtgF, rtgN].some((field) => field.includes(searchTerm))
  row.style.display = matches ? "" : "none"
 })
})
