class ChangeColumnIdToAssets < ActiveRecord::Migration[6.0]
  def up
    change_column :assets, :id, :string
  end

  def down
    change_column :assets, :id, integer
  end
end

