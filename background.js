chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchPrivacyPolicy") {
    const url = request.url;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((data) => {
        // Send the raw HTML content to the content script
        chrome.scripting.executeScript(
          {
            target: { tabId: sender.tab.id },
            func: extractPrivacyText,
            args: [data], // Pass the HTML content as an argument
          },
          (result) => {
            // Return the extracted text to the background script
            sendResponse({ policyText: result[0].result });
          }
        );
      })
      .catch((error) => {
        console.error("Error fetching the privacy policy:", error);
        sendResponse({ policyText: "Error fetching the privacy policy." });
      });

    return true; // Keep the message channel open for sendResponse
  }
});

// Function to be executed in the context of the content script
function extractPrivacyText(htmlContent) {
  // Create a DOM parser to extract text from HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  // Extract all relevant text (adjust as necessary for your needs)
  const textContent = Array.from(doc.body.querySelectorAll("p, div"))
    .map((el) => el.innerText)
    .join("\n");

  return textContent; // Return the text to be sent back to the background script
}
