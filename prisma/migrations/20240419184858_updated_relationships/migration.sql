/*
  Warnings:

  - You are about to drop the `Checkpoint` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CheckpointEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RaceToRunner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Checkpoint";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CheckpointEvent";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_RaceToRunner";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "RaceRunner" (
    "raceId" INTEGER NOT NULL,
    "runnerId" INTEGER NOT NULL,

    PRIMARY KEY ("raceId", "runnerId"),
    CONSTRAINT "RaceRunner_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RaceRunner_runnerId_fkey" FOREIGN KEY ("runnerId") REFERENCES "Runner" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
