class CreateTagRelations < ActiveRecord::Migration[6.0]
  def change
    create_table :tag_relations do |t|
      t.string :tag_id, null: false
      t.string :expenditure_log_id
      t.string :income_log_id, null:false , index: true

      t.timestamps
    end
  end
end
