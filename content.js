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
