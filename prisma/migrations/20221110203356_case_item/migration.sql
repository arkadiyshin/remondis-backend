/*
  Warnings:

  - The primary key for the `CaseItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CaseItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[case_id,room]` on the table `CaseItem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CaseItem" DROP CONSTRAINT "CaseItem_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "CaseItem_case_id_room_key" ON "CaseItem"("case_id", "room");
