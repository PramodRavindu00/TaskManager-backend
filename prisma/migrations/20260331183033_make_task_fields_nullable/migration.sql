-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_assignedTo_fkey";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "assignedTo" DROP NOT NULL,
ALTER COLUMN "dueDate" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Todo';

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
