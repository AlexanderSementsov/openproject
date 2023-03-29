class AddIndexOnProjects < ActiveRecord::Migration[7.0]
  def change
    add_index(:projects, :active)
  end
end
