class MonthlyExpenditure < ApplicationRecord
  # validations
  validates :amount, presence: true
  validates :title, presence: true, length: { minimum: 1, maximum: 100 }
  validates :content, length: { maximum: 100 }
  validates :is_active, inclusion: {in: [true, false]}

  # association
  belongs_to :user
  has_many :expenditure_logs

  # method
  def self.create_expenditure_logs
    User.includes(:monthly_expenditures).find_each do |user|
      ActiveRecord::Base.transaction do
        user.monthly_expenditures.each do |monthly_expenditure|
          now = Time.zone.now
          scheduled_date = monthly_expenditure.will_create_at

          if (monthly_expenditure.is_active &&
            scheduled_date.year == now.year &&
            scheduled_date.month == now.month &&
            scheduled_date.day == now.day)

            log = monthly_expenditure.expenditure_logs.new(
              user_id: monthly_expenditure.user_id,
              title: monthly_expenditure.title,
              amount: monthly_expenditure.amount,
              content: monthly_expenditure.content)

            log.save!
          end
        end
      end

      # rescue => exception
        # puts "error"
        # TODO: エラー後の処理
    end
  end

end
