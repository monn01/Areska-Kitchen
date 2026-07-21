-- CreateEnum
CREATE TYPE "ProductOccasion" AS ENUM ('MEETING', 'WEDDING', 'BIRTHDAY', 'GATHERING');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "occasions" "ProductOccasion"[] DEFAULT ARRAY[]::"ProductOccasion"[];

