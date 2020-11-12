module Api
  module V1
    class MonthlyExpendituresController < ApplicationController
      include ResponseHelper
      before_action :authorize_user!

      def update
        monthly_expenditure = @current_user.monthly_expenditures.find(params[:id])

        if monthly_expenditure.update(monthly_expenditure_params)
          render json: to_json_api_format(monthly_expenditure)
        else
          respnse_not_found(:monthly_expenditure)
        end
      end

      private
        def monthly_expenditure_params
          params.require(:monthly_expenditure).permit(
            :title,
            :amount,
            :content,
            :is_active,
            :will_create_at
          )
        end

        def to_json_api_format(monthly_expenditure)
          MonthlyExpenditureSerializer.new(monthly_expenditure)
        end
    end
  end
end
