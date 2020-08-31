module Api
  module V1
    class IncomeLogsController < ApplicationController
      include ResponseHelper
      before_action :authenticate_user!

      def create
        income_log = @current_user.income_logs.new(income_log_params)

        if income_log.save
          render json: to_json_api_format(income_log)
        else
          response_bad_request
        end
      end

      def update
        income_log = @current_user.income_log.find(params[:id])

        if income_log.update(income_log_params)
          render json: to_json_api_format(income_log)
        else
          response_not_found(:income_log)
        end
      end

      def destroy
        income_log = @current_user.income_logs.find(params[:id])

        if income_log.destroy
          response_success(:income_log, :destroy)
        else
          response_internal_server_error
        end
      end

      private
        def income_log_params
          params.require(:income_log).permit(:title, :amount, :content)
        end

        def to_json_api_format(income_log)
          IncomeLogSerializer.new(income_log)
        end
    end
  end
end
