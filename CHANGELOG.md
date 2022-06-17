# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Given a version number MAJOR.MINOR.PATCH:

- MAJOR version is incremented when incompatible API changes are made,
- MINOR version is incremented when functionality is added in a backwards compatible manner, and
- PATCH version is incremented when bugs are fixed (also in a backwards compatible manner).



## 2.0.0 - 2022-05-27
### Added
- Added example

### Changed
- Changed example

### Deprecated
- Deprecated example

### Removed
- Removed example

### Fixed
- Fixed example

### Security
- Security example



## 1.2.0 - 2022-06-16
### Added
- Expansible content or content type items in both lists.
- Change in either content type name or description is reflected on the database.

### Changed
- Properties of contents in content list are properly formatted and displayed (used to simply render [Object object]).

### Fixed
- GET request upon login no longer returns all users in the database and therefore allows anyone to log in (fixed request parameters).



## 1.1.0 - 2022-06-16
### Added
- New alert prompt with support contact information upon invalid login information submission.

### Fixed
- GET request upon login no longer returns all users in the database and therefore allows anyone to log in (fixed request parameters).



## 1.0.0 - 2022-06-15
### Added
- Mock database
- Store management via Pinia
- Content & Content type listing and creation
- Configuration and Add User pages

### Changed
- "Create Content Type" and "List Content Type" pages on the sidebar are now "Content Types" and "Contents", with both pages having two tabs "List", and "Create" each



## 0.0.1 - 2022-06-14
### Added
- Mobile First, responsiveness w/ bootstrap
- Proper src folder structure
- editorconfig and ESLint configurations
- Blank and Main layouts
- Login form and validation
- Admin panel and sidebar
- Create content type page and form
- Logout button
