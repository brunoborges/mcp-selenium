import { z } from "zod";
import { getDriver } from '../../utils.js';

export const navigateTool = {
    name: "navigate",
    description: "navigates to a URL",
    inputSchema: {
        url: z.string().describe("URL to navigate to")
    },
    handler: async ({ url }) => {
        try {
            const driver = getDriver();
            await driver.get(url);
            return {
                content: [{ type: 'text', text: `Navigated to ${url}` }]
            };
        } catch (e) {
            return {
                content: [{ type: 'text', text: `Error navigating: ${e.message}` }]
            };
        }
    }
};