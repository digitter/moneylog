require 'rails_helper'

RSpec.describe 'Assetモデルのテスト', type: :model do
  describe 'バリデーションのテスト' do
    let(:user) { build(:user) }
    let!(:asset) { build(:asset, user_id: user.id) }

    context 'titleカラム' do
      it '空欄でないこと' do
        asset.title = ''
        expect(asset.valid?).to eq false
      end
      it '50文字以下であること' do
        asset.title = Faker::Lorem.characters(number: 51)
        expect(asset.valid?).to eq false
      end
    end
    context 'amountカラム' do
      it '空欄でないこと' do
        asset.amount = nil
        expect(asset.valid?).to eq false
      end
      it '100万以下であること' do
        asset.amount = 1000001
        expect(asset.valid?).to eq false
      end
    end
    context 'contentカラム' do
      it '100文字以下であること' do
        asset.content = Faker::Lorem.characters(number:101)
        expect(asset.valid?).to eq false
      end
    end
  end

  describe 'アソシエーションのテスト' do
    context 'Userモデルとの関係' do
      it 'N:1となっている' do
        expect(Asset.reflect_on_association(:user).macro).to eq :belongs_to
      end
    end
  end
end
