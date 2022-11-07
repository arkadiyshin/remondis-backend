-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "client_phone" VARCHAR(100) NOT NULL DEFAULT '',
ALTER COLUMN "client_email" SET DEFAULT '';
