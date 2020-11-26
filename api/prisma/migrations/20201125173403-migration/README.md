# Migration `20201125173403-migration`

This migration has been generated at 11/25/2020, 12:34:03 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE SEQUENCE "exercise_id_seq";
ALTER TABLE "public"."Exercise" ALTER COLUMN "id" SET DEFAULT nextval('exercise_id_seq');
ALTER SEQUENCE "exercise_id_seq" OWNED BY "public"."Exercise"."id"

CREATE SEQUENCE "exercisetype_id_seq";
ALTER TABLE "public"."ExerciseType" ALTER COLUMN "id" SET DEFAULT nextval('exercisetype_id_seq');
ALTER SEQUENCE "exercisetype_id_seq" OWNED BY "public"."ExerciseType"."id"

CREATE SEQUENCE "userrelationship_id_seq";
ALTER TABLE "public"."UserRelationship" ALTER COLUMN "id" SET DEFAULT nextval('userrelationship_id_seq');
ALTER SEQUENCE "userrelationship_id_seq" OWNED BY "public"."UserRelationship"."id"

CREATE SEQUENCE "workout_id_seq";
ALTER TABLE "public"."Workout" ALTER COLUMN "id" SET DEFAULT nextval('workout_id_seq');
ALTER SEQUENCE "workout_id_seq" OWNED BY "public"."Workout"."id"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201125171952-migration..20201125173403-migration
--- datamodel.dml
+++ datamodel.dml
@@ -4,22 +4,22 @@
 }
 datasource DS {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model Workout {
-  id                Int               @id
+  id                Int               @id @default(autoincrement())
   relationshipId    Int?
   date              DateTime?
   numberOfExercises Int?
   UserRelationship  UserRelationship? @relation(fields: [relationshipId], references: [id])
   exercises         Exercise[]
 }
 model Exercise {
-  id              Int            @id
+  id              Int            @id @default(autoincrement())
   workoutId       Int?
   trainerComments String?
   reps            Int?
   actualReps      Int?
@@ -33,9 +33,9 @@
   ExerciseType    ExerciseType[]
 }
 model ExerciseType {
-  id                  Int      @id
+  id                  Int      @id @default(autoincrement())
   exerciseDescription String?
   exerciseName        String?
   Exercise            Exercise @relation(fields: [id], references: [exerciseTypeId])
 }
@@ -53,9 +53,9 @@
 model UserRelationship {
   trainerName String?
   traineeName String?
-  id          Int       @id
+  id          Int       @id @default(autoincrement())
   trainerId   Int?
   traineeId   Int?
   trainerUser AppUser?  @relation("trainer", fields: [trainerId], references: [id])
   traineeUser AppUser?  @relation("trainee", fields: [traineeId], references: [id])
```


