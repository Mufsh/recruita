
# RECRUITA


# Overview
This project is a simple web application designed to help recruiters manage data related to applicants/candidates easily. It comprises of a frontend built with Vite + React and a backend developed using Node.js, with PostgreSQL as the database. I have used ElephantSQL as the database storage.


# Features

* Allows the recruiter to update status of a candidate, view, delete and add records. Also computes score for candidates based on their experience working with NOdeJS and ReactJS. 

# Technologies Used
## Frontend:
  * Vite
  * React
  * Tailwind CSS
  * JavaScript

## Backend:
  * Node.js
  * Express.js
  * PostgreSQL (ElephantSQL)


# Approach
  ## Client
  A home page is shown to the recruiter(assuming they have logged in already) which has options to add, update, delete or view records. The user can choose any of the operation and proceed forward.
  * ADD: A admission form is shown to the user where they can fill the data related to candidate(name, email, phone, skills with experience, status, expected salary). The user can click on the "Add Candidate" button and the record will be added to the database. Score is calculated before adding on the basis of experience in NodeJS and ReactJS.
  * UPDATE:  The recruiter enters the email for a record and if it is found in the database, the details are shown. The recruiter can update the status and the salary and save the updated information
  * DELETE:  The recruiter enters the email for a record and if it is found in the database, the details are deleted from the database.
  * VIEW: The recruiter can view all the records in the database;
 
  Email validation and phone no(10 digits) is also done on the client side. 
  If all the entered values are satisfying then a post request is sent to the backend.

  ## Server
  All the values are extracted first and then validation is done again.
  If there is some error, the error is returned.
  According to the request by the user, the operation is performed and results are returned.

> [!NOTE]
> When accessing the backend for the first time(calling any backend api endpoint), it will take some time because the backend is redeployed on render if there's not traffic for some time.

# Installation
## Clone the repository
```
git clone https://github.com/mufsh/recruita.git
cd recruita
```
## Install Dependencies
```
cd client  # Navigate to the frontend directory
npm install
cd ../server  # Navigate to the backend directory
npm install
```
## Environment Setup:
 * Create a .env file in the backend directory.
 * Add necessary environment variables such as PORT, USERNAME, HOSTNAME, PASSWORD, DATABASE, DB_DIALECT, DB_PORT for connectiong to the database.

# Running the Application
 ## Start the backend server
 ```
nodemon index.js
```
## Start the frontend
```
npm run dev
```
# Backend API Endpoints
## POST /api/add
 * Description: Endpoint to add candidates to the database.
 * Request Body: JSON data containing candidate details.
*  Response: Returns the candidate record if its added successfully to the database otherwise the error is returned.

## POST /api/search
  * Description: Endpoint to search candidates in the database.
 * Request Body: JSON data containing candidate email.
*  Response: Returns the candidate record if its found in the database otherwise the error is returned.

## POST /api/update
  * Description: Endpoint to update candidate details in the database.
 * Request Body: JSON data containing candidate details.
*  Response: Returns the candidate record if its updated successfully in the database otherwise the error is returned.

## GET /api/viewall
  * Description: Endpoint to get all candidate details in the database.   
*  Response: Returns all the candidates records.

## POST /api/search
  * Description: Endpoint to delete candidates from the database.
 * Request Body: JSON data containing candidate email.
*  Response: Deletes the candidate record if its found in the database otherwise the error is returned.

# Database Design (ER Diagram)
## Collections/Tables

  ### 1. Candidate:
  
      Attributes:
        * ID (Primary Key)
        * Name
        * Email(unique)
        * Phone(Unique)
        * Status
        * Skills ( Array of objects which has a skill and its experience)
        * Expected Salary
        * Score(calculated on the basis of experience in NodeJS and ReactJS)
        


# Assumptions
 * The recruiter is already logged in.
   
   

# Future Improvements
  * Implement user authentication for secure access to  data.
  * Add other functionalities such as score on the basis of education.

# Visuals



![Screenshot from 2024-03-21 00-27-40](https://github.com/Mufsh/recruita/assets/80107839/7f3759ff-30b1-4b08-8c34-c7c57f60b01b)


![Screenshot from 2024-03-21 00-28-20](https://github.com/Mufsh/recruita/assets/80107839/2e5d1a5b-8092-45cd-a0f5-5607e3424037)






![Screenshot from 2024-03-21 00-28-34](https://github.com/Mufsh/recruita/assets/80107839/84027ebb-15df-4ac6-9367-ff89159e7f0e)





![Screenshot from 2024-03-21 00-29-02](https://github.com/Mufsh/recruita/assets/80107839/ad182b9c-4114-4be2-963f-017965e56476)


![Screenshot from 2024-03-21 00-33-00](https://github.com/Mufsh/recruita/assets/80107839/ab72d90b-ab07-46b4-a050-ab921664f1b9)



![Screenshot from 2024-03-21 00-33-26](https://github.com/Mufsh/recruita/assets/80107839/8a365d52-6275-477e-8fd6-c585dfae99cf)

![Screenshot from 2024-03-21 00-42-25](https://github.com/Mufsh/recruita/assets/80107839/4ad0dbe6-5049-41ae-bece-88aa8017ceb3)


![Screenshot from 2024-03-21 00-42-46](https://github.com/Mufsh/recruita/assets/80107839/d392c37e-b0ce-43f7-892a-905130d19c22)









