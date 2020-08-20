module Api
  module V1
    class AssetsController < ApplicationController
      include ResponseHelper
      before_action :authenticate_user!

      def update
        asset = @current_user.asset
        if asset.update(asset_params)
          render json: to_json_api_format(asset)
        else
          response_not_found(:asset)
        end
      end

      private
        def asset_params
          params.require(:asset).permit(
            :amount,
            :title,
            :content
          )
        end

        def to_json_api_format(asset)
          AssetSerializer.new(asset)
        end
    end
  end
end
