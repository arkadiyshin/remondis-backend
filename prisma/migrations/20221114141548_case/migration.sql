/*
  Warnings:

  - You are about to drop the column `agreeded_at` on the `Case` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Case" RENAME COLUMN "agreeded_at" TO "confirmed_at";
