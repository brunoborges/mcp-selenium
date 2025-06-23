import { z } from "zod";
import pkg from 'selenium-webdriver';
const { until } = pkg;
import { getDriver, getLocator, locatorSchema } from '../../utils.js';

export const sendKeysTool = {
    name: "send_keys",
    description: "sends keys to an element, aka typing",
    inputSchema: {
        ...locatorSchema,
        text: z.string().describe("Text to enter into the element")
    },
    handler: async ({ by, value, text, timeout = 10000 }) => {
        try {
            const driver = getDriver();
            const locator = getLocator(by, value);
            const element = await driver.wait(until.elementLocated(locator), timeout);
            await element.clear();
            await element.sendKeys(text);
            return {
                content: [{ type: 'text', text: `Text "${text}" entered into element` }]
            };
        } catch (e) {
            return {
                content: [{ type: 'text', text: `Error entering text: ${e.message}` }]
            };
        }
    }
};