# Migration `20201125165750-migration`

This migration has been generated at 11/25/2020, 11:57:50 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."UserRelationship" ADD COLUMN "appUserId" integer   

CREATE UNIQUE INDEX "UserRelationship_trainerId_unique" ON "public"."UserRelationship"("trainerId")

CREATE UNIQUE INDEX "UserRelationship_traineeId_unique" ON "public"."UserRelationship"("traineeId")

ALTER TABLE "public"."UserRelationship" ADD FOREIGN KEY ("appUserId")REFERENCES "public"."AppUser"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201125163300-migration..20201125165750-migration
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
@@ -46,10 +46,11 @@
   email               String?            @unique
   createdOn           DateTime?          @default(now())
   lastLogin           DateTime?
   type                String?
-  trainerRelationship UserRelationship[] @relation("trainer")
-  traineeRelationship UserRelationship[] @relation("trainee")
+  userRelationship    UserRelationship[]
+  trainerRelationship UserRelationship?  @relation("trainer")
+  traineeRelationship UserRelationship?  @relation("trainee")
 }
 model UserRelationship {
   trainerName String?
@@ -59,5 +60,7 @@
   traineeId   Int?
   trainerUser AppUser?  @relation("trainer", fields: [trainerId], references: [id])
   traineeUser AppUser?  @relation("trainee", fields: [traineeId], references: [id])
   Workout     Workout[]
+  AppUser     AppUser?  @relation(fields: [appUserId], references: [id])
+  appUserId   Int?
 }
```


