import puppeteer from 'puppeteer';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from the parent directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY; // Using Anon key for simplicity, ensure RLS allows insert or use SERVICE_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error("Error: Supabase URL or Key not found in .env file.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const SCRAPE_KEYWORD = "Advogado Remoto";
const SCRAPE_LOCATION = "Brasil";

async function scrapeLinkedIn() {
    console.log(`Starting scraper for "${SCRAPE_KEYWORD}" in "${SCRAPE_LOCATION}"...`);

    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // LinkedIn Job Search URL
    const url = `https://www.linkedin.com/jobs/search?keywords=${encodeURIComponent(SCRAPE_KEYWORD)}&location=${encodeURIComponent(SCRAPE_LOCATION)}&f_WT=2`; // f_WT=2 is "Remote"

    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Wait for job cards to load
    try {
        await page.waitForSelector('.jobs-search__results-list li', { timeout: 10000 });
    } catch (e) {
        console.log("Could not find job list or timeout.");
        await browser.close();
        return;
    }

    const jobs = await page.evaluate(() => {
        const jobNodes = document.querySelectorAll('.jobs-search__results-list li');
        const data = [];

        jobNodes.forEach(node => {
            try {
                const titleElement = node.querySelector('.base-search-card__title');
                const companyElement = node.querySelector('.base-search-card__subtitle');
                const locationElement = node.querySelector('.job-search-card__location');
                const linkElement = node.querySelector('a.base-card__full-link');
                const timeElement = node.querySelector('time');

                if (titleElement && linkElement) {
                    data.push({
                        title: titleElement.innerText.trim(),
                        company: companyElement ? companyElement.innerText.trim() : 'Confidencial',
                        location: locationElement ? locationElement.innerText.trim() : 'Remoto',
                        link: linkElement.href,
                        posted_at: timeElement ? timeElement.innerText.trim() : 'Recente',
                        description: "Vaga importada do LinkedIn. Clique em 'Candidatar-se' para ver mais detalhes.",
                        type: "Remoto",
                        source: "linkedin"
                    });
                }
            } catch (err) {
                // Skip erroneous card
            }
        });
        return data.slice(0, 10); // Limit to 10 jobs to be safe
    });

    console.log(`Found ${jobs.length} jobs.`);

    for (const job of jobs) {
        // Check if job already exists (by link)
        const { data: existing } = await supabase
            .from('vagas')
            .select('id')
            .eq('link', job.link)
            .single();

        if (!existing) {
            const { error } = await supabase.from('vagas').insert([job]);
            if (error) {
                console.error("Error inserting job:", error);
            } else {
                console.log(`Saved: ${job.title}`);
            }
        } else {
            console.log(`Skipped (Duplicate): ${job.title}`);
        }
    }

    await browser.close();
    console.log("Scraping finished.");
}

scrapeLinkedIn().catch(console.error);
