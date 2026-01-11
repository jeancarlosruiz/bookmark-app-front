import "@testing-library/jest-dom";

// Mock de variables de entorno para tests
process.env.DATABASE_URL = "postgresql://test";
process.env.BETTER_AUTH_SECRET = "test-secret";
process.env.BETTER_AUTH_URL = "http://localhost:3000";
process.env.NEXT_PUBLIC_BETTER_AUTH_URL = "http://localhost:3000";
process.env.API_URL = "http://localhost:8080/api";
process.env.NEXT_PUBLIC_API_URL = "http://localhost:8080/api";
