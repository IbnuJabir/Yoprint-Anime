# Anime Search App

A modern, responsive web application for searching and exploring anime using the Jikan API. This project was developed as an assessment for a Frontend Developer role at YoPrint, demonstrating proficiency in React, TypeScript, and modern frontend development practices.

The application features a clean, intuitive interface with smooth animations, skeleton loading states, and comprehensive error handling. Users can search for anime in real-time with debounced API calls, navigate through paginated results, and view detailed information about each anime.

## Screenshots

### Desktop View

<table>
  <tr>
    <td>
      <p align="center">Search Page</p>
      <img src="screenshots/desktop-search.png" alt="Desktop Search Page" width="100%">
    </td>
    <td>
      <p align="center">Detail Page</p>
      <img src="screenshots/desktop-detail.png" alt="Desktop Detail Page" width="100%">
    </td>
  </tr>
</table>

### Mobile View

<table>
  <tr>
    <td>
      <p align="center">Search Page</p>
      <img src="screenshots/mobile-search.png" alt="Mobile Search Page" width="100%">
    </td>
    <td>
      <p align="center">Detail Page</p>
      <img src="screenshots/mobile-detail.png" alt="Mobile Detail Page" width="100%">
    </td>
  </tr>
</table>

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Decisions](#architecture-decisions)
- [Performance Optimizations](#performance-optimizations)
- [UI/UX Considerations](#uiux-considerations)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Project Setup](#project-setup)
- [API Overview](#api-overview)
- [Deployment](#deployment)
- [Reflection](#reflection)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Instant Search**: Real-time search results as you type with debounced API calls (250ms)
- **Server-side Pagination**: Navigate through large result sets efficiently
- **Detailed Anime Information**: Comprehensive details page for each anime
- **Responsive Design**: Optimized for all screen sizes from mobile to desktop
- **Smooth Animations**: Polished UI with transitions and loading animations
- **Error Handling**: Graceful error states with retry options
- **Empty States**: User-friendly messaging when no results are found
- **Loading Skeletons**: Visual feedback during data fetching
- **Race Condition Handling**: Ensures the latest search results are displayed

## Tech Stack

- **React 19**: Utilizing the latest features and hooks
- **TypeScript**: For type safety and better developer experience
- **React Router v6**: For client-side routing
- **Framer Motion**: For smooth animations and transitions
- **Tailwind CSS**: For utility-first styling
- **Lucide Icons**: For modern, consistent iconography
- **Vite**: For fast development and optimized builds
- **Jikan API**: For fetching animes

## Architecture Decisions

1. **Component Structure**: Followed a modular approach with reusable components that have single responsibilities
   
2. **Custom Hooks**: Created custom hooks like `useDebounce` to encapsulate and reuse logic

3. **TypeScript Integration**: Used TypeScript for type safety, better IDE support, and to prevent common errors

4. **State Management**: Used React's built-in state management with hooks for simplicity, as the application doesn't require complex state management

5. **API Layer**: Centralized API calls in a dedicated module for better maintainability and consistent error handling

6. **Responsive Design**: Mobile-first approach with Tailwind CSS for responsive layouts

7. **Route-based Code Organization**: Structured components and logic around routes for better code organization

## Performance Optimizations

1. **Debounced Search**: Implemented a 250ms debounce on search input to reduce unnecessary API calls

2. **Lazy Loading Images**: Used the loading="lazy" attribute for images to improve initial load time

3. **Skeleton Loading States**: Implemented skeleton screens instead of spinners for perceived performance improvement

4. **Pagination**: Server-side pagination to limit data transfer and improve performance

5. **Memoization**: Used React's memoization features to prevent unnecessary re-renders

6. **Race Condition Handling**: Ensured that only the most recent search results are displayed when multiple API calls are in flight

7. **Optimized Animations**: Used hardware-accelerated animations for smooth performance

## UI/UX Considerations

1. **Visual Hierarchy**: Clear visual hierarchy to guide users through the interface

2. **Loading States**: Skeleton screens that match the layout of the content for a smoother transition

3. **Error States**: User-friendly error messages with clear actions for recovery

4. **Empty States**: Helpful guidance when search returns no results

5. **Responsive Design**: Optimized layouts for different screen sizes

6. **Accessibility**: Semantic HTML, ARIA attributes, and keyboard navigation support

7. **Visual Feedback**: Animations and transitions to provide feedback for user actions

8. **Consistent Design Language**: Consistent use of colors, spacing, and components throughout the application

## Project Structure

```
yoprint-anime/
├── public/
│   └── vite.svg
├── src/
│   ├── api/
│   │   └── animeApi.ts         # API service functions
│   ├── components/
│   │   ├── AnimeCard.tsx       # Card component for search results
│   │   ├── AnimeCardSkeleton.tsx # Loading skeleton for anime cards
│   │   ├── EmptyState.tsx      # Component for no results
│   │   ├── ErrorMessage.tsx    # Error display component
│   │   ├── Pagination.tsx      # Pagination controls
│   │   └── SearchBar.tsx       # Search input component
│   ├── hooks/
│   │   └── useDebounce.ts      # Custom hook for debouncing
│   ├── pages/
│   │   ├── AnimeDetailPage.tsx # Detail page for a single anime
│   │   └── SearchPage.tsx      # Main search page
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── App.tsx                 # Main app component with routes
│   ├── index.css               # Global styles
│   └── main.tsx                # Entry point
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── eslint.config.js            # es-lint configuration
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts              # Vite configuration
```


## Setup Instructions

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/IbnuJabir/yoprint-anime.git
   cd yoprint-anime

   ```

2. Install dependencies:

```shellscript
npm install
# or
yarn
```


3. Start the development server:

```shellscript
npm run dev
# or
yarn dev
```


4. Build for production:

```shellscript
npm run build
# or
yarn build
```


5. Preview production build:

```shellscript
npm run preview
# or
yarn preview
```




## API Overview

This project uses the Jikan API, a free, open-source REST API for the "MyAnimeList.net" website.

### Endpoints Used

1. **Search Anime**:

```plaintext
GET https://api.jikan.moe/v4/anime?q={query}&page={page}&limit=10
```


2. **Get Anime Details**:

```plaintext
GET https://api.jikan.moe/v4/anime/{id}/full
```




### Rate Limiting

The Jikan API has rate limiting in place. The application includes a delay mechanism to prevent hitting these limits.

## Deployment

The application is depployed in Vercel but it can be deployed to various platforms:

### Vercel

```shellscript
npm install -g vercel
vercel
```

### Netlify

```shellscript
npm install -g netlify-cli
netlify deploy
```

### GitHub Pages

1. Add homepage to package.json:

```json
"homepage": "https://yourusername.github.io/Yoprint-Anime"
```


2. Install gh-pages:

```shellscript
npm install --save-dev gh-pages
```


3. Add deploy scripts to package.json:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```


4. Deploy:

```shellscript
npm run deploy
```




## Reflection

Developing this Anime Search App for YoPrint's Frontend Developer assessment was a valuable experience that allowed me to showcase my technical skills and approach to building modern web applications.

### Technical Challenges

One of the main challenges was implementing the debounced search functionality while ensuring a smooth user experience. I addressed this by creating a custom `useDebounce` hook that efficiently manages the timing of API calls, preventing unnecessary requests while maintaining responsiveness.

Another challenge was handling loading states and race conditions. I implemented skeleton screens for a better perceived performance and carefully managed API responses to ensure that only the most recent search results are displayed.

### Design Decisions

I chose to use Tailwind CSS for styling because it allows for rapid UI development while maintaining consistency. The utility-first approach enabled me to create a responsive design that works well across all device sizes without writing custom CSS.

For animations, I selected Framer Motion because it provides a declarative API that integrates well with React's component model. This allowed me to create smooth transitions that enhance the user experience without complicating the codebase.

### Learning Outcomes

This project reinforced my understanding of React's latest features and best practices. I gained deeper insights into performance optimization techniques and the importance of thoughtful UX design in creating engaging web applications.

If I were to extend this project, I would add features like user authentication, favorites list, and more advanced filtering options. I would also consider implementing server-side rendering for improved SEO and initial load performance.

Overall, this assessment allowed me to demonstrate my ability to build a complete, production-ready application that balances technical excellence with user experience considerations—skills that I believe align well with YoPrint's frontend development needs.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## License

This project is licensed under the MIT [License](https://github.com/IbnuJabir/Yoprint-Anime/blob/main/LICENSE) - see the LICENSE file for details.

---

Developed with ❤️ by Kedir Jabir



- **Author**: Kedir Jabir
- **Portfolio**: [HERE](https://ibnujabir.tech)
- **Contact**: kedirjabir12@gmail.com
