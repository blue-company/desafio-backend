export class InvalidAppointmentDateError extends Error {
  constructor() {
    super("The appointment must be scheduled more than 24 hours in advance.");
  }
}
