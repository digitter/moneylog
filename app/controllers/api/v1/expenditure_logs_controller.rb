module Api
  module V1
    class ExpenditureLogsController < ApplicationController
      include ResponseHelper
      before_action :authorize_user!
      before_action :set_own_log!, only: %i[update destroy]

      def create
        expenditure_log = @current_user.expenditure_logs.new(expenditure_log_params)

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
        begin
          existing_log_ids = @current_user.expenditure_logs.ids

          # パラメータの中身が全て
          # existing_log_idsに一致しないならば処理中止
          return response_bad_request unless expenditure_log_ids.all? { |id| existing_log_ids.include?(id) }

          query = "DELETE FROM `expenditure_logs` WHERE `expenditure_logs`.`id` IN (#{expenditure_log_ids})"
          query.delete!('[]')
          ActiveRecord::Base.connection.execute(query)

          # ログに関連するtag relationを一括削除
          query = "DELETE FROM `tag_relations` WHERE `tag_relations`.`expenditure_log_id` IN (#{expenditure_log_ids})"
          query.delete!('[]')
          ActiveRecord::Base.connection.execute(query)

          response_success(:expenditure_logs, :delete)
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

        def set_own_log!
          @expenditure_log = ExpenditureLog.find(params[:id])
          response_bad_request unless @current_user.id == @expenditure_log.user_id
        end

        def to_json_api_format(expenditure_log)
          ExpenditureLogSerializer.new(expenditure_log)
        end
    end
  end
end
