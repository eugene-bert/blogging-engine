class Article < ApplicationRecord
  belongs_to :user
  validates :title, :body, :user_id, presence: true

  def self.archive_job
    @articles = Article.where("created_at < ?", 0.minutes.ago)
    @articles.update_all(is_archived: true, updated_at: Time.now)
  end

end
