module Api
  module V1
    class AssetsController < ApplicationController
      include CurrentUserConcern
      include ResponseHelper

      def update
        if @current_user
          @current_user.asset.update(asset_params)
        else
          response_unauthorized
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
    end
  end
end
