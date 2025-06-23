// Browser management tools
import { startBrowserTool } from './browser/start-browser.js';
import { navigateTool } from './browser/navigate.js';
import { closeSessionTool } from './browser/close-session.js';
import { takeScreenshotTool } from './browser/take-screenshot.js';

// Element interaction tools
import { findElementTool } from './elements/find-element.js';
import { clickElementTool } from './elements/click-element.js';
import { sendKeysTool } from './elements/send-keys.js';
import { getElementTextTool } from './elements/get-element-text.js';
import { uploadFileTool } from './elements/upload-file.js';

// Advanced interaction tools
import { hoverTool } from './interactions/hover.js';
import { dragAndDropTool } from './interactions/drag-and-drop.js';
import { doubleClickTool } from './interactions/double-click.js';
import { rightClickTool } from './interactions/right-click.js';
import { pressKeyTool } from './interactions/press-key.js';

// Re-export individual tools
export {
    startBrowserTool,
    navigateTool,
    closeSessionTool,
    takeScreenshotTool,
    findElementTool,
    clickElementTool,
    sendKeysTool,
    getElementTextTool,
    uploadFileTool,
    hoverTool,
    dragAndDropTool,
    doubleClickTool,
    rightClickTool,
    pressKeyTool
};

// Export all tools as an array for easy registration
export const allTools = [
    startBrowserTool,
    navigateTool,
    closeSessionTool,
    takeScreenshotTool,
    findElementTool,
    clickElementTool,
    sendKeysTool,
    getElementTextTool,
    uploadFileTool,
    hoverTool,
    dragAndDropTool,
    doubleClickTool,
    rightClickTool,
    pressKeyTool
];