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
          # パラメータの中身が全て# existing_log_idsに一致しないならば処理中止
          return response_bad_request unless destroy_ids.all? { |id| existing_log_ids.include?(id) }

          query = "DELETE FROM `income_logs` WHERE `income_logs`.`id` IN (#{destroy_ids})"
          query.delete!('[]')
          ActiveRecord::Base.connection.execute(query)

          # ログに関連するtag relationを一括削除
          query = "DELETE FROM `tag_relations` WHERE `tag_relations`.`income_log_id` IN (#{destroy_ids})"
          query.delete!('[]')
          ActiveRecord::Base.connection.execute(query)

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

        def destroy_ids
          params.require(:destroyIds)
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
