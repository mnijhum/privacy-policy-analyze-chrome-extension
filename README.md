# Chrome Extension Upload Instructions

This guide explains how to upload and test this Chrome extension in your browser.

## Requirements

- Google Chrome browser
- clone this repository

## Steps to Upload the Extension in Chrome

1. **Open the Extensions Page**:
   
   Open Google Chrome and go to the Extensions page by entering the following in the address bar:

   ```
   chrome://extensions/
   ```

2. **Enable Developer Mode**:
   
   In the top-right corner, toggle **Developer mode** to **On**. This will allow you to load your unpacked extension.

3. **Load the Unpacked Extension**:
   
   - Click on the **Load unpacked** button.
   - In the file dialog, navigate to the folder containing your extension's files (this should include the `manifest.json` file).
   - Select the folder to load your extension.

4. **Verify the Extension**:

   - Once loaded, you should see your extension listed on the Extensions page.
   - Ensure there are no errors by checking for any warnings or error messages below your extension.

5. **Test the Extension**:
   
   - Click the extension icon in the Chrome toolbar, if available, to test its functionality.
   - If the extension does not appear in the toolbar, you can pin it by clicking the puzzle icon (Extensions) and selecting the pin next to your extension.

6. **Update the Extension** (if you make changes):
   
   - Return to the Extensions page and click the **Reload** button next to your extension to apply any updates you made to the code.
   
   - Alternatively, you can remove the extension and re-upload it if needed.

## Troubleshooting

- If your extension fails to load, make sure the `manifest.json` file is in the correct format.
- Check the console on the Extensions page for any error messages that might indicate what went wrong.

## Additional Information

Refer to the official [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/) for more details on developing and testing Chrome extensions.


