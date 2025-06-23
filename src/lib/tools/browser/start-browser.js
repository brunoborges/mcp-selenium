import { z } from "zod";
import pkg from 'selenium-webdriver';
const { Builder } = pkg;
import { Options as ChromeOptions } from 'selenium-webdriver/chrome.js';
import { Options as FirefoxOptions } from 'selenium-webdriver/firefox.js';
import { state } from '../../state.js';
import { browserOptionsSchema } from '../../utils.js';

export const startBrowserTool = {
    name: "start_browser",
    description: "launches browser",
    inputSchema: {
        browser: z.enum(["chrome", "firefox"]).describe("Browser to launch (chrome or firefox)"),
        options: browserOptionsSchema
    },
    handler: async ({ browser, options = {} }) => {
        try {
            let builder = new Builder();
            let driver;

            if (browser === 'chrome') {
                const chromeOptions = new ChromeOptions();
                if (options.headless) {
                    chromeOptions.addArguments('--headless=new');
                }
                if (options.arguments) {
                    options.arguments.forEach(arg => chromeOptions.addArguments(arg));
                }
                
                driver = await builder
                    .forBrowser('chrome')
                    .setChromeOptions(chromeOptions)
                    .build();
            } else {
                const firefoxOptions = new FirefoxOptions();
                if (options.headless) {
                    firefoxOptions.addArguments('--headless');
                }
                if (options.arguments) {
                    options.arguments.forEach(arg => firefoxOptions.addArguments(arg));
                }
                
                driver = await builder
                    .forBrowser('firefox')
                    .setFirefoxOptions(firefoxOptions)
                    .build();
            }

            const sessionId = `${browser}_${Date.now()}`;
            state.drivers.set(sessionId, driver);
            state.currentSession = sessionId;

            return {
                content: [{ type: 'text', text: `Browser started with session_id: ${sessionId}` }]
            };
        } catch (e) {
            return {
                content: [{ type: 'text', text: `Error starting browser: ${e.message}` }]
            };
        }
    }
};