class DashboardController < ApplicationController
  skip_before_action :authenticate_user!, :only => [:welcome]
  def index
    @user = current_user
    @video_link = Video.search
  end

  def welcome
    if current_user
      redirect_to dashboard_path
    else
      render :welcome
    end
  end

  def destroy_all
    @user = current_user
    @user.widgets.destroy_all
    redirect_to dashboard_path
  end
end
