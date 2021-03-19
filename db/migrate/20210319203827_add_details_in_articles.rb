class AddDetailsInArticles < ActiveRecord::Migration[6.1]
  def change

    add_column :articles, :is_private, :boolean,
               default: false, null: false
    add_column :articles, :is_archived, :boolean,
               default: false, null: false
    change_column :articles, :body, :string, null: false
    change_column :articles, :title, :text, null: false
  end
end

