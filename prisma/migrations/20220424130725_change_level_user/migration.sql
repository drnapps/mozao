-- AlterTable
ALTER TABLE `users` MODIFY `level` ENUM('USER', 'ADMIN', 'AFFILIATE') NOT NULL DEFAULT 'AFFILIATE';