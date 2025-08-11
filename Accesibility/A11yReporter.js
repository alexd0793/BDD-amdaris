const fs = require('fs');
const path = require('path');

class A11yReporter {
  static logViolations(violations, pageName) {
    if (violations.length === 0) return;

    // Console output
    console.log(`\n🚨 Accessibility Issues on ${pageName}:`);
    let report = `\n🚨 Accessibility Issues on ${pageName}:\n`;
    violations.forEach((violation, index) => {
      const entry = `${index + 1}. ${violation.help}\n   Impact: ${violation.impact}\n   Elements: ${violation.nodes.length}\n   Rule: ${violation.id}\n`;
      console.log(entry);
      report += entry;
    });

    // Write to file (append mode)
    const reportPath = path.join(__dirname, 'a11y-report.txt');
    fs.appendFileSync(reportPath, report + '\n');
  }
}

module.exports = A11yReporter;
