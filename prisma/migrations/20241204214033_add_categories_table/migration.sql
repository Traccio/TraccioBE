-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('INPUT', 'OUTPUT');

-- CreateEnum
CREATE TYPE "CategoryValueType" AS ENUM ('NUMERIC', 'BOOLEAN', 'RANGE', 'DURATION', 'PERCENTAGE', 'COUNT', 'LIST', 'TIMESTAMP', 'CATEGORICAL', 'BINARY', 'SCORE');

-- CreateTable
CREATE TABLE "Categories" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Icon" TEXT,
    "Color" TEXT NOT NULL,
    "Type" "CategoryType" NOT NULL,
    "ValueType" "CategoryValueType" NOT NULL,
    "MinValue" INTEGER,
    "MaxValue" INTEGER,
    "AllowedValues" TEXT,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("Id")
);
