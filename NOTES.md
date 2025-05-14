# CKEditor 5 Integration Notes

## What I Did
I replaced the old Bootstrap editor with CKEditor 5, keeping the existing jQuery stuff intact. The editor now has all the basic formatting tools we need, and it works with our current data flow.

## Why I Made These Choices
- Went with CKEditor 5 Classic because it's simple and has everything we need
- Made a React wrapper for the editor to keep things clean
- Stuck with jQuery for the rest of the app to avoid breaking things
- Using GPL license for now, but we might need to change this later

## Tradeoffs I Considered
- GPL license is fine for dev but might need a commercial one later
- Classic build is quick to set up but less flexible than a custom one
- Keeping localStorage for now since it works well enough

## Testing
Added a basic test to make sure posts save and load correctly. It checks that the editor content (including formatting) stays intact when we save and reload.

## How to Run It
1. `pnpm i` to get the dependencies
2. `pnpm start` to run it locally
3. Open http://localhost:5173/
4. `pnpm test` to run the tests

## Other Stuff
- Editor has bold, italic, underline, and lists
- Added some error handling to make it more user-friendly
- Everything still saves to localStorage like before
- No changes needed to the build setup