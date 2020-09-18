import React, { createContext, useContext, useState } from "react";

const BookingUIContext = createContext();

export function useBookingUIContext() {
  return useContext(BookingUIContext);
}

export const BookingUIConsumer = BookingUIContext.Consumer;

export function BookingUIProvider({ children }) {

  const [ids, setIds] = useState([]);
  const [showUpdateGroupBookingDialog, setShowUpdateGroupBookingDialog] = useState(false);
  const [showAttendanceGroupBookingDialog, setShowAttendanceGroupBookingDialog] = useState(false);
  


  const value = {
    ids,
    setIds,
    showUpdateGroupBookingDialog,
    setShowUpdateGroupBookingDialog,
    showAttendanceGroupBookingDialog,
    setShowAttendanceGroupBookingDialog
  };

  return (
    <BookingUIContext.Provider value={value}>
      {children}
    </BookingUIContext.Provider>
  );
}
