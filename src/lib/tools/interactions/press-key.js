import { z } from "zod";
import { getDriver } from '../../utils.js';

export const pressKeyTool = {
    name: "press_key",
    description: "simulates pressing a keyboard key",
    inputSchema: {
        key: z.string().describe("Key to press (e.g., 'Enter', 'Tab', 'a', etc.)")
    },
    handler: async ({ key }) => {
        try {
            const driver = getDriver();
            const actions = driver.actions({ bridge: true });
            await actions.keyDown(key).keyUp(key).perform();
            return {
                content: [{ type: 'text', text: `Key '${key}' pressed` }]
            };
        } catch (e) {
            return {
                content: [{ type: 'text', text: `Error pressing key: ${e.message}` }]
            };
        }
    }
};