# Migration `20201031011941-migration`

This migration has been generated by ncucciniello at 10/30/2020, 9:19:41 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "User" ADD COLUMN     "trainer" INTEGER
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201029234746-add-user..20201031011941-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,9 +1,9 @@
 datasource DS {
   // optionally set multiple providers
   // example: provider = ["sqlite", "postgresql"]
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider      = "prisma-client-js"
@@ -17,6 +17,7 @@
   id    Int     @id @default(autoincrement())
   email String  @unique
   name  String?
   type  String
+  trainer Int?
 }
```


