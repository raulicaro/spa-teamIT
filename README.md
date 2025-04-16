### SPA - Test Team.IT

This project is a Single Page Application (SPA) developed as a Frontend Coding Challenge using React. It demonstrates key features such as user authentication, data fetching, and dynamic rendering, interacting with a mocked API.

#### Features:
- **User Authentication**: Simplified login system with predefined credentials.
- **Data Fetching**: Simulates interaction with a backend using `json-server`.
- **Dynamic Rendering**: Updates the UI based on API responses.

#### Local Development Setup:
1. **Install Dependencies**:
    - Install `json-server` for simulating a backend:
      ```bash
      npm install -D json-server
      ```
    - Install project dependencies:
      ```bash
      npm install
      ```

2. **Run the Mock API**:
    - Start the `json-server` to serve the mock API:
      ```bash
      npm run server
      ```
    - The API will be available at:
      [http://localhost:5000/items](http://localhost:5000/items)

3. **Run the Application**:
    - Start the development server:
      ```bash
      npm start
      ```
    - Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

    - The app supports hot-reloading, so changes to the code will automatically reflect in the browser. Check the console for any linting errors.

#### Credentials for Authentication:
- **Username**: `admin`
- **Password**: `123`

#### Example `db.json` Structure:
The `db.json` file acts as a mock database for the application. Below is an example structure:

{
  "items": [
    {
      "id": "681e",
      "title": "Item 1",
      "description": "Item 1"
    },
    {
      "id": "2539",
      "title": "Item 1",
      "description": "Item 1"
    },
    {
      "id": "2257",
      "title": "Item 1",
      "description": "Item 1"
    },
    {
      "id": "da5d",
      "title": "Item 2",
      "description": "Item 2"
    },
    {
      "id": "197e",
      "title": "Item 2",
      "description": "Item 2"
    }
  ]
}