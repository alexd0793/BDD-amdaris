// run-all-features.js
// This script runs all Cucumber feature files in the e2e/features directory.

const { execSync } = require('child_process');

try {
  execSync(
    'npx cucumber-js e2e/features --require e2e/support/world.js --require e2e/steps/hooks.js --require e2e/steps/common.steps.js --require e2e/steps/*.js',
    { stdio: 'inherit' }
  );
} catch (error) {
  process.exit(error.status || 1);
}
