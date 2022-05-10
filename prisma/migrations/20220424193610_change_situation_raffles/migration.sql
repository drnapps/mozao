/*
  Warnings:

  - Made the column `situation` on table `raffles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `raffles` MODIFY `situation` ENUM('PENDING', 'ACTIVE', 'EXPIRED', 'FINISHED') NOT NULL DEFAULT 'ACTIVE';
