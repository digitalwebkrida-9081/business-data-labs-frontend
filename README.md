# DataScraper Hub Frontend

## Overview

The **DataScraper Hub** is a modern, responsive React-based dashboard built with **Next.js**. It serves as the control center for the B2B Data Scraper, allowing users to trigger scrape jobs, view location-based reports, and manage datasets.

## Key Features

- **Location Report Dashboard**: A comprehensive view of available data sorted by Country and Category.
- **Advanced Search Filters**:
  - **Searchable Dropdowns**: Custom Combobox components for both "Country" and "Category" selection, allowing users to type-to-search or select from a list.
  - **Real-time Filtering**: Instantly filters large datasets without page reloads.
- **Scraper Interface**: A dedicated page (`/google-maps-scraper`) to input parameters (Latitude, Longitude, Radius) and trigger the backend grid search.
- **Responsive Design**: Fully optimized for desktop and mobile use with a clean, professional UI using Tailwind CSS.
- **Pagination**: Dynamic pagination for browsing large lists of categories and datasets.

## Technologies

- **Framework**: Next.js 13+ (App Router)
- **Library**: React.js
- **Styling**: Tailwind CSS
- **Icons**: React Icons (Fa, Md)

## Prerequisites

- **Node.js**: v16 or higher
- **NPM**: v8 or higher
- **Backend Running**: The `datascraper-backend` service must be running on port 5000.

## Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd data-scraper-frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Usage

### Development Server

Starts the application in development mode (available at `http://localhost:3000`).

```bash
npm run dev
```

### Building for Production

Create an optimized production build.

```bash
npm run build
npm start
```

## Project Structure

- `app/`: Next.js App Router pages and layouts.
  - `google-maps-scraper/`: Page for triggering new scrapes.
- `components/`: Reusable React components.
  - `location-report/`: Contains the main `Location-report.jsx` with the search logic.
  - `ui/`: Shared UI elements.
- `public/`: Static assets (images, logos).

## Connecting across the Office

To access this dashboard from other computers in the office:

1.  Ensure your computer and the other devices are on the same Wi-Fi/Network.
2.  Find your local IP address (e.g., `192.168.1.x`).
3.  Open the browser on the other device and go to `http://192.168.1.x:3000`.
