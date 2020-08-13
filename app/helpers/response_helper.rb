# frozen_string_literal: true

# ステータスコード	メッセージ	使う場面（例）
# 200	Success	リクエストに成功した場合
# 400	Bad Request	リクエストに必要なバラメータが欠けていた場合
# 401	Unauthorized	トークンの認証が不正だった場合
# 404	Not Found	取得しようとしたデータが削除されていた場合
# 409	Conflict	DB に重複するデータを格納しようとした場合
# 500	Internal Server Error	DB や NW で障害が発生した場合

module ResponseHelper
  # 200 Success
  def response_success(class_name, action_name)
    render status: 200, json: { status: 200, message: "Success #{class_name.capitalize} #{action_name.capitalize}" }
  end

  # 400 Bad Request
  def response_bad_request
    render status: 400, json: { status: 400, message: 'Bad Request' }
  end

  # 401 Unauthorized
  def check_login_response_unauthorized
    render json: { status: 401, message: 'Unauthorized', logged_in: false }
  end

  def response_unauthorized
    render status: 401, json: { status: 401, message: 'Unauthorized', logged_in: false }
  end

  # 404 Not Found
  def response_not_found(class_name = 'page')
    render status: 404, json: { status: 404, message: "#{class_name.capitalize} Not Found" }
  end

  # 409 Conflict
  def response_conflict(class_name)
    render status: 409, json: { status: 409, message: "#{class_name.capitalize} Conflict" }
  end

  # 500 Internal Server Error
  def response_internal_server_error
    render status: 500, json: { status: 500, message: 'Internal Server Error' }
  end
end
