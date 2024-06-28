

---


https://github.com/Ojogor/TicketScript/assets/98194481/b9402d3f-b80c-4d95-848c-d7b667c80764


# TicketScript

TicketScript is a custom JavaScript solution for generating unique tickets with QR codes for your events. Designed for seamless integration with Google Forms and Google Sheets, it offers a cost-effective alternative to expensive ticketing services. This script automates the entire process from user registration to attendance tracking, making it perfect for small organizations and events operating on a budget.

## Features

- **User Registration**: Users can register through a Google Form.
- **Automated Ticket Generation**: Generates a unique booking ID and QR code for each registration.
- **Email Notifications**: Sends a confirmation email with event details and the booking ID to the user.
- **Attendance Tracking**: Marks attendance on the event day via a simple web app.
- **Cost-Effective**: Eliminates the need for expensive ticketing services.

## How It Works

1. **User Registration**: Users fill out a Google Form to register for the event.
2. **Data Handling**: Form submissions are collected in a Google Sheet.
3. **Automated Script Execution**: A custom Apps Script runs whenever a new entry is added to the Google Sheet.
4. **Booking Confirmation**:
   - Generates a unique booking ID.
   - Updates the Google Sheet with the booking ID and initial attendance status.
5. **QR Code Generation**: Creates a QR code for the booking ID using the Google Charts API.
6. **Email Notification**: Sends a confirmation email with the booking ID and event details to the user.
7. **Attendance Tracking**: On the event day, a web app updates the attendance status in the Google Sheet.

## Setup Instructions

### Prerequisites

- Google Account
- Google Forms
- Google Sheets

### Steps

1. **Create a Google Form** for event registration.
2. **Link the Form to a Google Sheet** to collect responses.
3. **Open the Google Sheet** and navigate to `Extensions > Apps Script`.
4. **Copy and Paste the Script**: Copy the code from this repository and paste it into the Apps Script editor.
5. **Save and Authorize**: Save the script and authorize it to access your Google Sheets and send emails.
6. **Deploy the Script**:
   - Set up an installable trigger for the `onEditTrigger` function.
   - Deploy the `doGet` function as a web app for attendance tracking.

### Script Files

- `Code.gs`: Main script for ticket generation and email notifications.
- `Helpers.gs`: Helper functions for email validation, booking ID generation, and QR code creation.

## Example Usage

1. User registers through the Google Form.
2. The form submission triggers the Apps Script.
3. A unique booking ID and QR code are generated.
4. A confirmation email is sent to the user.
5. On the event day, the web app marks attendance using the booking ID.

## Contributing

Contributions are welcome! Please fork this repository and submit pull requests with any improvements or additional features.
