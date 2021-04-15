-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "current_video" TEXT NOT NULL,
    "current_second" DOUBLE PRECISION NOT NULL,
    "isPlaying" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT,
    "RoomId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("RoomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
