# TO DO

## New Feature
- "Manage fields" option for content types.
- Toggle between light and dark mode & conditional styling.
- Users will be immediately redirected to a page where they're asked to change their temporary password upon first login attempt.
- Delete / Edit user will be added to add user page.
- Add profile card to homepage, default "anonymous" profile photo, properly format and display user information such as first name, last name, etc.
- Populate configuration page.
- new feature
- ...


## Changed Feature
- Style scrollbars.
- Better styling for Add User page.
- changed feature
- ...

## Removed Feature
- ...

## Fix
- Have all changes on any content type or content be reflected on the database. Currently only the name and description of a content type is updated.
- Refreshing the page does not affect the URL but the active page on the sidebar resets back to Homepage.

## Security
- Logging out or going back in history does not reset user or content stores, therefore one can simply undo last action (that brought them to the login page from the panel) and go back to the panel (displaying the user's or contents' information) straight from the login page without any input to the form.
