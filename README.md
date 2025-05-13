# Rich Text Editor Migration Challenge

Welcome! This exercise evaluates your ability to integrate modern React components into a legacy jQuery application. You'll be replacing a Bootstrap WYSIWYG editor with CKEditor 5 while maintaining the existing data flow.

## Background

Our current application is a legacy monolith built with:

* jQuery
* ASP.NET MVC (`.cshtml` views with Razor syntax)
* A Bootstrap-based WYSIWYG editor (used in several places throughout the app)

Your task is to replace the existing editor instance in this sample codebase with [CKEditor](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/overview.html), using its React integration.

## Your Task

Replace the existing Bootstrap WYSIWYG editor with CKEditor 5's React integration while preserving the current functionality. Your solution must:

1. **Keep Existing Data Flow**
   - Load initial content from localStorage (see `BlogService.ts`)
   - Save content back to localStorage when submitted
   - Maintain the existing post structure (title, author, content, date)

2. **Integrate React + CKEditor**
   - Mount CKEditor 5 as a React component
   - Replace the existing editor in the "New Post" form
   - Keep all other jQuery functionality intact

3. **Preserve Current Features**
   - Basic text formatting (bold, italic, underline)
   - List support (ordered and unordered)
   - Content persistence
   - Post preview rendering

### Important Constraints

- **Do not modify** the existing jQuery-based structure for post listing and data handling
- **Do not rewrite** the entire application in React
- Focus only on the editor replacement

### Running the App

0. Setup pnpm - https://pnpm.io/installation
1. `pnpm i`
2. `pnpm start`
3. Visit http://localhost:5173/

### Key Files to Review

- `src/app/blog/BlogComponent.ts` - Contains the current editor implementation
- `src/app/blog/BlogService.ts` - Handles post storage and retrieval
- `index.html` - Main template with editor markup

## Submitting Your Work

1. Zip the entire codebase (excluding node_modules)
2. Include a brief `NOTES.md` explaining:
   - Your integration approach
   - Any technical decisions or tradeoffs made
   - Setup instructions if you added new build steps
   - Anything else you think is important
3. Email zip file to: jwarner@hracuity.com jlafroscia@hracuity.com lgalimba@hracuity.com

### Timeline
**IMPORTANT**: Your solution must be submitted at least 8 hours before your scheduled technical interview. This allows our team to review your code and prepare meaningful discussion points for the interview.

- Submission Deadline: 24 hours before your scheduled interview time
- Example: If your interview is at 2:00 PM, submit by 2:00 PM the day before

## Getting Started

The current editor implementation can be found in the "New Post" form that appears when clicking the "New Post" button. This is what you'll be replacing with CKEditor 5.
