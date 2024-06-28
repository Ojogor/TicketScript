function onEditTrigger(e) {
  // Check if e is defined
  if (!e || !e.range) {
    Logger.log("Invalid event object");
    return;
  }

  Logger.log(e.range.getRow());

  if (e.oldValue == "false") {
    var ui = SpreadsheetApp.getUi();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Assuming the email addresses are in Column B
    var emailColumn = 2; // Column B
    var ticketColumn = 4; // Column D
    var bookingIdColumn = 11; // Column K
    var attendedColumn = 12; // Column L (for attendance)

    var email = sheet.getRange(e.range.getRow(), emailColumn).getValue();
    var numberOfTickets = sheet.getRange(e.range.getRow(), ticketColumn).getValue();

    // Generate a unique booking ID (you can replace this logic as needed)
    var bookingId = generateBookingId();

    // Update the booking ID and set attendance status in the sheet
    sheet.getRange(e.range.getRow(), bookingIdColumn).setValue(bookingId);
    
    // Check if the script is run by one of the authorized users
    var authorizedEmails = ["bangladeshculturalcommunity@gmail.com", "anis.ehds5@gmail.com"];
    if (authorizedEmails.includes(Session.getActiveUser().getEmail())) {
      sheet.getRange(e.range.getRow(), attendedColumn).setValue("No"); // Initial attendance status
    } else {
      Logger.log("Unauthorized user attempted to update attendance.");
      return;
    }

    // Generate QR code URL based on Booking ID
    var qrCodeUrl = generateQRCodeUrl(bookingId);

    var result = ui.alert('Send an email?', 'Yes or no', ui.ButtonSet.YES_NO);
    if (result == ui.Button.YES && isValidEmail(email)) {
      var subject = "Ticket Confirmation for Event";
      var body = "Dear Customer,\n\n" +
                 "Thank you for purchasing tickets for our event!\n\n" +
                 "Event Details:\n" +
                 "Address: Breeze Way, 1 Arctic Avenue, University Centre Room UC-1004, St. John's, NL A1C 5S7\n" +
                 "Date: February 16th, 2023\n" +
                 "Hours: 7 PM - 9:30 PM\n\n" +
                 "Booking ID: " + bookingId + "\n" +
                 "You have purchased " + numberOfTickets + " ticket(s).\n\n" +
                 "For any inquiries, please contact us at bangladeshculturalcommunity@gmail.com.\n\n" +
                 "QR Code: " + qrCodeUrl + "\n\n" +
                 "Best regards,\nBangladesh Cultural Community";

      MailApp.sendEmail({
        to: email,
        subject: subject,
        body: body,
      });
      Logger.log("Sent email to: " + email + " with Booking ID: " + bookingId);
    }
  }
}

// Function to check if a string is a valid email address
function isValidEmail(email) {
  // Implement your email validation logic here
  // For a simple check, you can use a regular expression
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to generate a unique booking ID (you may need to customize this)
function generateBookingId() {
  // Generate a unique ID using timestamp or any other method
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMddHHmmss');
}

// Function to generate QR code URL
function generateQRCodeUrl(bookingId) {
  // Using Google Charts API to generate QR code
  return 'https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=' + bookingId;
}
