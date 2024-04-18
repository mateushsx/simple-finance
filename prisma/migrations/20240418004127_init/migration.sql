-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "amount" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
