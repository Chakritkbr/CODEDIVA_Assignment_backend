import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => console.log('Connected to database successfully!'))
  .catch((error) => console.error('Database connection failed:', error));

export default prisma;
