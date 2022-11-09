/*
  Warnings:

  - Added the required column `file_name` to the `CasePhoto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CasePhoto" ADD COLUMN     "file_name" VARCHAR(255) NOT NULL;
