module Api
  module V1
    class TagsController < ApplicationController
      include ResponseHelper
      before_action :authenticate_user!

      def create
        tag = @current_user.tags.new(tag_params)

        if tag.save
           render json: to_json_api_format(tag)
        else
          response_internal_server_error
        end
      end

      def update
        tag = @current_user.tags.find(params[:id])

        if tag.update(tag_params)
          render json: to_json_api_format(tag)
        else
          response_internal_server_error
        end
      end

      def relate
        tag = @current_user.tags.find(params[:id])

        if expenditure_log_id.present?
          log = @current_user.ExpenditureLog.find(expenditure_log_id)
          tag_relation = TagRelation.new(tag_id: tag.id, expenditure_log_id: log.id)
        elsif income_log_id.present?
          log = @current_user.IncomeLog.find(income_log_id)
          tag_relation = TagRelation.new(tag_id: tag.id, income_log_id: log.id)
        end

        if tag_relation.save
          response_success(:tag_relation)
        else
          response_internal_server_error
        end
      end

      def destroy
        tag = @current_user.tags.find(params[:id])

        if tag.destroy
          response_success(:tag, :destroy)
        else
          response_internal_server_error
        end
      end

      private
        def tag_params
          params.require(:tag).permit(:name)
        end

        def expenditure_log_id
          params.require(:expenditure_log).permit(:id)
        end

        def expenditure_log_id
          params.require(:income_log).permit(:id)
        end

        def to_json_api_format(tag)
          TagSerializer.new(tag)
        end
    end
  end
end
