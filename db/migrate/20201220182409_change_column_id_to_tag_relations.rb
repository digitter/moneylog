class ChangeColumnIdToTagRelations < ActiveRecord::Migration[6.0]
  def up
    change_column :tag_relations, :id, :string
  end

  def down
    change_column :tag_relationos, :id, :integer
  end
end
