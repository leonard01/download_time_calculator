// Grab references to the input fields and the result div
const sizeInput = document.getElementById("download-size");
const speedInput = document.getElementById("download-speed");
const resultDiv = document.getElementById("result");

// A function to calculate and display the download time
function calculateDownloadTime() {
  // Get the numerical values (parseFloat will handle decimals)
  const size = parseFloat(sizeInput.value);
  const speed = parseFloat(speedInput.value);

  // If either input is not a valid number, clear the result
  if (isNaN(size) || isNaN(speed) || speed === 0) {
    resultDiv.textContent = "";
    return;
  }

  // Calculate time in seconds: time = size (MB) / speed (MB/s)
  const timeInSeconds = size / speed;

  // Display the result
  // Example: "Estimated Download Time: 10 seconds"
  resultDiv.textContent = `Estimated Download Time: ${timeInSeconds.toFixed(2)} seconds`;
}

// Listen for changes in both inputs
sizeInput.addEventListener("input", calculateDownloadTime);
speedInput.addEventListener("input", calculateDownloadTime);
