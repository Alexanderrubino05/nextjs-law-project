-- CreateTable
CREATE TABLE "Case" (
    "id" SERIAL NOT NULL,
    "typeid" INTEGER NOT NULL,
    "kategoriid" INTEGER NOT NULL,
    "titel" TEXT NOT NULL,
    "titel_short" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "statusid" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_statusid_fkey" FOREIGN KEY ("statusid") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
