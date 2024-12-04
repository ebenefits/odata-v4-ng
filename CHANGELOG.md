# Changelog
## [19.0.0](https://github.com/ebenefits/odata-v4-ng/compare/v18.0.0...v19.0.1) (2024-12-04)
Update to support Angular 19
This version was tested with NodeJS 22.12.0 and NPM 10.9.1

## [18.0.0](https://github.com/ebenefits/odata-v4-ng/compare/v17.0.0...v18.0.0) (2024-05-10)
Update to support Angular 18
This version was tested with NodeJS 18.20.3 and NPM 10.6.0

## [17.0.0](https://github.com/ebenefits/odata-v4-ng/compare/v16.0.1...v17.0.0) (2024-05-10)
Update to support Angular 17
- Enabled Vite + ESBuild for faster builds
- Breaking change: HttpClientModule no longer injected automatically, in the location where you import the ODataMdoule you also need to specify the HttpClientModule now. This solves issue #8 by allowing you to specify HTTPInjectors. It is recommended to import ODataModule in the root application module.
- Project is now built using standalone project setup
- Peer dependency update: no longer using `angular2-uuid` package but using `uuid` package instead.

This version was tested with NodeJS 18.20.2 and NPM 10.6.0

## [16.0.1](https://github.com/ebenefits/odata-v4-ng/compare/v15.0.1...v16.0.1) (2024-05-10)
Update to support Angular 16
This version was tested with NodeJS 18.20.2 and NPM 10.6.0

## [15.0.1](https://github.com/ebenefits/odata-v4-ng/compare/v14.0.0...v15.0.1) (2022-02-09)
Update to support Angular 15
This version was tested with NodeJS 18.14.2 and NPM 9.5.0

## [14.0.0](https://github.com/ebenefits/odata-v4-ng/compare/v13.0.0...v14.0.0) (2022-02-09)
Update for Angular 14
This version was tested with NodeJS 16.x.x and NPM 8.x.x

## [13.0.0](https://github.com/ebenefits/odata-v4-ng/compare/v1.3.4...v13.0.0) (2022-02-09)
In version 13 we completely updated all reference npm packages. At the time of the release there were no outdated npm packages and no known security issues in related packages (checked with npm audit).

Main libraries updated to create version 13:
- Angular
- RXjs
- NodeJS
- NPM

Since Angular 13 the Angular Package Format has changed a lot. This update aligns with this new Angular Package Format. Since tslint is no longer supported this update also switches over to eslint. Related code fixes are applied as well. Angular 13 now uses rxjs 7.5.3.

This version was tested with NodeJS 16.x.x and NPM 8.x.x

**BREAKING CHANGE**: Only working with Angular 13+, to support lower versions of Angular use earlier versions of this package.

## [1.3.4](https://github.com/riccardomariani/odata-v4-ng/compare/v1.3.3...v1.3.4) (2020-04-16)
The latest version before eBenefits became the maintainer for this package. Look at Riccardo Mariani's repository for 'odata-v4-ng' version 1.3.4 and before, which was made to work with Angular 9. We've tested this version until Angular 12. Starting Angular 13 you will need '@ebenefits/odata-v4-ng'. 
