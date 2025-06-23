import { z } from "zod";
import { getDriver } from '../../utils.js';

export const takeScreenshotTool = {
    name: "take_screenshot",
    description: "captures a screenshot of the current page",
    inputSchema: {
        outputPath: z.string().optional().describe("Optional path where to save the screenshot. If not provided, returns base64 data.")
    },
    handler: async ({ outputPath }) => {
        try {
            const driver = getDriver();
            const screenshot = await driver.takeScreenshot();
            
            if (outputPath) {
                const fs = await import('fs');
                await fs.promises.writeFile(outputPath, screenshot, 'base64');
                return {
                    content: [{ type: 'text', text: `Screenshot saved to ${outputPath}` }]
                };
            } else {
                return {
                    content: [
                        { type: 'text', text: 'Screenshot captured as base64:' },
                        { type: 'text', text: screenshot }
                    ]
                };
            }
        } catch (e) {
            return {
                content: [{ type: 'text', text: `Error taking screenshot: ${e.message}` }]
            };
        }
    }
};