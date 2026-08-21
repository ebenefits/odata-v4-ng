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
      // Angular 22 made OnPush the default and the v22 migration added an explicit
      // `ChangeDetectionStrategy.Eager` to every component to preserve the previous
      // behaviour. These components assign their results inside HTTP subscribe
      // callbacks without marking themselves dirty, so they genuinely need Eager
      // until they are reworked (signals, or an explicit markForCheck).
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
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
