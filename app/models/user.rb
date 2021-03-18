class User < ApplicationRecord
  has_secure_password
  validates :firstname, :lastname, :username, :password_digest, presence: true
  validates :password_digest, confirmation: true
  validates :username,
            format: { with: /\A^(.+)@(.+)$\z/, message: 'Email invalid' },
            uniqueness: { case_sensitive: false },
            length: { minimum: 4, maximum: 254 }
end
