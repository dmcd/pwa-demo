module Api
  module V1
    class WebpushController < BaseApiController
      def subscribe
        subscription = WebpushSubscription.find_by(user: current_user)
        if subscription
          subscription.update_attributes(
            endpoint: params[:subscription][:endpoint],
            p256dh: params[:subscription][:keys][:p256dh],
            auth: params[:subscription][:keys][:auth]
          )
        else
          WebpushSubscription.create!(
            user_id: current_user.id,
            endpoint: params[:subscription][:endpoint],
            p256dh: params[:subscription][:keys][:p256dh],
            auth: params[:subscription][:keys][:auth]
          )
        end
      end
    end
  end
end