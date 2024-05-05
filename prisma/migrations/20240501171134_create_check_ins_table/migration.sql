-- AlterTable
ALTER TABLE
  "users" RENAME COLUMN "password" to "password_hash";

ALTER TABLE
  "users"
ADD
  COLUMN "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "check_ins" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "check_ins_pkey" PRIMARY KEY ("id")
);