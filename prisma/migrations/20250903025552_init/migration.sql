-- CreateTable
CREATE TABLE "Card" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "Number" TEXT NOT NULL,
    "Set" TEXT NOT NULL,
    "Image" TEXT NOT NULL,
    "Rarity" TEXT NOT NULL,
    "Spotlight" REAL NOT NULL,
    "Market" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
