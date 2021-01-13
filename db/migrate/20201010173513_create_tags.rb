class CreateTags < ActiveRecord::Migration[6.0]
  def change
    create_table :tags, id: false do |t|
      t.string :id, limit: 36, null: false, primary_key: true
      t.string :name, null: false
      t.string :color, null: false
      t.string :description, null: false
      t.string :user_id, null: false, index: true

      t.timestamps
    end
  end
end
