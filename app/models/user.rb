class User < ApplicationRecord
  has_secure_password
  validates :user_name, :password_digest, :first_name, :last_name, presence: true
  validates :user_name,
            format: { with: /\A^(.+)@(.+)$\z/, message: 'Invalid email format' },
            uniqueness: { case_sensitive: false },
            length: { minimum: 4, maximum: 254 }
end
