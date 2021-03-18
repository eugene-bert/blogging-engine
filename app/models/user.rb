class User < ApplicationRecord
  has_secure_password
  validates :username, :password_digest, :first_name, :last_name, presence: true
  validates :username,
            format: { with: /\A^(.+)@(.+)$\z/, message: 'Invalid email format' },
            uniqueness: { case_sensitive: false },
            length: { minimum: 4, maximum: 254 }
end
