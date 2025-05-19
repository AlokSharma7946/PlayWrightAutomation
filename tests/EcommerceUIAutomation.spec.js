const { test, expect } = require('@playwright/test');

test.only('login', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('#userEmail').fill("ananyasinhaa007@gmail.com");
    await page.locator('#userPassword').fill("79@Water46");
    await page.locator('#login').click();

    await page.locator('.card-body b').first().waitFor();
    const product = await page.locator('.card-body b').allTextContents();
    let productName = '';
    let quantity = "1";
    for (let i = 0; i < product.length; i++) {
        if (await page.locator('.card-body b').nth(i).textContent() === 'IPHONE 13 PRO') {
            productName = await page.locator('.card-body b').nth(i).textContent();
            await page
                .locator('.btn.w-10.rounded')
                .nth(i)
                .click();

            break;
        }
    }

    await page.locator('button[routerlink="/dashboard/cart"]').click();
    await expect(await page.locator('.cartSection h3')).toHaveText(productName);
    await page.locator('.btn.btn-primary').last().click();
    await expect(await page.locator('.item__title')).toHaveText(productName);
    await expect((await page.locator('.item__quantity').textContent()).trim().substring(10)).toBe(quantity);

    await page.locator('.field.small input').first().fill("666");
    await expect(await page.locator('.user__name.mt-5 label')).toHaveText("ananyasinhaa007@gmail.com");
    await page.locator('input[placeholder="Select Country"]').pressSequentially("Indi");

    await page.waitForSelector('.ta-item.list-group-item.ng-star-inserted');
    const options = await (page.locator('.ta-item.list-group-item.ng-star-inserted'));
    const count = await options.count();

    for (let i = 0; i < count; i++) {
        const option = options.nth(i);
        const text = await option.textContent();

        if (text?.trim() === "India") {
            await option.click();
            break; // Stop after clicking
        }
    }

    await page.locator('input[name="coupon"]').fill('rahulshettyacademy');
    await page.locator('.btn.btn-primary.mt-1').click();
    await expect(await page.locator('.mt-1.ng-star-inserted')).toBeVisible();
    await page.locator('.btnn.action__submit.ng-star-inserted').click();
    await expect(await page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ");
    const order_id = (await page.locator('.em-spacer-1 label').last().textContent()).substring(3, 27);
    console.log(order_id);

    await page.locator('button[routerlink = "/dashboard/myorders"]').click();

    const orderIds = await page.locator('.ng-star-inserted th[scope="row"]');
    for (let i = 0; i < 7; i++) {
        const orderId = orderIds.nth(i);
        const text = await orderId.textContent();
        console.log('OrderId :' + text);
        if (text?.trim() === order_id) {
            await page.locator('button', { hasText: 'View' }).nth(i).click();
            break;
        }

    }

    await expect(await page.locator('.col-text.-main').textContent()).toBe(order_id);
    await expect((await page.locator('.title').textContent()).trim()).toBe(productName);


});