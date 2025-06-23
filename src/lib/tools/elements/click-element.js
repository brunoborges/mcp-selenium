import pkg from 'selenium-webdriver';
const { until } = pkg;
import { getDriver, getLocator, locatorSchema } from '../../utils.js';

export const clickElementTool = {
    name: "click_element",
    description: "clicks an element",
    inputSchema: {
        ...locatorSchema
    },
    handler: async ({ by, value, timeout = 10000 }) => {
        try {
            const driver = getDriver();
            const locator = getLocator(by, value);
            const element = await driver.wait(until.elementLocated(locator), timeout);
            await element.click();
            return {
                content: [{ type: 'text', text: 'Element clicked' }]
            };
        } catch (e) {
            return {
                content: [{ type: 'text', text: `Error clicking element: ${e.message}` }]
            };
        }
    }
};