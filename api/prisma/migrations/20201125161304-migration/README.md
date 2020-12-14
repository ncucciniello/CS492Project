# Migration `20201125161304-migration`

This migration has been generated at 11/25/2020, 11:13:04 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."fki_foreignkeyconstraint"

ALTER TABLE "public"."UserRelationship" DROP CONSTRAINT "foreignkeyconstraint"

ALTER TABLE "public"."AppUser" ALTER COLUMN "createdOn" SET DEFAULT CURRENT_TIMESTAMP

CREATE SEQUENCE "userrelationship_id_seq";
ALTER TABLE "public"."UserRelationship" ALTER COLUMN "id" SET DEFAULT nextval('userrelationship_id_seq');
ALTER SEQUENCE "userrelationship_id_seq" OWNED BY "public"."UserRelationship"."id"

ALTER TABLE "public"."UserRelationship" ADD FOREIGN KEY ("traineeId")REFERENCES "public"."AppUser"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER INDEX "public"."appuser_email_key" RENAME TO "AppUser.email_unique"

ALTER INDEX "public"."exercise_id_key" RENAME TO "Exercise.exerciseTypeId_unique"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201116012224-migration..20201125161304-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,31 +1,25 @@
-datasource DS {
-  // optionally set multiple providers
-  // example: provider = ["sqlite", "postgresql"]
-  provider = ["sqlite", "postgresql"]
-  url = "***"
-}
-
 generator client {
   provider      = "prisma-client-js"
-  binaryTargets = "native"
+  binaryTargets = ["native"]
 }
-// Define your own datamodels here and run `yarn redwood db save` to create
-// migrations for them.
-// TODO: Please remove the following example:
-model AppUser {
-  id               Int                @id
-  userName         String?
-  email            String?            @unique
-  createdOn        DateTime?          @default(now())
-  lastLogin        DateTime?
-  type             String?
-  UserRelationship UserRelationship[]
+datasource DS {
+  provider = "postgresql"
+  url = "***"
 }
+model Workout {
+  id                Int               @id
+  relationshipId    Int?
+  date              DateTime?
+  numberOfExercises Int?
+  UserRelationship  UserRelationship? @relation(fields: [relationshipId], references: [id])
+  exercises         Exercise[]
+}
+
 model Exercise {
-  id              Int           @id
+  id              Int            @id
   workoutId       Int?
   trainerComments String?
   reps            Int?
   actualReps      Int?
@@ -33,11 +27,11 @@
   actualSets      Int?
   weight          Float?
   actualWeight    Float?
   traineeComments String?
-  exerciseTypeId  Int?          @unique
-  Workout         Workout?      @relation(fields: [workoutId], references: [id])
-  ExerciseType    ExerciseType?
+  exerciseTypeId  Int?           @unique
+  workout         Workout?       @relation(fields: [workoutId], references: [id])
+  ExerciseType    ExerciseType[]
 }
 model ExerciseType {
   id                  Int      @id
@@ -45,22 +39,23 @@
   exerciseName        String?
   Exercise            Exercise @relation(fields: [id], references: [exerciseTypeId])
 }
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
 model UserRelationship {
   trainerName String?
   traineeName String?
-  id          Int       @id
+  id          Int       @id @default(autoincrement())
   trainerId   Int?
   traineeId   Int?
-  AppUser     AppUser?  @relation(fields: [trainerId], references: [id])
+  AppUser     AppUser?  @relation(fields: [traineeId], references: [id])
   Workout     Workout[]
 }
-
-model Workout {
-  id                Int               @id
-  relationshipId    Int?
-  date              DateTime?
-  numberOfExercises Int?
-  UserRelationship  UserRelationship? @relation(fields: [relationshipId], references: [id])
-  Exercise          Exercise[]
-}
```


