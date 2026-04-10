/*
  Warnings:

  - You are about to drop the column `userId` on the `Driver` table. All the data in the column will be lost.
  - The `status` column on the `Ride` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `rideId` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `driverId` on the `Ride` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "checkRide" AS ENUM ('SEARCHING', 'CANCELED', 'ACCEPTING');

-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "rideId",
ADD COLUMN     "rideId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Ride" DROP COLUMN "driverId",
ADD COLUMN     "driverId" INTEGER NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "checkRide" NOT NULL DEFAULT 'SEARCHING';

-- DropEnum
DROP TYPE "checkrRide";

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
