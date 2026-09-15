-- AlterTable
ALTER TABLE "Membership" ALTER COLUMN "applicationReceivedBy" DROP NOT NULL,
ALTER COLUMN "membershipNumberIssued" DROP NOT NULL,
ALTER COLUMN "membershipCardSerialNumber" DROP NOT NULL,
ALTER COLUMN "approvalBy" DROP NOT NULL,
ALTER COLUMN "remarks" DROP NOT NULL;
