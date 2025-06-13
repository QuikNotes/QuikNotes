export default {
  // Use node environment for server-side tests
  testEnvironment: 'node',

  // Where to find tests
  testMatch: ['**/tests/**/*.test.js'],

  // Directories to ignore
  testPathIgnorePatterns: ['/node_modules/'],

  // Transform settings - empty since we're using native ESM
  transform: {},

  // Important: Don't specify extensionsToTreatAsEsm since type:module is in package.json

  // This helps with module resolution
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  // Don't transform node_modules except for specific packages if needed
  transformIgnorePatterns: [
    "node_modules/(?!(module-that-needs-transform)/)"
  ]
}
