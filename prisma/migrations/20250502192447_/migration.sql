/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Document` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Item_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Document_name_key" ON "Document"("name");
