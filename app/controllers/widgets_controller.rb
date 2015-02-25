class WidgetsController < ApplicationController

  def index
    @user = current_user
    @user_widgets = @user.widgets
  end

  def create
    @user = current_user
    user_has_widget = false
    @user.widgets.each do |widget|
      if widget.name == widget_params[:name]
        user_has_widget = true
        flash[:alert] = "You already have #{widget_params[:name]} widget"
      end
    end

    if user_has_widget
      redirect_to dashboard_path
    else
      @widget = @user.widgets.new(widget_params)
      respond_to do |format|
        if @widget.save
          format.html { p "I SAVED IN HTML!!!"
            redirect_to dashboard_path }
          format.js {
            p "I SAVED IN JS!!!!!!"
            render :create, locals: {widget: @widget} }
        else
          format.html { p "I DIDN'T SAVE IN HTML!!!"
            redirect_to dashboard_path }
          format.js {
            p "I DIDN'T SAVE IN JS!!!"
            flash[:alert] = "Your widget could not be saved. Please try again."
            render :'dashboard/index' }
        end
      end
    end
  end

  def update
    @user = current_user
    @widget = Widget.find(params[:id])
    if @answer.update_attributes(widget_params)
      redirect_to dashboard_path
    else
      redirect_to dashboard_path
    end
  end

  def destroy
    @user = current_user
    @widget = Widget.find(params[:id])

    respond_to do |format|
      if @widget.destroy
        format.html { redirect_to dashboard_path }
        format.js { render :locals => { widget: @widget.id }}
      else
        format.html {}
        format.js {}
      end
    end
  end

  private
    def widget_params
      params.require(:widget).permit(:name)
    end
end


