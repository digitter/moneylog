# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_10_11_022258) do

  create_table "assets", id: :string, limit: 36, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "title"
    t.integer "amount", default: 0, null: false
    t.text "content"
    t.string "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_assets_on_user_id"
  end

  create_table "expenditure_logs", id: :string, limit: 36, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "title"
    t.integer "amount", default: 0, null: false
    t.text "content"
    t.datetime "paid_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.string "user_id", null: false
    t.string "monthly_expenditure_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["monthly_expenditure_id"], name: "index_expenditure_logs_on_monthly_expenditure_id"
    t.index ["user_id"], name: "index_expenditure_logs_on_user_id"
  end

  create_table "income_logs", id: :string, limit: 36, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "title"
    t.integer "amount", default: 0, null: false
    t.text "content"
    t.datetime "earned_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.string "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_income_logs_on_user_id"
  end

  create_table "monthly_expenditures", id: :string, limit: 36, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "title"
    t.integer "amount", default: 0, null: false
    t.text "content"
    t.boolean "is_active"
    t.datetime "will_create_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.string "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_monthly_expenditures_on_user_id"
  end

  create_table "tag_relations", id: :string, limit: 36, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "tag_id", null: false
    t.string "expenditure_log_id"
    t.string "income_log_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["expenditure_log_id"], name: "index_tag_relations_on_expenditure_log_id"
    t.index ["income_log_id"], name: "index_tag_relations_on_income_log_id"
    t.index ["tag_id"], name: "index_tag_relations_on_tag_id"
  end

  create_table "tags", id: :string, limit: 36, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.string "color", null: false
    t.string "description", null: false
    t.string "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_tags_on_user_id"
  end

  create_table "users", id: :string, limit: 36, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

end
