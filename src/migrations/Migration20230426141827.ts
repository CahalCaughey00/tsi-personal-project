import { Migration } from '@mikro-orm/migrations';

export class Migration20230426141827 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `addon` (`addon_id` integer not null primary key autoincrement, `game_id` integer not null, `name` text not null, `authors` text not null, `primary_author` text not null, `primary_category_id` integer not null, `web_site_url` text not null, `thumbnail_url` text not null, `tags` text not null, `installed_file` text not null, `status` integer not null, `intalled_targets` text not null, `lastst_file` text not null);');

    this.addSql('create table `file` (`id` integer not null primary key autoincrement, `file_name` text not null, `file_date` text not null, `file_length` integer not null, `download_url` text not null, `is_alternate` integer not null, `alternate_file_id` integer not null, `dependencies` text not null, `is_available` integer not null, `game_version` text not null, `has_install_script` integer not null, `addon_id_addon_id` integer not null, `hashes` text not null, constraint `file_addon_id_addon_id_foreign` foreign key(`addon_id_addon_id`) references `addon`(`addon_id`) on update cascade);');
    this.addSql('create index `file_addon_id_addon_id_index` on `file` (`addon_id_addon_id`);');
  }

}
