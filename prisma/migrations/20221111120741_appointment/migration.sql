/*
  Warnings:

  - The primary key for the `Appointment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Appointment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[case_id]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_case_id_key" ON "Appointment"("case_id");
