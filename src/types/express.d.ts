declare global {
  namespace Express {
    interface User {
      _id: string;
      name: string;
      // Add other properties if needed
    }

    interface Request {
      user?: User; // Extend Request with the user property
    }
  }
}
