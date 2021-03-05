module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :email, String, null: false
    field :password_digest, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    # field :expenditure_logs, [Types::ExpenditureLog], null: true, description: 'has many expenditure logs'
    # field :income_logs, [Types::IncomeLog], null: true, description: 'has many income logs'
  end
end
