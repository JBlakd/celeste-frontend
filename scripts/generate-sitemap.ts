// scripts/generate-sitemap.ts
import { writeFileSync } from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';
import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: 'aj6z1zv0', // from manage.sanity.io
  dataset: 'production', // or whatever you called it
  apiVersion: '2025-06-04',
  useCdn: true,
});

async function generateSitemap() {
  const smStream = new SitemapStream({ hostname: 'https://celestestone.com.au' });

  // --- Static routes ---
  const staticRoutes = [
    { url: '/', changefreq: 'weekly', priority: 1.0 },
    { url: '/all', changefreq: 'weekly', priority: 0.9 },
    { url: '/contact', changefreq: 'monthly', priority: 0.7 },
    { url: '/about', changefreq: 'monthly', priority: 0.5 },
  ];
  staticRoutes.forEach((route) => smStream.write(route));

  // --- Dynamic ranges ---
  const ranges: { slug: { current: string } }[] = await sanity.fetch(`*[_type == "range"]{ slug }`);
  ranges
    .filter((r) => r.slug.current !== 'all')
    .forEach((r) => {
      smStream.write({
        url: `/range/${r.slug.current}`,
        changefreq: 'weekly',
        priority: 0.8,
      });
    });

  // --- Dynamic products ---
  const products: { slug: { current: string } }[] = await sanity.fetch(
    `*[_type == "product"]{ slug }`,
  );
  products.forEach((p) => {
    smStream.write({
      url: `/${p.slug.current}`,
      changefreq: 'monthly',
      priority: 0.6,
    });
  });

  smStream.end();

  const sitemap = await streamToPromise(smStream).then((sm) => sm.toString());
  writeFileSync('./public/sitemap.xml', sitemap);
  console.log('✅ sitemap.xml generated and saved to /public');
}

generateSitemap().catch((err) => {
  console.error('❌ Failed to generate sitemap:', err);
});
