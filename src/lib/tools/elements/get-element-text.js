import pkg from 'selenium-webdriver';
const { until } = pkg;
import { getDriver, getLocator, locatorSchema } from '../../utils.js';

export const getElementTextTool = {
    name: "get_element_text",
    description: "gets the text() of an element",
    inputSchema: {
        ...locatorSchema
    },
    handler: async ({ by, value, timeout = 10000 }) => {
        try {
            const driver = getDriver();
            const locator = getLocator(by, value);
            const element = await driver.wait(until.elementLocated(locator), timeout);
            const text = await element.getText();
            return {
                content: [{ type: 'text', text }]
            };
        } catch (e) {
            return {
                content: [{ type: 'text', text: `Error getting element text: ${e.message}` }]
            };
        }
    }
};