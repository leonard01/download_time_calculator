/* GLOBAL STYLES */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

/* BODY BACKGROUND */
body {
  /* Subtle gradient background */
  background: linear-gradient(to bottom right, #eef2f3, #ffffff);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* CONTAINER */
.container {
  background: #ffffffee; /* Slightly transparent white */
  backdrop-filter: blur(6px);
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 90%;
  padding: 20px;
  text-align: center;
}

/* MAIN TITLE */
.container h1 {
  margin-bottom: 20px;
  font-size: 1.8em;
  color: #333;
}

/* SECTION HEADING */
.section {
  margin-bottom: 20px;
}

.section h2 {
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #555;
}

/* INPUT GROUP */
.input-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

/* INPUTS AND SELECTS */
input,
select {
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* RESULT TEXT */
.result {
  margin-top: 25px;
  font-weight: bold;
  font-size: 1.25em;
  color: #444;
}
