require 'webpush'

class WebpushNotifications

  def self.publish_user_action(user:, title:, action:)
    User.all.each do |other|
      next if other == user

      subscription = WebpushSubscription.find_by(user: other)
      if subscription
        push_message(
          subscription: subscription,
          message:{
            title: title,
            action: action,
            user: user.email
          }
        )
      end
    end
  end

  private

  def self.push_message(subscription:, message:)
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
  rescue StandardError => error
    puts error
  end
end