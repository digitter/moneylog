class AddColorCodeAndDescriptionToTags < ActiveRecord::Migration[6.0]
  def change
    add_column :tags, :color, :string
    add_column :tags, :description, :string
  end
end
