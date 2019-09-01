module Api
  module V1
    class TodosController < BaseApiController
      def index
        todos = Todo.order("created_at DESC")
        render json: todos
      end

      def create
        todo = Todo.create(todo_param)
        WebpushNotifications.publish_user_action(
          user: current_user,
          title: "#{todo.title}",
          action: "Added",
        )
        render json: todo
      end

      def update
        todo = Todo.find(params[:id])
        todo.update_attributes(todo_param)
        WebpushNotifications.publish_user_action(
          user: current_user,
          title: "#{todo.title}",
          action: todo.done ? "Completed" : "Added",
        )
        render json: todo
      end

      def destroy
        todo = Todo.find(params[:id])
        WebpushNotifications.publish_user_action(
          user: current_user,
          title: "#{todo.title}",
          action: "Deleted",
        )
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
