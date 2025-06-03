import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: 'aj6z1zv0', // from manage.sanity.io
  dataset: 'production', // or whatever you called it
  apiVersion: '2025-06-04',
  useCdn: true,
});
