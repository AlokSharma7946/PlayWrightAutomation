const { test, expect } = require('@playwright/test');

test('First PlayWright Test', async function ({ browser }) {
    //chrome-plugins/cookies provide as parameter in context
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test('Page PlayWright Test', async ({ page }) => {
    //chrome-plugins/cookies provide as parameter in context
    await page.goto("https://linkedin.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("LinkedIn: Log In or Sign Up");
});

test('@Web Browser Context-validating Error Login', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator("#username");
    const signIn = page.locator("[type='submit']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //css-recommended or xpath
    await username.fill("learning");
    await page.locator("[id='password']").fill("learning");
    await signIn.click();
    console.log(await page.title());
    const errorMessage = await page.locator("[style*='block']").textContent();
    console.log(errorMessage);
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');

    await username.fill("");
    await username.fill("rahulshettyacademy");
    signIn.click();

    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").last().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());




});

test("Assignment Test", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("ananyasinhaa007@gmail.com");
    await page.locator("#userPassword").fill("79@Water46");
    await page.locator("#login").click();

    // console.log(await page.locator(".card-body b").nth(0).textContent());
    await page.locator(".card-body b").first().waitFor();
    console.log(await page.locator(".card-body b").allTextContents());

});

test("Static Dropdowns test", async ({ page }) => {
    page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const dropdown = page.locator("select.form-control");
    const documentlink = page.locator("[href*='documents-request']");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    //checking if radio button is successfully checked
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await page.locator("#terms").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await page.locator("#terms").uncheck();
    await expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentlink).toHaveAttribute("class", "blinkingText");
    // await page.pause();
});

test.only("Child Window", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const documentlink = page.locator("[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentlink.click()
        ]
    )
    const text = await newPage.locator(".red").textContent();

    const domain = text.split("@")[1].split(" ")[0];
    await console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").textContent());
    // await page.pause();
});