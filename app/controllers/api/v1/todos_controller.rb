module Api
  module V1
    class TodosController < BaseApiController
      def index
        todos = Todo.order("created_at DESC")
        render json: todos
      end

      def create
        todo = Todo.create(todo_param)
        WebpushNotifications.notify_users_of_new_todo(
          todo: todo, 
          created_by: current_user
        )
        render json: todo
      end

      def update
        todo = Todo.find(params[:id])
        todo.update_attributes(todo_param)
        render json: todo
      end

      def destroy
        todo = Todo.find(params[:id])
        todo.destroy
        head :no_content, status: :ok
      end
      
      private

      def todo_param
        params.require(:todo).permit(:title, :done)
      end
    end
  end
end
