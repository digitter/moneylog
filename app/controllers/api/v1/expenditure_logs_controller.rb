module Api
  module V1
    class ExpenditureLogsController < ApplicationController
      include ResponseHelper
      before_action :authenticate_user!
      before_action :check_association!, only: %i[update destroy]

      def create
        expenditure_log = @current_user.expenditure_logs.new(expenditure_log_params)
        expenditure_log.paid_at = Time.zone.now

        if expenditure_log.save
          render json: to_json_api_format(expenditure_log)
        else
          response_bad_request
        end
      end

      def update
        if @expenditure_log.update(expenditure_log_params)
          render json: to_json_api_format(@expenditure_log)
        else
          response_internal_server_error
        end
      end

      def destroy
        if @expenditure_log.destroy
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
          params.require(:expenditure_log).permit(
            :title,
            :amount,
            :content,
            :paid_at
          )
        end

        def expenditure_log_ids
          params.permit(ids: []).require(:ids)
        end

        def check_association!
          @expenditure_log = ExpenditureLog.find(params[:id])
          response_bad_request unless @current_user.id == @expenditure_log.user_id
        end

        def to_json_api_format(expenditure_log)
          ExpenditureLogSerializer.new(expenditure_log)
        end
    end
  end
end
