import { state } from '../../state.js';
import { getDriver } from '../../utils.js';

export const closeSessionTool = {
    name: "close_session",
    description: "closes the current browser session",
    inputSchema: {},
    handler: async () => {
        try {
            const driver = getDriver();
            await driver.quit();
            state.drivers.delete(state.currentSession);
            const sessionId = state.currentSession;
            state.currentSession = null;
            return {
                content: [{ type: 'text', text: `Browser session ${sessionId} closed` }]
            };
        } catch (e) {
            return {
                content: [{ type: 'text', text: `Error closing session: ${e.message}` }]
            };
        }
    }
};