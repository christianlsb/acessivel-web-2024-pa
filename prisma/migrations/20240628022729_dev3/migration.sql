/*
  Warnings:

  - You are about to drop the column `data_atualizacao` on the `queixa` table. All the data in the column will be lost.
  - You are about to drop the column `data_criacao` on the `queixa` table. All the data in the column will be lost.
  - Added the required column `titulo` to the `Queixa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `queixa` DROP COLUMN `data_atualizacao`,
    DROP COLUMN `data_criacao`,
    ADD COLUMN `titulo` VARCHAR(191) NOT NULL;
