import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'HOL Foundation Content Studio',
  projectId: 'tctv8pav',
  dataset: 'production',
  plugins: [
    structureTool({
      title: 'HOL Content Management',
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
