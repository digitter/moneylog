module Api
  module V1
    class IncomeLogsController < ApplicationController
      include Responsehelper
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
        if @api_v1_income_log.update(api_v1_income_log_params)
          redirect_to @api_v1_income_log, notice: 'Income log was successfully updated.'
        else
          render :edit
        end
      end

      def destroy
        @api_v1_income_log.destroy
        redirect_to api_v1_income_logs_url, notice: 'Income log was successfully destroyed.'
      end

      private
        def income_log_params
          params.require(:income_log).permit(:title, :amount, :content)
        end

        def to_json_api_format(income_log)
          IncomeLogSerializer.new(inocome_log)
        end
    end
  end
end
