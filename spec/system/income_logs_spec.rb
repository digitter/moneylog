# frozen_string_literal: true

require 'rails_helper'

# テスト密度8 (expectを1とカウント)
feature 'Income Logs ページ', js: true, type: :system do
  scenario 'logの作成、削除成功' do
    signup

    find('#toggle-menu-button').click
    find('.MuiTypography-root', text: 'Income Logs').click
    expect(page).to have_current_path('/income_logs')

    find('.MuiButton-label', text: 'NEW').click

    title = 'タイトル'
    amount = 100000
    content = '内容'

    within('form') do
      fill_in 'title', with: title
      fill_in 'amount', with: amount
      fill_in 'content', with: content
    end

    click_button 'CREATE'
    click_button 'CLOSE'

    within_table('Income Logs') do
      tds = all('tbody tr')[0].all('td')

      # 作成の確認
      expect(tds[1]).to have_content title
      expect(tds[2]).to have_content amount
      expect(tds[3]).to have_content content
      within(tds[4]) { expect(find_field('in-log-earned-at').value).to eq Time.zone.now.strftime("%F") }
      within(tds[7]) { find(:css, "svg.MuiSvgIcon-root").click }
    end

    within('.MuiDialogActions-root.MuiDialogActions-spacing') { find_button('Agree・はい').click }

    # 削除の確認
    expect(page).not_to have_content(title)
    expect(page).not_to have_content(amount)
    expect(page).not_to have_content(content)
  end
end

