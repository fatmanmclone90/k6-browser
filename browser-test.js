import { browser } from 'k6/browser';
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';
import { banner } from "k6/x/banner";
import faker from "k6/x/faker";

export function setup() {
    banner(faker.person.firstName(), { color: "purple", font: "banner" });
}

export default async function () {
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        await page.goto(`${__ENV.SITE_URL}`);

        await page.locator('input[name="login"]').type('admin');
        await page.locator('input[name="password"]').type('123');

        await Promise.all([page.waitForNavigation(), page.locator('input[type="submit"]').click()]);

        await check(page.locator('h2'), {
            header: async (h2) => (await h2.textContent()) == 'Welcome, admin!',
        });
    } finally {
        await page.close();
    }
}