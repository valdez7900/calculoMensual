/*
  Warnings:

  - Added the required column `cubrioA` to the `Movimiento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movimiento` ADD COLUMN `cubrioA` VARCHAR(191) NOT NULL;
