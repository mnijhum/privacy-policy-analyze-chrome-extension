chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "findPrivacyPolicy") {
    const policyUrl = findPrivacyPolicyUrl();
    console.log("Found privacy policy URL: ", policyUrl);
    sendResponse({ policyUrl });
  }
});

function findPrivacyPolicyUrl() {
  // Search for links that might contain a privacy policy or terms and conditions.
  const linkElements = document.querySelectorAll("a");
  for (const element of linkElements) {
    const linkText = element.innerText.toLowerCase();
    if (
      linkText.includes("privacy policy") ||
      linkText.includes("privacy") ||
      linkText.includes("terms") ||
      linkText.includes("conditions")
    ) {
      console.log("Found link:", element.href);
      return element.href; // Return the href attribute of the link
    }
  }

  return null; // If no matching link is found
}

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "findPrivacyPolicy") {
//     console.log("Message received to find privacy policy"); // Add this line
//     const policyText = findPrivacyPolicyText();
//     console.log("Policy in content file ", policyText); // This line is already present
//     sendResponse({ policyText });
//   }
// });

// function findPrivacyPolicyText() {
//   // Create an array to hold all relevant text content
//   let foundText = [];

//   // Search for links that might contain a privacy policy or terms
//   const linkElements = document.querySelectorAll("a");
//   for (const element of linkElements) {
//     if (
//       element.innerText.toLowerCase().includes("privacy") ||
//       element.innerText.toLowerCase().includes("policy") ||
//       element.innerText.toLowerCase().includes("terms") ||
//       element.innerText.toLowerCase().includes("conditions")
//     ) {
//       console.log("Found link with relevant text: ", element.innerText);
//       foundText.push(`Link text: ${element.innerText}, URL: ${element.href}`);
//     }
//   }

//   // Search for text elements with privacy-related keywords
//   const textElements = document.querySelectorAll("p, div, span");
//   for (const element of textElements) {
//     const textContent = element.innerText.toLowerCase();
//     if (
//       textContent.includes("privacy") ||
//       textContent.includes("policy") ||
//       textContent.includes("terms") ||
//       textContent.includes("conditions")
//     ) {
//       if (textContent.length > 200) {
//         // Capturing larger text blocks
//         foundText.push(`Text: ${element.innerText}`);
//       }
//     }
//   }

//   // If relevant text was found, join it into a single string
//   if (foundText.length > 0) {
//     return foundText.join("\n\n");
//   }

//   return null; // Return null if no relevant text was found
// }
