class Article < ApplicationRecord
  belongs_to :user
  validates :title, :body, :user_id, presence: true
end
