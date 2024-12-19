# Lodgr

Lodgr is a web application developed using Angular that helps people find properties for stays and allows property owners to list their spaces for rent. It features a clean, user-friendly interface for browsing, searching, and managing property listings.

## Features

- **Search Functionality**: Users can search for spaces by location and date.
- **Space Listings**: Featured spaces are displayed for easy browsing.
- **Property Details Page**: View detailed information about each space, including images, pricing, and descriptions.
- **User Authentication**: Users can register, log in, and manage their accounts.
- **Responsive Design**: The app is designed to adapt to different screen sizes.

## Technologies Used

- **Angular 18**: The frontend framework used for building the application.
- **Firebase**: Used for user authentication (via Firebase Authentication) and storing space listings (via Firebase Firestore).
- **CSS**: Standard CSS is used for styling the app with a modern, clean look.

## Development Setup

### Prerequisites

To run this project locally, you need:

- [Node.js](https://nodejs.org/) (version 18 or above)
- [Angular CLI](https://angular.io/cli) (installed globally)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/lodgr.git
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

### Development Server

To start the local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Firebase Setup

1. Set up Firebase for the project. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Authentication** and **Firestore Database**.
3. Add Firebase config to your Angular project in `src/environments/environment.ts`:

   ```typescript
   export const environment = {
     production: false,
     firebaseConfig: {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     }
   };
   ```

4. Install Firebase dependencies if not already done:

   ```bash
   npm install @angular/fire firebase
   ```

### Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, service, or module, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Building

To build the project for production, run:

```bash
ng build --prod
```

This will compile your project and store the build artifacts in the `dist/` directory. The production build optimizes your application for performance and speed.

### Running Unit Tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

### Running End-to-End Tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Folder Structure

Here’s an overview of the project’s folder structure:

```
src/
|-- app/
|   |-- core/               # Core module for shared services and components
|   |-- shared/             # Shared components like SearchBar
|   |-- spaces/             # Components and services related to spaces
|   |-- user/               # User authentication components and services
|   |-- app.module.ts       # Main module of the application
|   |-- app.component.ts    # Root component
|-- environments/           # Environment configuration files
|-- assets/                 # Static files like images
|-- styles.css              # Global CSS
```

## Additional Resources

For more information on using Angular, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
