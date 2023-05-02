import { Migration } from '@mikro-orm/migrations';

export class Migration20230502080835 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `addon` add column `installed_file_id` text not null;');
    this.addSql('alter table `addon` add column `latest_file_id` text not null;');
  }

}
