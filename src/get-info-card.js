export function getInfoCard() {
  let infoCard = document.createElement("div");
  infoCard.className = "info-card";
  let timeDiv = document.createElement("div");
  timeDiv.className = "time";

  let iconDiv = document.createElement("div");
  iconDiv.className = "icon";
  let iconImg = document.createElement("div");
  iconImg.className = "icon-file";
  iconDiv.appendChild(iconImg);
  let conditionDiv = document.createElement("div");
  conditionDiv.className = "condition info";

  let tempDiv = document.createElement("div");
  tempDiv.className = "temp info";
  let tempName = document.createElement("div");
  tempName.textContent = "Temperature:";
  tempName.className = "info-name";
  let tempValue = document.createElement("div");
  tempValue.className = "info-value";
  tempDiv.appendChild(tempName);
  tempDiv.appendChild(tempValue);

  let precipDiv = document.createElement("div");
  precipDiv.className = "precip info";
  let precipName = document.createElement("div");
  precipName.className = "info-name";
  precipName.textContent = "Precipitation:";
  let precipValue = document.createElement("div");
  precipValue.className = "info-value";
  precipDiv.appendChild(precipName);
  precipDiv.appendChild(precipValue);

  let cloudCoverDiv = document.createElement("div");
  cloudCoverDiv.className = "cloud-cover info";
  let cloudCoverName = document.createElement("div");
  cloudCoverName.className = "info-name";
  cloudCoverName.textContent = "Cloud cover: ";
  let cloudCoverValue = document.createElement("div");
  cloudCoverValue.className = "info-value";
  cloudCoverDiv.appendChild(cloudCoverName);
  cloudCoverDiv.appendChild(cloudCoverValue);

  let windSpeedDiv = document.createElement("div");
  windSpeedDiv.className = "wind-speed info";
  let windSpeedName = document.createElement("div");
  windSpeedName.className = "info-name";
  windSpeedName.textContent = "Wind speed: ";
  let windSpeedValue = document.createElement("div");
  windSpeedValue.className = "info-value";
  windSpeedDiv.appendChild(windSpeedName);
  windSpeedDiv.appendChild(windSpeedValue);

  let visibilityDiv = document.createElement("div");
  visibilityDiv.className = "visibility info";
  let visibilityName = document.createElement("div");
  visibilityName.className = "info-name";
  visibilityName.textContent = "Visibility: ";
  let visibilityValue = document.createElement("div");
  visibilityValue.className = "info-value";
  visibilityDiv.appendChild(visibilityName);
  visibilityDiv.appendChild(visibilityValue);

  let uvIndexDiv = document.createElement("div");
  uvIndexDiv.className = "uv-index info";
  let uvIndexName = document.createElement("div");
  uvIndexName.className = "info-name";
  uvIndexName.textContent = "UV Index: ";
  let uvIndexValue = document.createElement("div");
  uvIndexValue.className = "info-value";
  uvIndexDiv.appendChild(uvIndexName);
  uvIndexDiv.appendChild(uvIndexValue);

  infoCard.appendChild(timeDiv);
  infoCard.appendChild(iconDiv);
  infoCard.appendChild(conditionDiv);
  infoCard.appendChild(tempDiv);
  infoCard.appendChild(precipDiv);
  infoCard.appendChild(cloudCoverDiv);
  infoCard.appendChild(windSpeedDiv);
  infoCard.appendChild(visibilityDiv);
  infoCard.appendChild(uvIndexDiv);
  return infoCard;
}
