export default class ErrorBaseException extends Error {
  statusCode = 400;
  constructor(message: string) {
    super(message);
  }
}
