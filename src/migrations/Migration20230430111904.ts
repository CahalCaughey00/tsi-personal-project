import { Migration } from '@mikro-orm/migrations';

export class Migration20230430111904 extends Migration {

  async up(): Promise<void> {
    this.addSql('PRAGMA foreign_keys = OFF;');
    this.addSql('CREATE TABLE `_knex_temp_alter033` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `file_name` text NOT NULL, `file_date` text NOT NULL, `file_length` integer NOT NULL, `download_url` text NOT NULL, `is_alternate` integer NOT NULL, `alternate_file_id` integer NOT NULL, `dependencies` text NOT NULL, `is_available` text NOT NULL, `game_version` text NOT NULL, `has_install_script` integer NOT NULL, `addon_id_addon_id` integer NOT NULL, `hashes` text NOT NULL, CONSTRAINT `file_addon_id_addon_id_foreign` FOREIGN KEY (`addon_id_addon_id`) REFERENCES `addon` (`addon_id`) ON UPDATE CASCADE);');
    this.addSql('INSERT INTO "_knex_temp_alter033" SELECT * FROM "file";;');
    this.addSql('DROP TABLE "file";');
    this.addSql('ALTER TABLE "_knex_temp_alter033" RENAME TO "file";');
    this.addSql('CREATE INDEX `file_addon_id_addon_id_index` on `file` (`addon_id_addon_id`);');
    this.addSql('PRAGMA foreign_keys = ON;');
  }

}
