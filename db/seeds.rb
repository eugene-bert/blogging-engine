# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require_relative '../lib/populator_fix.rb'
require 'bcrypt'

User.populate 10 do |a|
  a.first_name = Faker::Name.first_name
  a.last_name = Faker::Name.last_name
  a.user_name = Faker::Internet.email(domain: 'example')
  a.password_digest = BCrypt::Password.create('admin')
end



Article.populate 10000 do |a|
  time_range = 0.seconds.from_now..5.hours.from_now
  a.title = Faker::Book.title
  a.body = Faker::Lorem.paragraph_by_chars(number: 400)
  a.user_id = rand(1..10)
  a.is_private = false
  a.is_archived = false
  a.created_at = time_range
  a.updated_at = time_range
end