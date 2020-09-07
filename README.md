<a href="https://github.com/pratap-prasoon/hospital_Api">GITHUB</a>
# hospital_Api 
This is a server side Api designed for the doctors of a Hospital which has been allocated by the govt for testing and quarantine + well being of COVID-19 patients.

There are 2 types of Users
   - Doctors
   - Patients

- Doctors can log in
- Each time a patient visits, the doctor will follow 2 steps
   - Register the patient in the app (using phone number, if the patient already exists, just return the patient info in the API)
   - After the checkup, create a Report
- Patient Report have the following fields
   - Created by doctor
   - Status:
     - Can be either of: [Negative, Travelled-Quarantine,Symptoms-Quarantine, Positive-Admit].
   - Date

# Folder structure

   - Entry point : index.js.
   - assest : contains static files like images.
   - config : Contains configuration files of  apiError, catchAsync, Mongoose and Passport JWT Strategies.
   - controllers : The controllers for various urls like doctor_controller, err_controller, patient_controller and report_controller.
   - models : Mongoose Schemas for the doctor, patient and report.
   - routes : Different routes for different request urls.
   - package-lock.json
   ├ package.json 
   ├ readme.md


- Required Routes
   - /doctors/register → with username and password
   - /doctors/login → returns the JWT to be used
   - /patients/register
   - /patients/:id/create_report
   - /patients/:id/all_reports → List all the reports of a patient oldest to latest
   - /reports/:status → List all the reports of all the patients filtered by a specific status.

# How to install and run on local-system
   - Clone the repository.
   - Navigate to the folder using cd Hospital-API 
   - Open Terminal and type npm install to install all required files.
   - Run following command: npm start


# To run in the Postman with the following routes :-

URL: http://localhost:8080/

1. POST -> /doctors/register (Register the new doctor using name,email and password).
 ![Image](https://github.com/pratap-prasoon/hospital_Api/blob/master/assets/images/doctorRegister.png)


2. POST -> /doctors/login (Doctor can Login using email and password).
 ![Image](https://github.com/pratap-prasoon/hospital_Api/blob/master/assets/images/doctorLogin.png)


3. POST -> /patients/register (Doctor can Register the patient using name and Phone Number).
 ![Image](https://github.com/pratap-prasoon/hospital_Api/blob/master/assets/images/patientRegister.png)


4. POST -> /patients/:id/create_report (Doctor can create report of the Patients with status either :'Negative','Travelled-Quarantine','Symptoms-Quarantine','Positive-Admit').
 ![Image](https://github.com/pratap-prasoon/hospital_Api/blob/master/assets/images/createReport.png)


5. GET -> /patients/:id/all_reports (Retrive all reports of a patient by ID).
 ![Image](https://github.com/pratap-prasoon/hospital_Api/blob/master/assets/images/allReports.png)


6. GET -> /reports/:status (Retrieve all reports from DB filter on the basis of Status sent in params).
 ![Image](https://github.com/pratap-prasoon/hospital_Api/blob/master/assets/images/status.png)
