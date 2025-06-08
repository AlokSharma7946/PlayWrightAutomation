const { test, expect } = require('@playwright/test');

test.only('More Validations', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    // await page.goto("https://www.google.com/");
    // await page.goBack();
    // await page.goForward();

    //toBeVisible() to verify element visible on screen
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    //toBeHidden() to verify element Hidden on screen
    await expect(page.locator('#displayed-text')).toBeHidden();

    //Javascript popups/ alerts handling
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();

    //frames handling
    const framesPage = page.frameLocator('#courses-iframe');
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textcheck = await framesPage.locator(".text h2").textContent();
    console.log(textcheck.split(" ")[1]);
});