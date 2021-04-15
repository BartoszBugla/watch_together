/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_RoomId_fkey";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "users" INTEGER[];

-- DropTable
DROP TABLE "User";
