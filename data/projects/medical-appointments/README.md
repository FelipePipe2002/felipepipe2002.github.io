# Medical Appointments & Healthcare Management System

A **web application for managing medical appointments and healthcare records** developed for the Health Department of UNICEN’s Student Welfare Office.

## Links

* Live site: https://atenciones.bienestar.unicen.edu.ar

## Concept

The project was created to replace a manual, paper-based appointment system with a centralized digital platform. The goal was to improve appointment scheduling, patient tracking, professional agenda management, and access to healthcare statistics for institutional decision-making.

## Main Features

* **Appointment Booking**: Patients can reserve appointments by professional, location, or specialty
* **Appointment Management**: Patients can view upcoming and past appointments and cancel them when needed
* **Medical Records**: Healthcare professionals can create and review medical attention records linked to appointments
* **Patient Management**: Professionals can search patients, view their information, and register new patients if needed
* **Document Uploads**: Patients can upload medical studies, certificates, PDFs, or images
* **Professional Agenda**: Professionals can manage availability, block time slots, create spontaneous appointments, and cancel appointments
* **Email Notifications**: Users receive appointment confirmations and cancellation notifications
* **Role-Based Access**: Different functionality for patients, healthcare professionals, and administrators
* **Statistics Dashboard**: Professionals and administrators can access reports about appointments, consultations, specialties, and activity
* **Holiday & Vacation Management**: Administrators can configure non-working dates to prevent appointment generation

## Technical Implementation

The application follows a **client-server architecture** with a layered, three-tier design. The frontend was built as a dynamic single-page application using **Angular**, while the backend was implemented with **Spring Boot** exposing RESTful APIs. Data persistence was handled with **PostgreSQL**, using a relational model designed around users, patients, professionals, appointments, schedules, specialties, medical records, diagnoses, locations, and roles.

## Security

Authentication and authorization were implemented using **JWT** and **Spring Security**, with role-based access control for protected resources. The system also includes CSRF protection strategies, secure cookie handling, password hashing, and backend validation to protect sensitive patient information.

## Testing

The backend includes a suite of unit tests focused mainly on the service layer, where the business logic is located. Tests were implemented with **JUnit 5** and **Mockito**, while code coverage was measured using **JaCoCo**. The service layer reached approximately **91% instruction coverage**, with tests covering appointment booking, cancellation, user management, email notifications, schedules, reports, and non-working dates.

## Deployment

The system was deployed on a university-provided Linux server. The Angular frontend was built for production and served as static files through **Apache Server**, while the Spring Boot backend was packaged as a `.jar` and managed as a **systemd** service. Apache was also configured as a reverse proxy for API requests.

HTTPS was enabled using **Let’s Encrypt** certificates managed with **Certbot**, and automated maintenance tasks were configured with **cron**, including PostgreSQL database backups and certificate renewal checks.

## Architecture

The solution is organized into three main layers:

* **Presentation Layer**: Angular frontend responsible for user interaction and visual components
* **Business Logic Layer**: Spring Boot backend responsible for application rules, authentication, authorization, and REST APIs
* **Persistence Layer**: PostgreSQL database responsible for storing users, appointments, schedules, medical records, and statistics data

## Technologies

`Angular` `TypeScript` `Java` `Spring Boot` `Spring Security` `PostgreSQL` `JUnit 5` `Mockito` `JaCoCo` `Apache Server`

## Project Scope

This project included the full software development lifecycle: requirements analysis, architecture design, database modeling, frontend and backend implementation, authentication and authorization, testing, production deployment, technical documentation, and user manual creation.
