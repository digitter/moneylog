module Api
  module V1
    class AssetsController < ApplicationController
      include ResponseHelper
      before_action :authenticate_user!

      def update
        @current_user.asset.update(asset_params)
      end

      private
        def asset_params
          params.require(:asset).permit(
            :amount,
            :title,
            :content
          )
        end
    end
  end
end
