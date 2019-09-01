require 'webpush'

class WebpushNotifications

  def self.publish_user_action(user:, title:, action:)
    User.all.each do |other|
      next if other == user

      subscription = WebpushSubscription.find_by(user: other)
      if subscription
        push_message(
          subscription: subscription,
          title: title,
          body: "#{action} by #{user.email}",
          type: action
        )
      end
    end
  end

  private

  def self.push_message(subscription:, title:, body:, type:)
    message = {
      title: title,
      body: body,
      type: type
    }

    Webpush.payload_send(
      message: JSON.generate(message),
      endpoint: subscription.endpoint,
      p256dh: subscription.p256dh,
      auth: subscription.auth,
      vapid: {
        subject: "mailto:sender@example.com",
        public_key: ENV["VAPID_PUBLIC_KEY"],
        private_key: ENV["VAPID_PRIVATE_KEY"]
      }
    )
  end
end