import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'tctv8pav',
    dataset: 'production',
  },
  project: {
    basePath: '/',
  },
});
