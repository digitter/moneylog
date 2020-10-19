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

      # OPTIMIZE: 見にくい. private以下とかにいくつか関数化したものをまとめてみる。
      def relate_to_expenditure_log
        log = @current_user.expenditure_logs.find(expenditure_log_id)
        using_tag_relations = log.tag_relations
        using_tag_ids = using_tag_relations.pluck(:tag_id)

        if params[:ids].blank?
          using_tag_relations.destroy_all # ログに紐づくタグリレーションを全て削除 # delete_allにする？
        elsif params[:ids].present?
          params[:ids].each do |tag_id| # ログに新しいタグリレーションを作成
            unless using_tag_ids.include?(tag_id)
              TagRelation.create!(tag_id: tag_id, expenditure_log_id: expenditure_log_id)
            end
          end

          using_tag_relations.each do |r| # 外されたタグのリレーションを削除
            unless params[:ids].include?(r.tag_id)
              using_tag_relations.find_by(tag_id: r.tag_id).try(:destroy!)
            end
          end
        end

        # TODO: フロントRedux Storeへ反映
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
          params.require(:tag).permit(:name, :color, :description)
        end

        def expenditure_log_id
          params[:id]
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
