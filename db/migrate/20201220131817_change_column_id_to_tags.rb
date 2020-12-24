class ChangeColumnIdToTags < ActiveRecord::Migration[6.0]
  def up
    change_column :tags, :id, :string
  end

  def down
    change_column :tags, :id, :integer
  end
end
