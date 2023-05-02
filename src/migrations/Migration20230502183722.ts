import { Migration } from '@mikro-orm/migrations';

export class Migration20230502183722 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop index `file_addon_id_addon_id_index`;');
    this.addSql('alter table `file` rename column `addon_id_addon_id` to `addon_id`;');
  }

}
