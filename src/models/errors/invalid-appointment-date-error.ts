export class InvalidAppointmentDateError extends Error {
  constructor() {
    super("The appointment must be scheduled at least one day in advance.");
  }
}
