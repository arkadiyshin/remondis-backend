-- AddForeignKey
ALTER TABLE "CasePhoto" ADD CONSTRAINT "CasePhoto_case_id_room_fkey" FOREIGN KEY ("case_id", "room") REFERENCES "CaseItem"("case_id", "room") ON DELETE RESTRICT ON UPDATE CASCADE;
