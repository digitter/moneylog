 require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

RSpec.describe "/api/v1/tags", type: :request do
  # Api::V1::Tag. As you add validations to Api::V1::Tag, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    skip("Add a hash of attributes valid for your model")
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  describe "GET /index" do
    it "renders a successful response" do
      Api::V1::Tag.create! valid_attributes
      get api_v1_tags_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      tag = Api::V1::Tag.create! valid_attributes
      get api_v1_tag_url(api_v1_tag)
      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get new_api_v1_tag_url
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "render a successful response" do
      tag = Api::V1::Tag.create! valid_attributes
      get edit_api_v1_tag_url(api_v1_tag)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Api::V1::Tag" do
        expect {
          post api_v1_tags_url, params: { api/v1_tag: valid_attributes }
        }.to change(Api::V1::Tag, :count).by(1)
      end

      it "redirects to the created api/v1_tag" do
        post api_v1_tags_url, params: { api/v1_tag: valid_attributes }
        expect(response).to redirect_to(api_v1_tag_url(@api_v1_tag))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Api::V1::Tag" do
        expect {
          post api_v1_tags_url, params: { api/v1_tag: invalid_attributes }
        }.to change(Api::V1::Tag, :count).by(0)
      end

      it "renders a successful response (i.e. to display the 'new' template)" do
        post api_v1_tags_url, params: { api/v1_tag: invalid_attributes }
        expect(response).to be_successful
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested api/v1_tag" do
        tag = Api::V1::Tag.create! valid_attributes
        patch api_v1_tag_url(api_v1_tag), params: { api_v1_tag: new_attributes }
        tag.reload
        skip("Add assertions for updated state")
      end

      it "redirects to the api/v1_tag" do
        tag = Api::V1::Tag.create! valid_attributes
        patch api_v1_tag_url(api_v1_tag), params: { api_v1_tag: new_attributes }
        tag.reload
        expect(response).to redirect_to(api_v1_tag_url(tag))
      end
    end

    context "with invalid parameters" do
      it "renders a successful response (i.e. to display the 'edit' template)" do
        tag = Api::V1::Tag.create! valid_attributes
        patch api_v1_tag_url(api_v1_tag), params: { api_v1_tag: invalid_attributes }
        expect(response).to be_successful
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested api/v1_tag" do
      tag = Api::V1::Tag.create! valid_attributes
      expect {
        delete api_v1_tag_url(api_v1_tag)
      }.to change(Api::V1::Tag, :count).by(-1)
    end

    it "redirects to the api_v1_tags list" do
      tag = Api::V1::Tag.create! valid_attributes
      delete api_v1_tag_url(api_v1_tag)
      expect(response).to redirect_to(api_v1_tags_url)
    end
  end
end
