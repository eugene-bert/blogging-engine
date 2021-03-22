class AddUniqueIndexToUsers < ActiveRecord::Migration[6.1]
  def change
    add_index :users, :user_name, unique: true
  end
end
