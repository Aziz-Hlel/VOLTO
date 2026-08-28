-- AlterTable
ALTER TABLE "MembershipApplication" ADD COLUMN     "applicationReceivedBy" TEXT,
ADD COLUMN     "approvalBy" TEXT,
ADD COLUMN     "dateApproved" DATE,
ADD COLUMN     "membershipCardSerialNumber" TEXT,
ADD COLUMN     "membershipExpiryDate" DATE,
ADD COLUMN     "membershipNumber" TEXT,
ADD COLUMN     "membershipNumberIssued" TEXT,
ADD COLUMN     "membershipStartDate" DATE,
ADD COLUMN     "remarks" TEXT;
