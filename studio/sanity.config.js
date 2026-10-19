import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'HOL Foundation - Instagram Reels Studio',
  projectId: 'tctv8pav',
  dataset: 'production',
  plugins: [
    structureTool({
      title: 'Reels Management',
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
