import { browser } from 'k6/browser'
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js'
import { banner } from 'k6/x/banner'
import faker from 'k6/x/faker'
import { Trend } from 'k6/metrics'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const pageLoad = new Trend('page_load')
var start
var end

export function setup() {
    banner(faker.person.firstName(), { color: 'purple', font: 'banner' })
}

export default async function () {
    const context = await browser.newContext()
    const page = await context.newPage()

    try {
        start = Date.now()
        await page.goto(`${__ENV.SITE_URL}`)
        end = Date.now()
        const diff = end - start
        pageLoad.add(diff)

        await page.locator('input[name="login"]').type('admin')
        await page.locator('input[name="password"]').type('123')

        await Promise.all([
            page.waitForNavigation(),
            page.locator('input[type="submit"]').click(),
        ])

        await check(page.locator('h2'), {
            header: async (h2) => (await h2.textContent()) == 'Welcome, admin!',
        })
    } finally {
        await page.close()
    }
}

export function handleSummary(data) {
    return {
      "result.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  }
