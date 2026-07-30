import { spawnSync } from 'node:child_process';

const allowedAdvisories = new Set([
  'GHSA-qwww-vcr4-c8h2',
]);

const result = spawnSync('npm', ['audit', '--json'], {
  encoding: 'utf8',
  shell: false,
});

if (!result.stdout) {
  process.stderr.write(result.stderr || 'npm audit did not return JSON output.\n');
  process.exit(result.status || 1);
}

let report;
try {
  report = JSON.parse(result.stdout);
} catch (error) {
  process.stderr.write(result.stdout);
  process.stderr.write(result.stderr || '');
  process.stderr.write(`\nUnable to parse npm audit JSON: ${error.message}\n`);
  process.exit(result.status || 1);
}

const findings = [];

for (const vulnerability of Object.values(report.vulnerabilities || {})) {
  const advisories = Array.isArray(vulnerability.via) ? vulnerability.via : [];
  for (const advisory of advisories) {
    if (!advisory || typeof advisory === 'string') {
      continue;
    }

    if (!['high', 'critical'].includes(advisory.severity)) {
      continue;
    }

    const advisoryId = advisory.url?.match(/GHSA-[a-z0-9-]+/i)?.[0] || String(advisory.source || '');
    if (!allowedAdvisories.has(advisoryId)) {
      findings.push({
        package: vulnerability.name,
        severity: advisory.severity,
        title: advisory.title,
        advisory: advisoryId,
        range: advisory.range,
      });
    }
  }
}

if (findings.length > 0) {
  process.stderr.write('High/critical npm audit findings:\n');
  for (const finding of findings) {
    process.stderr.write(`- ${finding.package}: ${finding.title} (${finding.severity}, ${finding.advisory}, ${finding.range})\n`);
  }
  process.exit(1);
}

const allowedCount = Object.values(report.vulnerabilities || {}).filter((vulnerability) =>
  (vulnerability.via || []).some((advisory) => {
    const advisoryId = advisory?.url?.match?.(/GHSA-[a-z0-9-]+/i)?.[0] || String(advisory?.source || '');
    return allowedAdvisories.has(advisoryId);
  })
).length;

if (allowedCount > 0) {
  process.stdout.write(`npm audit passed with ${allowedCount} allowlisted upstream React Router advisory item(s).\n`);
} else {
  process.stdout.write('npm audit passed with no high/critical findings.\n');
}
