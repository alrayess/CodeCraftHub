# CodeCraftHub

CodeCraftHub is a full-stack personalized learning management platform that allows users to create, view, update, and delete courses through a simple web dashboard.

## Features

- Create new courses
- View all saved courses
- Edit existing courses
- Remove courses
- Course status tracking
- Target completion dates
- REST API with full CRUD functionality
- JSON file storage
- CORS support
- Responsive frontend interface

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- REST API
- JSON
- CORS

## Course Data

Each course contains:

- Name
- Description
- Target Date
- Status

Available status values:

- Planned
- In Progress
- Completed

## API Endpoints

| Method | Endpoint           | Description     |
| ------ | ------------------ | --------------- |
| GET    | `/api/courses`     | Get all courses |
| GET    | `/api/courses/:id` | Get one course  |
| POST   | `/api/courses`     | Create a course |
| PUT    | `/api/courses/:id` | Update a course |
| DELETE | `/api/courses/:id` | Delete a course |

## Run Locally

Clone the repository:

```bash
git clone YOUR-GITHUB-REPOSITORY-URL
```
