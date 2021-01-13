class CreateTagRelations < ActiveRecord::Migration[6.0]
  def change
    create_table :tag_relations, id: false do |t|
      t.string :id, limit: 36, null: false, primary_key: true
      t.string :tag_id, null: false, index: true
      t.string :expenditure_log_id, index: true
      t.string :income_log_id, index: true

      t.timestamps
    end
  end
end
