class CreateTagRelations < ActiveRecord::Migration[6.0]
  def change
    create_table :tag_relations do |t|
      t.integer :tag_id, null: false
      t.integer :expenditure_log_id
      t.integer :income_log_id

      t.timestamps
    end
  end
end
