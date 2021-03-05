module Types
  class QueryType < Types::BaseObject
    field :income_logs_for_this_month, [IncomeLogType], null: true do
      description 'find income logs which current user registerd for this month'
    end

    field :expenditure_logs_for_this_month, [ExpenditureLogType], null: true do
      description 'find expenditure logs which current user registerd for this month'
    end

    def income_logs_for_this_month
      current_user = context[:current_user]
      current_user.income_logs.this_month
    end

    def expenditure_logs_for_this_month
      current_user = context[:current_user]
      current_user.expenditure_logs.this_month
    end
  end
end
