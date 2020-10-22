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

      # 1 or 2のどちらかが実行される。
      def relate_to_expenditure_log
        log = @current_user.expenditure_logs.find(log_id)
        using_tag_relations = log.tag_relations
        using_tag_ids = using_tag_relations.pluck(:tag_id)

        # 1: ログに紐づくタグリレーションを全て削除
        using_tag_relations.destroy_all if params[:ids].blank?

        # 2: ログに紐づく新しいタグリレーションを作成し、
        # 外されたタグのリレーションを削除
        if params[:ids].present?
          params[:ids].each do |tag_id|
            TagRelation.create!(
              tag_id: tag_id,
              expenditure_log_id: log_id) unless using_tag_ids.include?(tag_id)
          end

          using_tag_relations.each do |r|
            using_tag_relations.find_by(tag_id: r.tag_id).try(:destroy!) unless params[:ids].include?(r.tag_id)
          end
        end
      end

      # TODO: フロントRedux Storeへ反映
      def relate_to_income_log
        log = @current_user.income_logs.find(log_id)
        using_tag_relations = log.tag_relations
        using_tag_ids = using_tag_relations.pluck(:tag_id)

        # 1: ログに紐づくタグリレーションを全て削除
        using_tag_relations.destroy_all if params[:ids].blank?

        # 2: ログに紐づく新しいタグリレーションを作成し、
        # 外されたタグのリレーションを削除
        if params[:ids].present?
          params[:ids].each do |tag_id|
            TagRelation.create!(
              tag_id: tag_id,
              income_log_id: log_id) unless using_tag_ids.include?(tag_id)
          end

          using_tag_relations.each do |r|
            using_tag_relations.find_by(tag_id: r.tag_id).try(:destroy!) unless params[:ids].include?(r.tag_id)
          end
        end
      end

      private
        def tag_params
          params.require(:tag).permit(:name, :color, :description)
        end

        def log_id
          params[:id]
        end

        def to_json_api_format(tag)
          TagSerializer.new(tag)
        end
    end
  end
end
