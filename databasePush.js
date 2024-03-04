const fs = require("fs");
const xlsx = require("xlsx");
const axios = require("axios");

// Read the Excel file
const workbook = xlsx.readFile("players.xlsx"); // Update the file name to match your Excel file

// Get the first worksheet from the Excel file
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// Convert the worksheet to an array of objects
const rows = xlsx.utils.sheet_to_json(worksheet);

// API URL
const API_URL = "http://localhost:5000/api/v1/players/createPlayers";

// Function to process a single row
const processRow = async (row, index) => {
  try {
    // Determine the value of overSeasFlag based on the value of the "Overseas" column
    let overSeasFlag;
    if (row["Overseas"] && row["Overseas"].toLowerCase() === "oversesas") {
      overSeasFlag = true;
    } else {
      overSeasFlag = false;
    }

    // Determine the value of isStarPlayer based on the value of the "Star Player" column
    let isStarPlayer;
    if (row["Star Player"] && row["Star Player"].toLowerCase() === "yes") {
      isStarPlayer = true;
    } else {
      isStarPlayer = false;
    }

    // Convert index to three-digit player number
    const playerNo = (index + 1).toString().padStart(3, "0");

    // Map Excel columns to API parameters
    const data = {
      image: row["image"],
      firstname: row["First Name"],
      surname: row["Surname"],
      country: row["Country"],
      Specialism: row["Specialism"],
      BattingStyle: row["Batting"],
      BowlingStyle: row["Bowling style"],
      iplRating: row["POINTS"],
      overSeasFlag: overSeasFlag,
      isStarPlayer: isStarPlayer,
      playerNo: playerNo,
    };

    // Send a POST request to the API
    const response = await axios.post(API_URL, data);
    console.log(
      `Data for Row ${index + 1} posted successfully:`,
      response.data
    );
  } catch (error) {
    console.log(error);
    console.error(`Error processing Row ${index + 1}: ${error.message}`);
  }
};

// Process the first 5 rows
(async () => {
  for (let i = 0; i < Math.min(5, rows.length); i++) {
    await processRow(rows[i], i);
  }

  console.log("First 5 rows of the Excel file processed.");
})();
