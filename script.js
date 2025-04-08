// DOM references
const sizeInput = document.getElementById("download-size");
const sizeUnitSelect = document.getElementById("size-unit");
const speedInput = document.getElementById("download-speed");
const speedUnitSelect = document.getElementById("speed-unit");
const resultDiv = document.getElementById("result");

/**
 * Convert the entered file size to MB (megabytes).
 * Supports: KB, Kb, MB, Mb, GB, Gb, TB, Tb.
 */
function convertSizeToMB(value, unit) {
  switch (unit) {
    case "KB":
      return value / 1024;
    case "Kb":
      return value / 8192; // 1 Kb = 1/8192 MB
    case "MB":
      return value;
    case "Mb":
      return value / 8;
    case "GB":
      return value * 1024;
    case "Gb":
      return (value * 1024) / 8;
    case "TB":
      return value * 1024 * 1024;
    case "Tb":
      return (value * 1024 * 1024) / 8;
    default:
      return 0;
  }
}

/**
 * Convert the entered download speed to MB/s.
 * Supports: KB/s, Kb/s, MB/s, Mb/s, GB/s, Gb/s, TB/s, Tb/s.
 */
function convertSpeedToMBps(value, unit) {
  switch (unit) {
    case "KB/s":
      return value / 1024;
    case "Kb/s":
      return value / 8192;
    case "MB/s":
      return value;
    case "Mb/s":
      return value / 8;
    case "GB/s":
      return value * 1024;
    case "Gb/s":
      return (value * 1024) / 8;
    case "TB/s":
      return value * 1024 * 1024;
    case "Tb/s":
      return (value * 1024 * 1024) / 8;
    default:
      return 0;
  }
}

/**
 * Takes a total time in seconds and returns a string like
 * "X hours, Y minutes, Z seconds".
 * - Handles fractional seconds (e.g., 3.25 seconds).
 * - Skips any zero values in hours/minutes.
 */
function formatTimeHMS(totalSeconds) {
  // Hours
  const hours = Math.floor(totalSeconds / 3600);
  let remainder = totalSeconds - hours * 3600;

  // Minutes
  const minutes = Math.floor(remainder / 60);
  remainder = remainder - minutes * 60;

  // Seconds (could be fractional)
  let seconds = remainder;

  // Format the seconds to 2 decimal places
  let secondsStr = seconds.toFixed(2);
  // If it's an integer (like "3.00"), remove ".00"
  if (secondsStr.endsWith(".00")) {
    secondsStr = secondsStr.slice(0, -3); // remove the .00
  }

  // Build a parts array to skip empty values gracefully
  const parts = [];
  if (hours > 0) {
    parts.push(`${hours} hour${hours === 1 ? "" : "s"}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} minute${minutes === 1 ? "" : "s"}`);
  }
  // Only push seconds part if it's > 0 or everything else is zero
  if (hours === 0 && minutes === 0 && secondsStr === "0") {
    // If total time is < 1 second
    parts.push(`0 seconds`);
  } else if (Number(secondsStr) > 0) {
    parts.push(`${secondsStr} second${secondsStr === "1" ? "" : "s"}`);
  }

  // If no parts (edge case: totalSeconds was extremely small?), just say "0 seconds"
  if (parts.length === 0) {
    return "0 seconds";
  }

  return parts.join(", ");
}

/**
 * Main calculation and validation.
 */
function calculateDownloadTime() {
  // Read the user inputs
  const sizeValue = parseFloat(sizeInput.value);
  const speedValue = parseFloat(speedInput.value);

  // Basic validation: Check for non-numeric
  if (isNaN(sizeValue) || isNaN(speedValue)) {
    resultDiv.textContent =
      "Please enter valid numeric values for size and speed.";
    return;
  }

  // Validate zero or negative
  if (sizeValue <= 0) {
    resultDiv.textContent = "File size must be greater than 0.";
    return;
  }
  if (speedValue <= 0) {
    resultDiv.textContent = "Speed must be greater than 0.";
    return;
  }

  // Unit selection
  const sizeUnit = sizeUnitSelect.value;
  const speedUnit = speedUnitSelect.value;

  // Convert to MB and MB/s
  const sizeInMB = convertSizeToMB(sizeValue, sizeUnit);
  const speedInMBps = convertSpeedToMBps(speedValue, speedUnit);

  // If either is invalid or zero, show error
  if (sizeInMB <= 0 || speedInMBps <= 0) {
    resultDiv.textContent = "Invalid unit conversion. Please check your values.";
    return;
  }

  // Calculate time in SECONDS
  const timeInSeconds = sizeInMB / speedInMBps;

  // Format the result in H, M, S
  const formattedHMS = formatTimeHMS(timeInSeconds);

  // Display
  resultDiv.textContent = `Estimated Download Time: ${formattedHMS}`;
}

// Event listeners
sizeInput.addEventListener("input", calculateDownloadTime);
sizeUnitSelect.addEventListener("change", calculateDownloadTime);
speedInput.addEventListener("input", calculateDownloadTime);
speedUnitSelect.addEventListener("change", calculateDownloadTime);
