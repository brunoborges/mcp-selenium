import { z } from "zod";
import pkg from 'selenium-webdriver';
const { By } = pkg;
import { state } from './state.js';

// Helper functions
export const getDriver = () => {
    const driver = state.drivers.get(state.currentSession);
    if (!driver) {
        throw new Error('No active browser session');
    }
    return driver;
};

export const getLocator = (by, value) => {
    switch (by.toLowerCase()) {
        case 'id': return By.id(value);
        case 'css': return By.css(value);
        case 'xpath': return By.xpath(value);
        case 'name': return By.name(value);
        case 'tag': return By.css(value);
        case 'class': return By.className(value);
        default: throw new Error(`Unsupported locator strategy: ${by}`);
    }
};

// Common schemas
export const browserOptionsSchema = z.object({
    headless: z.boolean().optional().describe("Run browser in headless mode"),
    arguments: z.array(z.string()).optional().describe("Additional browser arguments")
}).optional();

export const locatorSchema = {
    by: z.enum(["id", "css", "xpath", "name", "tag", "class"]).describe("Locator strategy to find element"),
    value: z.string().describe("Value for the locator strategy"),
    timeout: z.number().optional().describe("Maximum time to wait for element in milliseconds")
};

// Cleanup handler
export async function cleanup() {
    for (const [sessionId, driver] of state.drivers) {
        try {
            await driver.quit();
        } catch (e) {
            console.error(`Error closing browser session ${sessionId}:`, e);
        }
    }
    state.drivers.clear();
    state.currentSession = null;
    process.exit(0);
}