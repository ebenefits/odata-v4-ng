const { defineConfig } = require('eslint/config');
const angular = require('angular-eslint');

/**
 * Flat config, replacing the .eslintrc.json files that ESLint 10 no longer reads.
 *
 * Both projects share this single config: their old .eslintrc.json files differed
 * only in the tsconfig files handed to parserOptions.project, and none of the rules
 * enabled below need type information, so no TypeScript program is set up here.
 */
module.exports = defineConfig([
  {
    // Build output and generated reports. The coverage folders matter in particular:
    // they hold Istanbul HTML reports, which the **/*.html patterns would otherwise lint.
    ignores: [
      'dist/**',
      'docs/**',
      '.angular/**',
      '**/coverage/**',
      'projects/odata-v4-ng-app/src/environments/environment.prod.ts'
    ]
  },
  {
    files: ['**/*.ts'],
    extends: [angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        {
          prefix: 'ov4',
          style: 'kebab-case',
          type: 'element'
        }
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          prefix: 'ov4',
          style: 'camelCase',
          type: 'attribute'
        }
      ]
    }
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended]
  }
]);
