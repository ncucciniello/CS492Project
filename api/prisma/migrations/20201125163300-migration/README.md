# Migration `20201125163300-migration`

This migration has been generated at 11/25/2020, 11:33:00 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."UserRelationship" ADD FOREIGN KEY ("trainerId")REFERENCES "public"."AppUser"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201125161304-migration..20201125163300-migration
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
@@ -40,22 +40,24 @@
   Exercise            Exercise @relation(fields: [id], references: [exerciseTypeId])
 }
 model AppUser {
-  id               Int                @id
-  userName         String?
-  email            String?            @unique
-  createdOn        DateTime?          @default(now())
-  lastLogin        DateTime?
-  type             String?
-  UserRelationship UserRelationship[]
+  id                  Int                @id
+  userName            String?
+  email               String?            @unique
+  createdOn           DateTime?          @default(now())
+  lastLogin           DateTime?
+  type                String?
+  trainerRelationship UserRelationship[] @relation("trainer")
+  traineeRelationship UserRelationship[] @relation("trainee")
 }
 model UserRelationship {
   trainerName String?
   traineeName String?
   id          Int       @id @default(autoincrement())
   trainerId   Int?
   traineeId   Int?
-  AppUser     AppUser?  @relation(fields: [traineeId], references: [id])
+  trainerUser AppUser?  @relation("trainer", fields: [trainerId], references: [id])
+  traineeUser AppUser?  @relation("trainee", fields: [traineeId], references: [id])
   Workout     Workout[]
 }
```


