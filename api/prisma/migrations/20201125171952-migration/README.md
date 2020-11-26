# Migration `20201125171952-migration`

This migration has been generated at 11/25/2020, 12:19:52 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE SEQUENCE "appuser_id_seq";
ALTER TABLE "public"."AppUser" ALTER COLUMN "id" SET DEFAULT nextval('appuser_id_seq');
ALTER SEQUENCE "appuser_id_seq" OWNED BY "public"."AppUser"."id"

ALTER TABLE "public"."UserRelationship" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "userrelationship_id_seq"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201125170157-migration..20201125171952-migration
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
@@ -40,9 +40,9 @@
   Exercise            Exercise @relation(fields: [id], references: [exerciseTypeId])
 }
 model AppUser {
-  id                  Int                @id
+  id                  Int                @id @default(autoincrement())
   userName            String?
   email               String?            @unique
   createdOn           DateTime?          @default(now())
   lastLogin           DateTime?
@@ -53,9 +53,9 @@
 model UserRelationship {
   trainerName String?
   traineeName String?
-  id          Int       @id @default(autoincrement())
+  id          Int       @id
   trainerId   Int?
   traineeId   Int?
   trainerUser AppUser?  @relation("trainer", fields: [trainerId], references: [id])
   traineeUser AppUser?  @relation("trainee", fields: [traineeId], references: [id])
```


