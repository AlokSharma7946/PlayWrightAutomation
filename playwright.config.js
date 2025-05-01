// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  //provide the tests path
  testDir: './tests',
  //provide golbal timeout for wait if we dont provide default value is 30 seconds
  timeout: 40 * 1000,
  //tmeout for assertion validations
  expect: {
    timeout: 40 * 1000,
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

  },

});

