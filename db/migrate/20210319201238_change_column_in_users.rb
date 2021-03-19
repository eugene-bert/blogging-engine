class ChangeColumnInUsers < ActiveRecord::Migration[6.1]
  def change
    change_table :users do |t|
      t.rename :user_name, :user_name
    end
  end
end
