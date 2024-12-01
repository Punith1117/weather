import { createInputDiv } from ".";

export function displayTab(tabName) {
  let currentTabContent = document.querySelector(".tab-content");
  currentTabContent.innerHTML = "";
  currentTabContent.className = `tab-content ${tabName}-tab`;
  let inputDiv = createInputDiv(`${tabName}`);
  let locationDiv = document.createElement("div");
  locationDiv.className = "location";
  let searchResultDiv = document.createElement("div");
  searchResultDiv.className = "search-result";
  currentTabContent.appendChild(inputDiv);
  currentTabContent.appendChild(locationDiv);
  currentTabContent.appendChild(searchResultDiv);
}
