import pkg from 'selenium-webdriver';
const { until } = pkg;
import { getDriver, getLocator, locatorSchema } from '../../utils.js';

export const doubleClickTool = {
    name: "double_click",
    description: "performs a double click on an element",
    inputSchema: {
        ...locatorSchema
    },
    handler: async ({ by, value, timeout = 10000 }) => {
        try {
            const driver = getDriver();
            const locator = getLocator(by, value);
            const element = await driver.wait(until.elementLocated(locator), timeout);
            const actions = driver.actions({ bridge: true });
            await actions.doubleClick(element).perform();
            return {
                content: [{ type: 'text', text: 'Double click performed' }]
            };
        } catch (e) {
            return {
                content: [{ type: 'text', text: `Error performing double click: ${e.message}` }]
            };
        }
    }
};