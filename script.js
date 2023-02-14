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

const playersTable = document.getElementById("players-table")
const thArray = Array.from(playersTable.querySelectorAll("th"))
const tbody = playersTable.querySelector("tbody")
let tBodyRows = Array.from(tbody.querySelectorAll("tr"))

thArray.forEach((th, index) => {
 th.addEventListener("click", () => {
  // Sort rows by the clicked column
  tBodyRows.sort((a, b) => {
   const aValue = a.getElementsByTagName("td")[index].textContent
   const bValue = b.getElementsByTagName("td")[index].textContent
   return aValue.localeCompare(bValue, undefined, { numeric: true })
  })

  // Reverse the order if the clicked column is already sorted in ascending order
  if (th.getAttribute("aria-sort") === "ascending") {
   tBodyRows.reverse()
   th.setAttribute("aria-sort", "descending")
  } else {
   // Set the clicked column as the new sorting column
   thArray.forEach((th) => {
    th.setAttribute("aria-sort", "none")
   })
   th.setAttribute("aria-sort", "ascending")
  }

  // Update the table with the sorted rows
  tBodyRows.forEach((row) => {
   tbody.appendChild(row)
  })
 })
})

const filterSearch = document.querySelector("#filter-search")
const tableRows = document.querySelectorAll("#players-table tbody tr")

filterSearch.addEventListener("input", () => {
 const searchTerm = filterSearch.value.trim().toLowerCase()

 tBodyRows.forEach((row) => {
  const [id, name, fed, title, rtgF, rtgN] = Array.from(row.querySelectorAll("td")).map((cell) => cell.textContent.trim().toLowerCase())

  //   const id = row.querySelector("td:nth-child(1)").textContent.trim().toLowerCase()
  //   const name = row.querySelector("td:nth-child(2)").textContent.trim().toLowerCase()
  //   const fed = row.querySelector("td:nth-child(3)").textContent.trim().toLowerCase()
  //   const title = row.querySelector("td:nth-child(4)").textContent.trim().toLowerCase()
  //   const rtgF = row.querySelector("td:nth-child(5)").textContent.trim().toLowerCase()
  //   const rtgN = row.querySelector("td:nth-child(6)").textContent.trim().toLowerCase()
  const matches = [id, name, fed, title, rtgF, rtgN].some((field) => field.includes(searchTerm))
  row.style.display = matches ? "" : "none"
 })
})
