# Migration `20201116012224-migration`

This migration has been generated at 11/15/2020, 8:22:24 PM.
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
migration 20201116010040-migration..20201116012224-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,9 +1,9 @@
 datasource DS {
   // optionally set multiple providers
   // example: provider = ["sqlite", "postgresql"]
-  provider = "postgresql"
-  url = "***"
+  provider = ["sqlite", "postgresql"]
+  url = "***"
 }
 generator client {
   provider      = "prisma-client-js"
```


