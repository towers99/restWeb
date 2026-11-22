-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "createAr" TIMESTAMP,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
