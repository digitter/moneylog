FactoryBot.define do
  factory :monthly_expenditure do
    title { "MyString" }
    amount { 1 }
    content { "MyText" }
    user_id { 1 }
    is_active { false }
    will_created_at { "2020-09-22 02:15:26" }
  end
end
