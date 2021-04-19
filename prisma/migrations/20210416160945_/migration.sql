-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "current_video" TEXT NOT NULL,
    "current_second" DOUBLE PRECISION NOT NULL,
    "isPlaying" BOOLEAN NOT NULL,
    "host" INTEGER NOT NULL DEFAULT 1,
    "users" INTEGER[],

    PRIMARY KEY ("id")
);
