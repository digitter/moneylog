# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ts = Time.zone.now
p = 'aaaaaa'

# ---------------------------------------------------------------------
# development用 seedデータ

if Rails.env.development?
  ActiveRecord::Base.transaction do
    u = User.create!(name: "Aさん", email: "a@a.a", password: p, password_confirmation: p)

    # 3.times do |i|
    #   MonthlyExpenditure.create!()
    # end

    tag_ids = []

    10.times do |i|
      ramdom_color = "#" + SecureRandom.hex(3)

      tag = Tag.create!(
        user_id: u.id,
        name: "タグネーム#{i}",
        color: ramdom_color,
        description: '説明'
      )

      tag_ids << tag.id
    end

    100.times do |i|
      i += 1

      tag_id = (i % 10 == 0) ? tag_ids[9] : tag_ids[i % 10]

      elog = ExpenditureLog.new(
        user_id: u.id,
        title: 'タイトル',
        amount: i,
        content: '内容'
      )

      elog.save!

      tr = TagRelation.new(
        expenditure_log_id: elog.id,
        tag_id: tag_id
      )

      tr.save!

      ilog = IncomeLog.new(
        user_id: u.id,
        title: 'タイトル',
        amount: i,
        content: '内容'
      )

      ilog.save!

      tr = TagRelation.new(
        income_log_id: ilog.id,
        tag_id: tag_id
      )

      tr.save!
    end
  end
end


# ---------------------------------------------------------------------
# test, staging 用 seedデータ

if Rails.env.staging? || Rails.env.test?
  ActiveRecord::Base.transaction do
    u = User.create!(name: "Aさん", email: "a@a.a", password: p, password_confirmation: p)

    # 3.times do |i|
    #   MonthlyExpenditure.create!()
    # end

    tag_ids = []

    5.times do |i|
      ramdom_color = "#" + SecureRandom.hex(3)

      tag = Tag.create!(
        user_id: u.id,
        name: "タグネーム#{i}",
        color: ramdom_color,
        description: '説明'
      )
      
      tag_ids << tag.id
    end

    5.times do |i|
      elog = ExpenditureLog.new(
        user_id: u.id,
        title: 'タイトル',
        amount: 1250,
        content: '内容'
      )

      elog.save!

      tr = TagRelation.new(
        expenditure_log_id: elog.id,
        tag_id: tag_ids[i]
      )

      tr.save!

      ilog = IncomeLog.new(
        user_id: u.id,
        title: 'タイトル',
        amount: 2000,
        content: '内容'
      )

      ilog.save!

      tr = TagRelation.new(
        income_log_id: ilog.id,
        tag_id: tag_ids[i]
      )

      tr.save!
    end
  end
end
