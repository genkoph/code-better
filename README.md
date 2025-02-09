# Code Better - AI-Powered Code Review Platform

## Important Points

- I've made the project in a hurry and didn't really pay attention to my commits, so I decided to just squash them all into one so that you don't get confused.

- I didn't implement mobile responsiveness since Yavor said that it would be enough for the app to work on desktop. (I would've made it responsive anyway but I didn't have enough time)

- I forgot about the requirement to use TRPC and realized too late.

## Getting Started

To setup the project locally, follow these steps:

1. Clone the repository

```bash
git clone https://github.com/genkoph/code-better
```

2. Install dependencies

```bash
pnpm install
```

3. Create an `.env` file in the project root by copying the example file.

```bash
cp .env.example .env
```

4. Run migrations to sync the prisma schema with the database

```bash
pnpm prisma migrate deploy
```

5. Run the development server

```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Key Technical Decisions

- Implemented a chat-like interface to mimic the flow of all popular AI platforms.

- Added a global progress bar to indicate route transitions. This enhancement addresses the issue of the app appearing unresponsive and slow during client-side transitions, providing users with a visual cue that the application is actively processing their requests.

- Utilizing a custom, lightweight UUID generator function that can be used on both the server and client sides.

- Using the `useSWR` hook for data fetching in this application because it provides a simple and efficient way to handle api requests. It automatically handles caching, revalidation, and error handling, which enhances the user experience by ensuring that the data is always up-to-date without requiring manual refreshes.

- Implemented toasts to inform users about errors, as this approach provides a graceful and non-disruptive way to alert them without interrupting their workflow.

- The Monaco code editor was picked because it provides a rich code editing experience with syntax highlighting and IntelliSense which are essential for users submitting code snippets.

- I used Motion (Framer Motion) for animations because it's one of the best React-first animation libraries available. It provides a simple and intuitive API, allowing for smooth and performant animations that enhance the user experience.

- I opted for a flat file structure for the components in this project. Given the small scale of the application, this approach simplifies management and organization, making it easier to locate and modify components as needed.

Due to the small scale of the application, there weren't a lot of significant key technical decisions to be made.

## Limitations

- Not optimized for mobile devices because the Monaco Editor is notoriously difficult to handle when resizing, and I didn't have enough time to address it.

- No authentication is required; once you submit your code, it becomes visible in the sidebar to all other users.

- No input validation is implemented, which could make the application prone to code injection and other security vulnerabilities.

- Currently, there is no implemented functionality to stop the text stream once it has begun.

And the rest of the limitations are the typical ones for a small mvp/demo project, some of them are:

- Bundle size is not optimized for performance.

- There are no automated tests in place.

- The application lacks search engine optimization (SEO).

- The user interface and experience are quite basic and could be improved.
