## Committed - NewTab Todo and Goal Manager
Try [here](https://chrome.google.com/webstore/detail/committed-newtab-todo-and/mffcogdacgpjnckjepacaicfliaocneb)

## Contributions welcome!
Just pick up anything from the requested features / todos below!

# Committed Dev Log
I do read all feature requests! Not every feature on this list is guarenteed to be added, since Committed is a side project I work on in my spare time.

## Requested features
- Edge (https://docs.microsoft.com/en-us/microsoft-edge/extensions/)
- Firefox (https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension)
- Safari (https://developer.apple.com/documentation/safariservices/safari_app_extensions/building_a_safari_app_extension)
- Google tasks integration
- Labeling tasks (ASAP, TBA, etc)
- Allow the size of font and lines to be adjusted to individual preference.
- Allow todo list to be printed / exported
- Firefox support
- Sort tasks (e.g. by due dates)

## Todos
- Tutorial
- Save list expanded state / have an indication that a list is collapsed
- Consistent naming: "textColor" -> "fontColor", "duedate" -> "dueDate"
- Rewrite Contexts with React Hooks (useReducer, useEffect)
- Write tests
- progress
- Settings:
  - Duedate display format (show "due in X days" instead of a date)

## Steps to publishing
- update version in manifest.json
- `npm run build`
- put a copy of .pem file in the build folder
- renamee it to `key.pem`
- compress the build folder
- upload zipped file to Chrome extension dashboard
