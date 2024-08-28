-- CreateTable
CREATE TABLE "Race" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "distance" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Checkpoint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "raceId" INTEGER NOT NULL,
    "distance" REAL NOT NULL,
    CONSTRAINT "Checkpoint_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Runner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CheckpointEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "checkpointId" INTEGER NOT NULL,
    "runnerId" INTEGER NOT NULL,
    "time" DATETIME NOT NULL,
    CONSTRAINT "CheckpointEvent_checkpointId_fkey" FOREIGN KEY ("checkpointId") REFERENCES "Checkpoint" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CheckpointEvent_runnerId_fkey" FOREIGN KEY ("runnerId") REFERENCES "Runner" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_RaceToRunner" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_RaceToRunner_A_fkey" FOREIGN KEY ("A") REFERENCES "Race" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RaceToRunner_B_fkey" FOREIGN KEY ("B") REFERENCES "Runner" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_RaceToRunner_AB_unique" ON "_RaceToRunner"("A", "B");

-- CreateIndex
CREATE INDEX "_RaceToRunner_B_index" ON "_RaceToRunner"("B");
