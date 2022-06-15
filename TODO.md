# TO DO

## New Feature
- Expansible content/content type items in both lists.
- "Manage fields" option for content types.
- Toggle between light and dark mode & conditional styling.
- Users will be immediately redirected to a page where they're asked to change their temporary password upon first login attempt.
- Delete / Edit user will be added to add user page.
- Add titles to create content type
- Add profile card to homepage, default "anonymous" profile photo, properly format and display user information such as first name, last name, etc.
- Populate configuration page.
- new feature
- ...


## Changed Feature
- Style scrollbar on CreatePage form (first one).
- Remove custom black background color from app.sass for Dark mode and find a .png file of the logo.
- Contents' data is displayed as an object at the moment, properly format it.
- Change icons of "Content Types" and "Contents" on the sidebar.
- Better styling for Add User page.
- Inform user via popup or some other method rather than alert upon invalid credential submission.
- changed feature
- ...

## Removed Feature
- ...

## Fix
- The selection menu in content creation tab fails if it is opened too quickly and/or without visiting other tabs.
- Refreshing the page does not affect the URL but the active page on the sidebar resets back to Homepage.

## Security
- Logging out or going back in history does not reset user or content stores, therefore one can simply undo last action (that brought them to the login page from the panel) and go back to the panel (displaying the user's or contents' information) straight from the login page without any input to the form.
