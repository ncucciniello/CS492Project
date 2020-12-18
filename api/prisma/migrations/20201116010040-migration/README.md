# Migration `20201116010040-migration`

This migration has been generated at 11/15/2020, 8:00:40 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."AppUser" ALTER COLUMN "createdOn" SET DEFAULT CURRENT_TIMESTAMP

CREATE UNIQUE INDEX "ExerciseType_id_unique" ON "public"."ExerciseType"("id")

ALTER INDEX "public"."appuser_email_key" RENAME TO "AppUser.email_unique"

ALTER INDEX "public"."exercise_id_key" RENAME TO "Exercise.exerciseTypeId_unique"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201106030440-migration..20201116010040-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,51 +1,66 @@
-datasource DS {
-  // optionally set multiple providers
-  // example: provider = ["sqlite", "postgresql"]
-  provider = "sqlite"
-  url = "***"
-}
-
-generator client {
-  provider      = "prisma-client-js"
-  binaryTargets = "native"
-}
-
-// Define your own datamodels here and run `yarn redwood db save` to create
-// migrations for them.
-// TODO: Please remove the following example:
-model User {
-  id       Int       @id @default(autoincrement())
-  email    String    @unique
-  name     String?
-  type     String
-  trainer  Int?
-  workouts Workout[]
-}
-
-model Workout {
-  id        Int        @id @default(autoincrement())
-  userId    Int
-  date      DateTime   @default(now())
-  user      User       @relation(fields: [userId], references: [id])
-  exercises Exercise[]
-}
-
-model Exercise {
-  id             Int          @id @default(autoincrement())
-  workoutId      Int
-  weight         Int
-  repsAssigned   Int
-  repsComplete   Int?
-  setsAssigned   Int
-  setsComplete   Int?
-  exerciseTypeId Int
-  workout        Workout      @relation(fields: [workoutId], references: [id])
-  exerciseType   ExerciseType @relation(fields: [exerciseTypeId], references: [id])
-}
-
-model ExerciseType {
-  id          Int        @id @default(autoincrement())
-  name        String
-  description String?
-  exercises   Exercise[]
-}
+datasource DS {
+  // optionally set multiple providers
+  // example: provider = ["sqlite", "postgresql"]
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider      = "prisma-client-js"
+  binaryTargets = "native"
+}
+
+// Define your own datamodels here and run `yarn redwood db save` to create
+// migrations for them.
+// TODO: Please remove the following example:
+model AppUser {
+  id               Int                @id
+  userName         String?
+  email            String?            @unique
+  createdOn        DateTime?          @default(now())
+  lastLogin        DateTime?
+  type             String?
+  UserRelationship UserRelationship[]
+}
+
+model Exercise {
+  id              Int           @id
+  workoutId       Int?
+  trainerComments String?
+  reps            Int?
+  actualReps      Int?
+  numberOfSets    Int?
+  actualSets      Int?
+  weight          Float?
+  actualWeight    Float?
+  traineeComments String?
+  exerciseTypeId  Int?          @unique
+  Workout         Workout?      @relation(fields: [workoutId], references: [id])
+  ExerciseType    ExerciseType?
+}
+
+model ExerciseType {
+  id                  Int      @id
+  exerciseDescription String?
+  exerciseName        String?
+  Exercise            Exercise @relation(fields: [id], references: [exerciseTypeId])
+}
+
+model UserRelationship {
+  trainerName String?
+  traineeName String?
+  id          Int       @id
+  trainerId   Int?
+  traineeId   Int?
+  AppUser     AppUser?  @relation(fields: [trainerId], references: [id])
+  Workout     Workout[]
+}
+
+model Workout {
+  id                Int               @id
+  relationshipId    Int?
+  date              DateTime?
+  numberOfExercises Int?
+  UserRelationship  UserRelationship? @relation(fields: [relationshipId], references: [id])
+  Exercise          Exercise[]
+}
```


