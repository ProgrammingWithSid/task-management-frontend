
# Task Management App

Objective: To design and implement a simple Task Management Web Application using Django and React.

Frontend Link : https://github.com/ProgrammingWithSid/task-management-frontend

## Technologies Used
Framework : Django
REST API

## Languages Used
Python

# Build Setup

git clone https://github.com/ProgrammingWithSid/task-management-backend.git

cd auth/
# Install dependencies
pip install -r requirements.txt
# Serve at localhost:8000
python manage.py createsuperuser
python manage.py runserver

API Endpoints

• GET /tasks: Fetch all tasks.
• GET /tasks/:id: Fetch a single task by ID.
• POST /tasks: Add a new task.
• PUT /tasks/:id: Update a task by ID.
• DELETE /tasks/:id: Delete a task by ID.

## API Reference

#### Get all items

Fetch all tasks.

```http
  GET /tasks
```


#### Get item

```http
  GET /tasks/${uuid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uuid`      | `uuid` | **Required**. Id of item to fetch |

#### Add a new task

```http
  POST /tasks/${uuid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uuid`      | `uuid` | **Required**. Id of item to fetch |


#### Update a task

```http
  PUT /tasks/${uuid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uuid`      | `uuid` | **Required**. |


#### Delete a task

```http
  DELETE /tasks/${uuid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uuid`      | `uuid` | **Required**. |

#### Create a User

```http
  POST /auth/users/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**.  |
| `name`      | `string` | **Required**.  |
| `password`      | `string` | **Required**. |
| `re_password`      | `string` | **Required**.  |

#### Login a user


```http
  POST /auth/jwt/create/
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. |
| `password`      | `string` | **Required**. |


#### Generate refresh token

```http
  POST /auth/jwt/refresh/
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `refresh`      | `string` | **Required**. |




# Connect @
LinkedIn : https://www.linkedin.com/in/satender-kumar-600bb3179/
Email : satenderk8700@gmail.com   
Leetcode : https://leetcode.com/satenderk8700

# Personal
Name : Satender Kumar  

# Gratitude
Thank You