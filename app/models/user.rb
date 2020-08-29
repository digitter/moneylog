class User < ApplicationRecord
  before_save { self.email = email.downcase }

  validates :name,  presence: true, length: { maximum: 50 }
  # ex@ex.ex のformatにする.
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { minimum: 6 }

  has_secure_password

  # association
  with_options dependent: :destroy do |user|
    user.has_one :asset
    user.has_many :expenditure_logs
    user.has_many :income_logs
  end
end
