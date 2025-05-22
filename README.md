# 🏫 School Management API

A RESTful API built with **Node.js**, **Express**, and **MySQL** that allows you to manage schools and retrieve them sorted by proximity using geographic coordinates.

---

## 🚀 Features

- 📌 Add new schools with name, address, and geographic coordinates (latitude, longitude)
- 📍 List schools sorted by distance from a given location using the Haversine formula
- ✅ Input validation and error handling
- 🗄️ MySQL database integration
- 🔐 .env file support for environment configuration
- 🌍 CORS enabled

---

## 🛠️ Tech Stack

- Node.js  
- Express.js  
- MySQL  
- MySQL2 (Promise-based)  
- CORS  
- dotenv  
- Body-parser  
- Nodemon (for development)

---

## 📁 Project Structure

```
school-management-api/
│
├── app.js                  # Main Express application
├── .env                   # Environment variables
├── package.json           # Project metadata and scripts
└── README.md              # Project documentation
```

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/school-management-api.git
cd school-management-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the database

Open your MySQL client and run the following SQL:

```sql
CREATE DATABASE school_management;

USE school_management;

CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## ⚙️ Configuration

Create a `.env` file in the root folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=school_management
PORT=3000
```

---

## 🧪 Running the Server

### Development mode (with live reload)

```bash
npm run dev
```

### Production mode

```bash
npm start
```

---

## 📌 API Endpoints

### ➕ POST `/addSchool`

Add a new school to the database.

#### 📥 Request Headers

```
Content-Type: application/json
```

#### 📦 Request Body

```json
{
  "name": "Greenwood High",
  "address": "123 Education Blvd, Learning City",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

#### 📤 Response

```json
{
  "message": "School added successfully",
  "schoolId": 1
}
```

---

### 📍 GET `/listSchools?latitude=12.9716&longitude=77.5946`

List all schools sorted by proximity from the provided location.

#### 🧾 Query Parameters

* `latitude` — Latitude of the user
* `longitude` — Longitude of the user

#### 📤 Response

```json
[
  {
    "id": 1,
    "name": "Greenwood High",
    "address": "123 Education Blvd, Learning City",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "created_at": "2023-11-15T12:00:00.000Z",
    "distance": 0
  },
  {
    "id": 2,
    "name": "Sunshine Elementary",
    "address": "456 Knowledge Lane, Wisdom Town",
    "latitude": 12.9352,
    "longitude": 77.6245,
    "created_at": "2023-11-15T12:05:00.000Z",
    "distance": 8.23
  }
]
```

---

## 🧪 Testing with Postman

You can test your API using [Postman](https://www.postman.com/):

### 1. **Add School**

* Method: `POST`
* URL: `http://localhost:3000/addSchool`
* Headers: `Content-Type: application/json`
* Body (raw JSON):

```json
{
  "name": "Greenwood High",
  "address": "123 Education Blvd, Learning City",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

### 2. **List Schools by Distance**

* Method: `GET`
* URL: `http://localhost:3000/listSchools?latitude=12.9716&longitude=77.5946`

---

## 📄 Package.json

```json
{
  "name": "school-management-api",
  "version": "1.0.0",
  "description": "A RESTful API for managing schools with geographic proximity sorting",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "nodejs",
    "express",
    "mysql",
    "api",
    "school-management",
    "geolocation"
  ],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "body-parser": "^1.20.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

---

## 🔧 Environment Variables (.env)

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=school_management

# Server Configuration
PORT=3000

# Optional: Add other environment variables as needed
NODE_ENV=development
```

---

## 🗃️ Database Schema

### Schools Table Structure

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Sample Data

```sql
INSERT INTO schools (name, address, latitude, longitude) VALUES
('Greenwood High', '123 Education Blvd, Learning City', 12.9716, 77.5946),
('Sunshine Elementary', '456 Knowledge Lane, Wisdom Town', 12.9352, 77.6245),
('Central Academy', '789 Scholar Street, Study Valley', 12.9568, 77.6011);
```

---

## 🚀 Quick Start Guide

1. **Clone and Setup**
   ```bash
   git clone https://github.com/your-username/school-management-api.git
   cd school-management-api
   npm install
   ```

2. **Database Setup**
   - Create MySQL database `school_management`
   - Run the SQL schema provided above

3. **Environment Configuration**
   - Copy `.env.example` to `.env`
   - Update database credentials

4. **Start the Server**
   ```bash
   npm run dev  # Development mode
   # or
   npm start    # Production mode
   ```

5. **Test the API**
   - Server runs on `http://localhost:3000`
   - Use Postman or curl to test endpoints

---

## 🔍 API Usage Examples

### Using cURL

#### Add a new school:
```bash
curl -X POST http://localhost:3000/addSchool \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tech High School",
    "address": "100 Innovation Drive, Tech City",
    "latitude": 12.9800,
    "longitude": 77.6000
  }'
```

#### List schools by proximity:
```bash
curl "http://localhost:3000/listSchools?latitude=12.9716&longitude=77.5946"
```

---

## 🔐 Security Considerations

- Input validation is implemented for all endpoints
- Environment variables are used for sensitive data
- CORS is configured for cross-origin requests
- Consider adding authentication for production use
- Implement rate limiting for API endpoints
- Use HTTPS in production environment

---

## 🐛 Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `400` - Bad Request (invalid input)
- `500` - Internal Server Error

Example error response:
```json
{
  "error": "Missing required fields: name, address, latitude, longitude"
}
```

---

## 📈 Future Enhancements

- [ ] Add authentication and authorization
- [ ] Implement pagination for school listings
- [ ] Add school categories and filters
- [ ] Include school ratings and reviews
- [ ] Add image upload functionality
- [ ] Implement caching for improved performance
- [ ] Add comprehensive testing suite
- [ ] Create API documentation with Swagger

---

## 🤝 Contributing

1. Fork the repository
---

## 👨‍💻 Author

**Ankur Gupta**
- Email: ankurkumar7753@gmail.com
- LinkedIn: https://www.linkedin.com/in/ankur-gupta-15221a24b/

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Thanks to the Node.js and Express.js communities
- MySQL for reliable database management
- All contributors and testers

---

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the author via email
- Check the documentation for common solutions

---

*Made with ❤️ and Node.js*


