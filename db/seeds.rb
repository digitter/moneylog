# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ts = Time.zone.now
p = 'aaaaaa'

ActiveRecord::Base.transaction do
  u = User.create!(name: "#{ts}さん", email: "a@a.a", password: p, password_confirmation: p)

  # 3.times do |i|
  #   MonthlyExpenditure.create!()
  # end

  10.times do
    ramdom_color = "#" + SecureRandom.hex(3)

    Tag.create!(
      user_id: u.id,
      name: "タグネーム",
      color: ramdom_color,
      description: '説明'
    )
  end

  100.times do |i|
    i += 1

    tag_id = (i % 10 == 0) ? 10 : i % 10 

    e = ExpenditureLog.new(
      user_id: u.id,
      title: 'タイトル',
      amount: i,
      content: '内容'
    )

    e.save!

    tr = TagRelation.new(
      expenditure_log_id: e.id,
      tag_id: tag_id
    )
    tr.save!

    i = IncomeLog.new(
      user_id: u.id,
      title: 'タイトル',
      amount: i,
      content: '内容'
    )
    i.save!

    tr = TagRelation.new(
      income_log_id: i.id,
      tag_id: tag_id
    )
    tr.save!
  end
end
