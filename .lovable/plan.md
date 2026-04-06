

## Plan: Add Project Library Page

### Overview
Create a new `/projects` page with the provided Project Library component, integrate it into the app routing and navigation, and adapt its styling to match the existing site's brutalist design and branding (logo, Discord link, WhatsApp number).

### Steps

1. **Create `src/pages/Projects.tsx`**
   - Adapt the provided `ProjectLibrary` component into a new page file
   - Replace hardcoded Discord link with the real one (`https://discord.gg/7yUz2rXumm`)
   - Replace the header with the site's existing logo (`logoImg`) and a back-to-home link
   - Update "Find a squad on Discord" button to use the correct Discord URL
   - Add a WhatsApp CTA option using the existing `0745947704` number
   - Keep all project data, filters, search, modal, and stats exactly as provided

2. **Register route in `src/App.tsx`**
   - Import `Projects` page and add `<Route path="/projects" element={<Projects />} />`

3. **Update navigation in `src/pages/Index.tsx`**
   - Change the existing `#projects` nav link to point to `/projects` as a route (like the timetable link)
   - Or add a separate "Project Library" entry under Tools/navigation

### Technical Details
- The component uses only `useState` from React -- no additional dependencies needed
- The dark theme (`bg-gray-950`) matches the site's existing dark aesthetic
- All project data (8 projects) is embedded as a static array -- no backend needed
- Modal uses click-outside-to-close pattern already implemented in the provided code
- Mobile-first grid layout (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) is already responsive

