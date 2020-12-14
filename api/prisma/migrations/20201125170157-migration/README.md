# Migration `20201125170157-migration`

This migration has been generated at 11/25/2020, 12:01:57 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."UserRelationship_traineeId_unique"

DROP INDEX "public"."UserRelationship_trainerId_unique"

ALTER TABLE "public"."UserRelationship" DROP CONSTRAINT "UserRelationship_appUserId_fkey"

ALTER TABLE "public"."UserRelationship" DROP COLUMN "appUserId"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201125165750-migration..20201125170157-migration
--- datamodel.dml
+++ datamodel.dml
@@ -4,9 +4,9 @@
 }
 datasource DS {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model Workout {
   id                Int               @id
@@ -46,11 +46,10 @@
   email               String?            @unique
   createdOn           DateTime?          @default(now())
   lastLogin           DateTime?
   type                String?
-  userRelationship    UserRelationship[]
-  trainerRelationship UserRelationship?  @relation("trainer")
-  traineeRelationship UserRelationship?  @relation("trainee")
+  trainerRelationship UserRelationship[] @relation("trainer")
+  traineeRelationship UserRelationship[] @relation("trainee")
 }
 model UserRelationship {
   trainerName String?
@@ -60,7 +59,5 @@
   traineeId   Int?
   trainerUser AppUser?  @relation("trainer", fields: [trainerId], references: [id])
   traineeUser AppUser?  @relation("trainee", fields: [traineeId], references: [id])
   Workout     Workout[]
-  AppUser     AppUser?  @relation(fields: [appUserId], references: [id])
-  appUserId   Int?
 }
```


