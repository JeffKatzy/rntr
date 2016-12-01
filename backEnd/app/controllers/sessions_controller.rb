class SessionsController < ApplicationController
  # skip_before_action :authenticate_user
  def create
    user = User.find_by(email: auth_params[:email])

    if user.authenticate(auth_params[:password])
      jwt = Auth.issue({user_id: user.id})
      render json: {jwt: jwt}
    end
  end


   private
    def auth_params
      params.require(:user).permit(:email, :password)
    end

end
