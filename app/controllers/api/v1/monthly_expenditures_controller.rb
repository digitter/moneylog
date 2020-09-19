class Api::V1::MonthlyExpendituresController < ApplicationController
  before_action :set_api_v1_monthly_expenditure, only: [:update, :destroy]

  def index
  end

  def create
    @api_v1_monthly_expenditure = Api::V1::MonthlyExpenditure.new(api_v1_monthly_expenditure_params)

    if @api_v1_monthly_expenditure.save
      redirect_to @api_v1_monthly_expenditure, notice: 'Monthly expenditure was successfully created.'
    else
      render :new
    end
  end

  def update
    if @api_v1_monthly_expenditure.update(api_v1_monthly_expenditure_params)
      redirect_to @api_v1_monthly_expenditure, notice: 'Monthly expenditure was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @api_v1_monthly_expenditure.destroy
    redirect_to api_v1_monthly_expenditures_url, notice: 'Monthly expenditure was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_api_v1_monthly_expenditure
      @api_v1_monthly_expenditure = Api::V1::MonthlyExpenditure.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def api_v1_monthly_expenditure_params
      params.fetch(:api_v1_monthly_expenditure, {})
    end
end
