document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
  const analyzeButton = document.getElementById("analyzeButton");

  analyzeButton.addEventListener("click", () => {
    console.log("Analyze button clicked");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "findPrivacyPolicy" },
        (response) => {
          const resultDiv = document.getElementById("result");
          if (response && response.policyUrl) {
            sendPolicyTextToServer(response.policyUrl)
              .then((data) => {
                if (data && data.analysis) {
                  resultDiv.innerHTML = ""; // Clear previous results

                  // Split analysis into lines
                  const lines = data.analysis.split("\n");

                  lines.forEach((line) => {
                    const ratingMatch = line.match(/-\s(\d)/); // Find rating numbers
                    const rating = ratingMatch
                      ? parseInt(ratingMatch[1])
                      : null;

                    // Create a paragraph element for each line
                    const para = document.createElement("p");
                    para.innerText = line;

                    // Add background color class based on rating
                    if (rating !== null) {
                      if (rating >= 4) {
                        para.classList.add("rating-high");
                      } else if (rating === 3) {
                        para.classList.add("rating-medium");
                      } else if (rating === 2) {
                        para.classList.add("rating-low");
                      } else if (rating < 2) {
                        para.classList.add("rating-very-low");
                      }
                    }
                    resultDiv.appendChild(para);
                  });
                } else {
                  resultDiv.innerHTML = "Failed to analyze the privacy policy.";
                }
              })
              .catch((error) => {
                resultDiv.innerHTML = "Error analyzing the privacy policy.";
                console.error("Error:", error);
              });
          } else {
            resultDiv.innerHTML = "No privacy policy or terms found.";
          }
        }
      );
    });
  });
});

function sendPolicyTextToServer(text) {
  return fetch("http://127.0.0.1:5000/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ policyText: text }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}
