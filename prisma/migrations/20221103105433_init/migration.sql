-- CreateEnum
CREATE TYPE "Role" AS ENUM ('manager', 'inspector');

-- CreateEnum
CREATE TYPE "UserState" AS ENUM ('active', 'inactive');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "username" VARCHAR(100),
    "hash_password" VARCHAR(255),
    "role" "Role",
    "state" "UserState",
    "token" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmed_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_at" TIMESTAMP(3),
    "agreeded_at" TIMESTAMP(3),
    "client_first_name" VARCHAR(100),
    "client_email" VARCHAR(100) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "floor" INTEGER NOT NULL DEFAULT 0,
    "elevator" INTEGER NOT NULL DEFAULT 0,
    "squaremeters" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "way_to_property" TEXT NOT NULL,
    "type_of_property_id" INTEGER,
    "state_id" INTEGER,
    "manager_id" INTEGER,
    "inspector_id" INTEGER,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeOfProperty" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(20) NOT NULL,

    CONSTRAINT "TypeOfProperty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseState" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(20) NOT NULL,

    CONSTRAINT "CaseState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseItem" (
    "id" SERIAL NOT NULL,
    "case_id" INTEGER NOT NULL,
    "room" INTEGER NOT NULL DEFAULT 0,
    "room_title" VARCHAR(20),
    "description" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CaseItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CasePhoto" (
    "id" SERIAL NOT NULL,
    "case_id" INTEGER NOT NULL,
    "room" INTEGER NOT NULL DEFAULT 0,
    "photo" BYTEA NOT NULL,

    CONSTRAINT "CasePhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "time_from" TIME NOT NULL,
    "time_to" TIME NOT NULL,
    "case_id" INTEGER NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseHistory" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "case_id" INTEGER NOT NULL,
    "case_state_id" INTEGER NOT NULL,
    "case_new_state_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "description" TEXT,
    "case_data" JSONB,

    CONSTRAINT "CaseHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transition" (
    "id" SERIAL NOT NULL,
    "state_id" INTEGER NOT NULL,
    "next_state_id" INTEGER NOT NULL,

    CONSTRAINT "Transition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransitionAccess" (
    "role" "Role" NOT NULL,
    "transition_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "TransitionAccess_role_transition_id_key" ON "TransitionAccess"("role", "transition_id");

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_type_of_property_id_fkey" FOREIGN KEY ("type_of_property_id") REFERENCES "TypeOfProperty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "CaseState"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_inspector_id_fkey" FOREIGN KEY ("inspector_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseItem" ADD CONSTRAINT "CaseItem_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CasePhoto" ADD CONSTRAINT "CasePhoto_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseHistory" ADD CONSTRAINT "CaseHistory_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseHistory" ADD CONSTRAINT "CaseHistory_case_state_id_fkey" FOREIGN KEY ("case_state_id") REFERENCES "CaseState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseHistory" ADD CONSTRAINT "CaseHistory_case_new_state_id_fkey" FOREIGN KEY ("case_new_state_id") REFERENCES "CaseState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseHistory" ADD CONSTRAINT "CaseHistory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transition" ADD CONSTRAINT "Transition_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "CaseState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transition" ADD CONSTRAINT "Transition_next_state_id_fkey" FOREIGN KEY ("next_state_id") REFERENCES "CaseState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransitionAccess" ADD CONSTRAINT "TransitionAccess_transition_id_fkey" FOREIGN KEY ("transition_id") REFERENCES "Transition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
