module Types
  class ExpenditureLogType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, null: true
    field :amount, Integer, null: false
    field :content, String, null: true
    field :paid_at, GraphQL::Types::ISO8601DateTime, null: false
    field :user_id, String, null: false
    field :monthly_expenditure_id, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    # field :user, Types::User, null: false, description: 'belongs to user'
  end
end
