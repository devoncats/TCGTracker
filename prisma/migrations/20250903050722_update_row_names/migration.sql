/*
  Warnings:

  - The primary key for the `Card` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `Image` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `Market` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `Number` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `Rarity` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `Set` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `Spotlight` on the `Card` table. All the data in the column will be lost.
  - Added the required column `id` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `market` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rarity` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `set` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spotlight` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "set" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "spotlight" REAL NOT NULL,
    "market" REAL NOT NULL,
    "cachedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Card" ("createdAt", "updatedAt") SELECT "createdAt", "updatedAt" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
