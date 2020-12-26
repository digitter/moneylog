class CreateAssets < ActiveRecord::Migration[6.0]
  def change
    create_table :assets do |t|
      t.string :user_id, null: false, index: true
      t.integer :amount, null: false, default: 0
      t.string :title
      t.text :content

      t.timestamps
    end
  end
end
