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

      # TODO: フロントRedux Storeへ反映
      def relate_to_expenditure_log
        tag = @current_user.tags.find(params[:id])

        return response_bad_request if expenditure_log_id.blank? ||
                                       tag.associated_with_expenditure?(expenditure_log_id) ||
                                       !@current_user.expenditure_logs.exists?(id: expenditure_log_id)

        if TagRelation.create(tag_id: tag.id, expenditure_log_id: expenditure_log_id)
          response_success(:tag, :relate_to_expenditure_log)
        else
          response_internal_server_error
        end
      end

      # TODO: フロントRedux Storeへ反映
      def relate_to_income_log
        tag = @current_user.tags.find(params[:id])

        return response_bad_request if income_log_id.blank? ||
                                       tag.associated_with_income?(income_log_id) ||
                                       !@current_user.income_logs.exists?(id: income_log_id)

        if TagRelation.create(tag_id: tag.id, income_log_id: income_log_id)
          response_success(:tag, :relate_to_income_log)
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
          params.require(:expenditure_log).require(:id)
        end

        def income_log_id
          params.require(:income_log).require(:id)
        end

        def to_json_api_format(tag)
          TagSerializer.new(tag)
        end
    end
  end
end
