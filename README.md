# Process Overview

## AI Tools Utilized:

I used Claude-4 to generate tests, focusing on validating critical functionality.

This includes ensuring proper behavior of image query caching and verifying that generic filters are adequately covered by test cases.

## Design Decisions:

Due to limited time allocated for coding, I opted not to use a state management library. However, introducing one would significantly improve the user experience—for instance, currently, 
the preloaded image disappears when filters are applied and the component unmounts.

Common functionality like text and dropdown filters has been modularized to ensure reusability and clarity.

Each component adheres to the single-responsibility principle to promote low coupling and maintainability.

Server-Side Rendering (SSR) is employed to eliminate flickering during the initial load, especially given the lightweight nature of the prefilled query.

API calls are encapsulated within separate composables, serving as a substitute for centralized state management and keeping logic organized.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

```

Run tests:

```bash
# npm
npm run test
```


