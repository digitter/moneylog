module Api
  module V1
    class ExpenditureLogsController < ApplicationController
      include ResponseHelper
      before_action :authenticate_user!

      def create
        expenditure_log = @current_user.expenditure_logs.new(expenditure_log_params)

        if expenditure_log.save
          render json: to_json_api_format(expenditure_log)
        else
          response_bad_request
        end
      end

      def update
        expenditure_log = @current_user.expenditure_logs.find(params[:id])

        if expenditure_log.update(expenditure_log_params)
          render json: to_json_api_format(expenditure_log)
        else
          response_not_found(:expenditure_log)
        end
      end

      def destroy
        expenditure_log = @current_user.expenditure_logs.find(params[:id])

        if expenditure_log.destroy
          response_success(:expenditure_log, :destroy)
        else
          response_internal_server_error
        end
      end

      def bulk_delete
        # OPTIMIZE: 可能ならSQL delete処理にしたい。
        begin
          ActiveRecord::Base.transaction do
            expenditure_logs = @current_user.expenditure_logs

            expenditure_log_ids.each do |id|
              expenditure_logs.find(id)
                              .try(:destroy!)
            end

            response_success(:expenditure_logs, :delete)
          end
        rescue => exception
          response_internal_server_error
        end
      end

      private
        def expenditure_log_params
          params.require(:expenditure_log).permit(:title, :amount, :content)
        end

        def expenditure_log_ids
          params.permit(ids: []).require(:ids)
        end

        def to_json_api_format(expenditure_log)
          ExpenditureLogSerializer.new(expenditure_log)
        end
    end
  end
end