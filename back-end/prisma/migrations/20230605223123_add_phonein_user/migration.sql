/*
  Warnings:

  - Added the required column `number` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "number" VARCHAR(255) NOT NULL;
