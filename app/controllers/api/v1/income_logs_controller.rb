module Api
  module V1
    class IncomeLogsController < ApplicationController
      include ResponseHelper
      before_action :authenticate_user!

      def create
        income_log = @current_user.income_logs.new(income_log_params)

        if income_log.save
          income_log.earned_at = income_log.created_at
          render json: to_json_api_format(income_log)
        else
          response_bad_request
        end
      end

      def update
        income_log = @current_user.income_logs.find(params[:id])

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

      def bulk_delete
        # OPTIMIZE: 可能ならSQL delete処理にしたい。
        begin
          ActiveRecord::Base.transaction do
            income_logs = @current_user.income_logs

            income_log_ids.each do |id|
              income_logs.find(id)
                              .try(:destroy!)
            end

            response_success(:income_logs, :delete)
          end
        rescue => exception
          response_internal_server_error
        end
      end

      private
        def income_log_params
          params.require(:income_log).permit(
            :title,
            :amount,
            :content,
            :earned_at
          )
        end

        def income_log_ids
          params.permit(ids: []).require(:ids)
        end

        def to_json_api_format(income_log)
          IncomeLogSerializer.new(income_log)
        end
    end
  end
end
