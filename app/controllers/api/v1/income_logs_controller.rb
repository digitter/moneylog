module Api
  module V1
    class IncomeLogsController < ApplicationController
      include ResponseHelper
      before_action :authorize_user!
      before_action :set_own_log!, only: %i[update destroy]

      def create
        income_log = @current_user.income_logs.new(income_log_params)

        if income_log.save
          render json: to_json_api_format(income_log)
        else
          response_bad_request
        end
      end

      def update
        if @income_log.update(income_log_params)
          render json: to_json_api_format(@income_log)
        else
          response_internal_server_error
        end
      end

      def destroy
        if @income_log.destroy
          response_success(:income_log, :destroy)
        else
          response_internal_server_error
        end
      end

      def bulk_delete
        begin
          existing_log_ids = @current_user.income_logs.ids

          if income_log_ids.all? { |id| existing_log_ids.include?(id) }
            query = "DELETE FROM `income_logs` WHERE `income_logs`.`id` IN (#{income_log_ids})"
            query.delete!('[]')
            ActiveRecord::Base.connection.execute(query)

            query = "DELETE FROM `tag_relations` WHERE `tag_relations`.`income_log_id` IN (#{income_log_ids})"
            query.delete!('[]')
            ActiveRecord::Base.connection.execute(query)
          end

          response_success(:income_logs, :delete)
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

        def set_own_log!
          @income_log = IncomeLog.find(params[:id])
          response_bad_request unless @current_user.id == @income_log.user_id
        end

        def to_json_api_format(income_log)
          IncomeLogSerializer.new(income_log)
        end
    end
  end
end
