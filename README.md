# Assignment Backend

นี้ประกอบด้วยโค้ดส่วน Backend สำหรับเว็บแอปพลิเคชันที่สร้างขึ้นเพื่อเป็นส่วนหนึ่งของ Assignment สร้างขึ้นโดยใช้ Node.js, Express, TypeScript และ Prisma ORM โดยมี API สำหรับจัดการผู้ใช้ สินค้า และหมวดหมู่สินค้า

## โครงสร้างโปรเจกต์

โปรเจกต์ถูกจัดระเบียบเป็นไดเรกทอรีต่อไปนี้:

- `prisma/`: ประกอบด้วย schema และ migrations ของ Prisma
- `src/`: ประกอบด้วยซอร์สโค้ดของแอปพลิเคชัน
  - `category/`: ประกอบด้วย controllers, models และ routes ที่เกี่ยวข้องกับหมวดหมู่
  - `product/`: ประกอบด้วย controllers, models และ routes ที่เกี่ยวข้องกับสินค้า
  - `users/`: ประกอบด้วย controllers, models และ routes ที่เกี่ยวข้องกับผู้ใช้
  - `utils/`: ประกอบด้วยฟังก์ชัน utility เช่น การจัดการ JWT และรหัสผ่าน
  - `db.ts`: ประกอบด้วยการเริ่มต้นใช้งาน Prisma client
  - `app.ts`: ประกอบด้วยการตั้งค่าแอปพลิเคชัน Express
  - `server.ts`: ประกอบด้วยตรรกะการเริ่มต้นเซิร์ฟเวอร์
- `docker-compose.yml`: ประกอบด้วยการกำหนดค่า Docker Compose สำหรับการรัน PostgreSQL และ pgAdmin
- `tsconfig.json`: ไฟล์กำหนดค่า TypeScript

## เทคโนโลยีที่ใช้

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker (for develop)
- JWT (JSON Web Tokens)
- bcrypt (สำหรับการแฮชรหัสผ่าน)

## เริ่มต้นใช้งาน

### สิ่งที่ต้องมี

- Node.js (>= 18)
- npm หรือ yarn
- Docker (option สำหรับ PostgreSQL และ pgAdmin ในเครื่อง)

### การติดตั้ง

1.  โคลนที่เก็บข้อมูล: `git clone <repository-url>`
2.  นำทางไปยังไดเรกทอรี: `cd assignment_backend`
3.  ติดตั้ง dependencies: `npm install`
4.  ตั้งค่า env: สร้างไฟล์ `.env` ใน root directory และเพิ่มตัวแปรตามตัวอย่าง
5.  รัน migrations ฐานข้อมูล: `npx prisma migrate dev`

### การรันแอปพลิเคชัน

6.  **ใช้ Docker (แนะนำ):**
    - เริ่ม Docker Compose: `docker-compose up -d`
    - รันแอปพลิเคชัน: `npm run dev`
7.  **ไม่ใช้ Docker:**
    - ตรวจสอบว่า PostgreSQL รันในเครื่อง และอัปเดต `DATABASE_URL` ใน `.env`
    - รันแอปพลิเคชัน: `npm run dev`

### การสร้างและเริ่มต้นการ build สำหรับ production

8.  สร้างแอปพลิเคชัน: `npm run build`
9.  เริ่มต้นเซิร์ฟเวอร์: `npm run start`

## Docker Compose

ไฟล์ `docker-compose.yml` ตั้งค่า PostgreSQL และ pgAdmin สำหรับการจัดการฐานข้อมูล

## API Endpoints

- **ผู้ใช้:**
  - `POST /api/users/register`: ลงทะเบียนผู้ใช้
  - `POST /api/users/login`: เข้าสู่ระบบ
- **สินค้า:**
  - `GET /api/products`: รับสินค้า
  - `POST /api/products`: สร้างสินค้า
  - `PUT /api/products/:id`: อัปเดตสินค้า
  - `DELETE /api/products/:id`: ลบสินค้า
- **หมวดหมู่:**
  - `GET /api/categories`: รับหมวดหมู่
  - `POST /api/categories`: สร้างหมวดหมู่
  - `PUT /api/categories/:id`: อัปเดตหมวดหมู่
  - `DELETE /api/categories/:id`: ลบหมวดหมู่

## Prisma Migrations

ไดเรกทอรี `prisma/migrations` ประกอบด้วย migrations ฐานข้อมูล ใช้คำสั่ง:

- `npx prisma migrate dev`: สร้าง/ใช้ migration
- `npx prisma migrate reset`: รีเซ็ตฐานข้อมูล

## .env

- `PORT`: พอร์ตเซิร์ฟเวอร์
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`: ฐานข้อมูล
- `JWT_SECRET`: คีย์ลับ JWT
- `DATABASE_URL`: Prisma database URL
- `CLIENT_ORIGIN`: path สำหรับเชื่อมต่อ client หรือ frontend
