module UuidGenerator
  extend ActiveSupport::Concern

  included do
    before_create :generate_token
  end

  def generate_token
    self.id = SecureRandom.uuid
  end
end
