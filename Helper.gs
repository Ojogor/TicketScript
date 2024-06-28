function doGet(e) {
  try {
    var bookingId = e.parameter ? e.parameter.bookingId : undefined;
    
    if (!bookingId) {
      return ContentService.createTextOutput("Booking ID parameter is missing.");
    }

    var sheet = SpreadsheetApp.openById("RSVP").getActiveSheet();
    var attendedColumn = 12; // Assuming Column L for attendance

    var row = getRowByBookingId(sheet, bookingId);

    if (row !== -1) {
      sheet.getRange(row, attendedColumn).setValue("Yes");
      return ContentService.createTextOutput("Attendance recorded for Booking ID: " + bookingId);
    } else {
      return ContentService.createTextOutput("Booking ID not found: " + bookingId);
    }
  } catch (error) {
    return ContentService.createTextOutput("Error: " + error.toString());
  }
}

function getRowByBookingId(sheet, bookingId) {
  var bookingIdColumn = 11; // Assuming Column K for Booking ID
  var data = sheet.getDataRange().getValues();

  for (var i = 0; i < data.length; i++) {
    if (data[i][bookingIdColumn - 1] === bookingId) {
      return i + 1; // Adding 1 because arrays are zero-based, but rows are one-based in Sheets
    }
  }

  return -1; // Booking ID not found
}
