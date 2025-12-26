/*
  Warnings:

  - The values [Disabled] on the enum `MemberStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MemberStatus_new" AS ENUM ('Active', 'Removed');
ALTER TABLE "public"."ProjectMember" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "ProjectMember" ALTER COLUMN "status" TYPE "MemberStatus_new" USING ("status"::text::"MemberStatus_new");
ALTER TYPE "MemberStatus" RENAME TO "MemberStatus_old";
ALTER TYPE "MemberStatus_new" RENAME TO "MemberStatus";
DROP TYPE "public"."MemberStatus_old";
ALTER TABLE "ProjectMember" ALTER COLUMN "status" SET DEFAULT 'Active';
COMMIT;
