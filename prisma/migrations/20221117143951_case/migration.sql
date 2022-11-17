-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "back_house" BOOLEAN DEFAULT false,
ADD COLUMN     "clear_area" BOOLEAN DEFAULT false,
ADD COLUMN     "closet_contents" BOOLEAN DEFAULT false,
ADD COLUMN     "furniture_lift" BOOLEAN DEFAULT false,
ADD COLUMN     "number_of_rooms" INTEGER DEFAULT 0,
ADD COLUMN     "parking" BOOLEAN DEFAULT false,
ADD COLUMN     "removing_carpets" BOOLEAN DEFAULT false,
ADD COLUMN     "removing_curtain" BOOLEAN DEFAULT false,
ADD COLUMN     "removing_lamps" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" VARCHAR(100) DEFAULT '';
