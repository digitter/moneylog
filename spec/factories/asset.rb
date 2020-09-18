FactoryBot.define do
  factory :asset do
    title { Faker::Lorem.characters(number:50) }
    amount { Faker::Number.number(digits: 5) }
    content { Faker::Lorem.characters(number:100) }
    association :user
  end
end
