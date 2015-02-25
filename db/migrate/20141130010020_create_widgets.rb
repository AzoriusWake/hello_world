class CreateWidgets < ActiveRecord::Migration
  def change
    create_table :widgets do |t|
      t.belongs_to :user
      t.string :name

      t.timestamps
    end
  end
end
