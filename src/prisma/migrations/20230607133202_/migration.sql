/*
  Warnings:

  - Added the required column `quantity` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "quantity" INTEGER NOT NULL;
