# Setup & Run
git clone <repo-url>
cd <project-directory>
npm install
npm run dev

Access localhost:3000 to explore.

# Technical Stack
Frontend: Next.js, React 18+, Tailwind CSS

# Assumptions
Backend API is available at http://localhost:5018 . You can change it in ./lib/features/scans/scanApiSlice.ts file.
The backend returns data without any missing fields.
The data format complies with the agreed-upon structure.
All requests made to the backend will be successful.
Authentication is not required to call the backend API.
Data transmission does not need to be encrypted.
Using static mock data for the backend API.
Posted data will not be stored at backend.

# Trade-offs
Since the backend API provides static mock data, after adding a new note, instead of calling the backend API to fetch the notes again, the newly added record is directly appended to the existing list of retrieved notes.

# Estimated Time
1 hour
