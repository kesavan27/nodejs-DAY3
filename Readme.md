https://nodejs-day3-l9sc.onrender.com


1:Create Mentor (POST): Establish a new mentor profile.

---> Endpoint : /mentors

2:Create Student (POST): Establish a new student profile

---> Endpoint : /students

3:Assign Student to Mentor (POST): Link a student to a mentor, fostering a learning relationship.

---> Endpoint : /:studentId

4:Assign or Change Mentor for Student (PUT): Assign a new mentor to student ---> Endpoint : /students/:studentId/mentor

5:Get All Students for a Mentor (GET): Retrieve a comprehensive list of all students under the guidance of a specific mentor.

---> Endpoint : /:mentorId

6:Get Previously Assigned Mentor for a Student (GET): Access the historical data of a student's previously assigned mentor.

---> Endpoint : /:studentId