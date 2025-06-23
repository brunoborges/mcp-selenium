import { z } from "zod";
import pkg from 'selenium-webdriver';
const { until } = pkg;
import { getDriver, getLocator, locatorSchema } from '../../utils.js';

export const dragAndDropTool = {
    name: "drag_and_drop",
    description: "drags an element and drops it onto another element",
    inputSchema: {
        ...locatorSchema,
        targetBy: z.enum(["id", "css", "xpath", "name", "tag", "class"]).describe("Locator strategy to find target element"),
        targetValue: z.string().describe("Value for the target locator strategy")
    },
    handler: async ({ by, value, targetBy, targetValue, timeout = 10000 }) => {
        try {
            const driver = getDriver();
            const sourceLocator = getLocator(by, value);
            const targetLocator = getLocator(targetBy, targetValue);
            
            const sourceElement = await driver.wait(until.elementLocated(sourceLocator), timeout);
            const targetElement = await driver.wait(until.elementLocated(targetLocator), timeout);
            
            const actions = driver.actions({ bridge: true });
            await actions.dragAndDrop(sourceElement, targetElement).perform();
            
            return {
                content: [{ type: 'text', text: 'Drag and drop completed' }]
            };
        } catch (e) {
            return {
                content: [{ type: 'text', text: `Error performing drag and drop: ${e.message}` }]
            };
        }
    }
};