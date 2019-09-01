require 'webpush'

class WebpushNotifications

  def self.notify_users_of_new_todo(todo:, created_by:)
    User.all.each do |user|
      next if user == created_by

      subscription = WebpushSubscription.find_by(user: user)
      if subscription
        push_message(
          subscription: subscription,
          title: "#{todo.title}",
          body: "Added by #{created_by.email}"
        )
      end
    end
  end

  private

  def self.push_message(subscription:, title:, body:)
    message = {
      title: title,
      body: body,
    }

    Webpush.payload_send(
      message: JSON.generate(message),
      endpoint: subscription.endpoint,
      p256dh: subscription.p256dh,
      auth: subscription.auth,
      vapid: {
        subject: "mailto:sender@example.com",
        public_key: "BKnUZRw_QMUEMFh-VQ4Myrf0B6sbnxTCDRs5i1K2fgQUZqRyMa4dk2SLsLZn992zdD1L5I5RTgAMmb72E4GRIJQ=",
        private_key: "TLY7You47L479p8S_g7eZi9dyGa5rw1mh8B3G1kwy5o="
      }
    )
  end
end